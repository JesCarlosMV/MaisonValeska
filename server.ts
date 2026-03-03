import express from 'express';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Seed check function
async function ensureSeeded() {
  try {
    const count = await prisma.product.count();
    if (count === 0) {
      console.log('Database empty. Seeding from products.json...');
      const productsPath = path.join(__dirname, 'prisma', 'products.json');
      if (fs.existsSync(productsPath)) {
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        for (const p of productsData) {
          await prisma.product.create({ data: p });
        }
        console.log(`Seeded ${productsData.length} products.`);
      } else {
        console.warn('products.json not found at', productsPath);
      }
    } else {
      console.log(`Database already has ${count} products.`);
    }
  } catch (error) {
    console.error('Error checking/seeding database:', error);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Ensure DB is seeded
  await ensureSeeded();

  // API Routes
  app.get('/api/health', async (req, res) => {
    try {
      const count = await prisma.product.count();
      res.json({ 
        status: 'ok', 
        database: 'connected', 
        productCount: count 
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        database: 'disconnected', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  app.get('/api/products', async (req, res) => {
    try {
      console.log('GET /api/products - Fetching from database...');
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
      console.log(`GET /api/products - Found ${products.length} products`);
      res.json(products);
    } catch (error) {
      console.error('GET /api/products - Error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch products', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.params.id }
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(`GET /api/products/${req.params.id} - Error:`, error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Maison Valeska Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
