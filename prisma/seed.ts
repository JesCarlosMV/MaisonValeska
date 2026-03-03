import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  const productsPath = path.join(__dirname, 'products.json');
  if (!fs.existsSync(productsPath)) {
    throw new Error(`products.json not found at ${productsPath}`);
  }

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  // Clear existing products to avoid duplicates during development
  await prisma.product.deleteMany();
  console.log('Cleared existing products.');

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
