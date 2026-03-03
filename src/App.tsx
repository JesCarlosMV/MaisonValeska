import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { useProducts } from './hooks/useProducts';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';

const HomePage = () => {
  const { products, loading, error } = useProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Hero />
      
      {/* Brand Story Teaser */}
      <section className="py-32 bg-bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-6 block">
              Legado & Artesanía
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">
              Un siglo de excelencia en cada detalle.
            </h2>
            <p className="text-lg text-text-primary/70 font-light leading-relaxed mb-12">
              En Maison Valeska, no solo creamos joyas; forjamos símbolos de eternidad. 
              Cada diamante es seleccionado a mano por nuestros maestros gemólogos, 
              asegurando que solo la perfección llegue a su piel.
            </p>
            <button className="px-12 py-5 border border-text-primary text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary hover:text-bg-primary transition-all duration-500">
              Nuestra Historia
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-t-[200px]">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000" 
                alt="Craftsmanship"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-bg-primary p-4 shadow-2xl hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1598560912005-59a09aa48a4d?auto=format&fit=crop&q=80&w=500" 
                alt="Detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full"
          />
        </div>
      ) : error ? (
        <div className="h-96 flex flex-col items-center justify-center text-center px-6">
          <p className="text-red-500 mb-4">Error al cargar los productos: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* Experience Section */}
      <section className="py-32 bg-bg-secondary text-text-primary border-y border-border-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-serif italic mb-16">
            Experiencia Maison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-gold font-serif text-2xl">01</span>
              </div>
              <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold">Cita Privada</h4>
              <p className="text-sm text-text-primary/50 font-light">Atención personalizada en nuestros salones VIP o mediante videollamada exclusiva.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-gold font-serif text-2xl">02</span>
              </div>
              <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold">Certificación GIA</h4>
              <p className="text-sm text-text-primary/50 font-light">Cada diamante superior a 0.5ct incluye un certificado de autenticidad y trazabilidad.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-gold font-serif text-2xl">03</span>
              </div>
              <h4 className="text-[12px] uppercase tracking-[0.3em] font-bold">Envío Asegurado</h4>
              <p className="text-sm text-text-primary/50 font-light">Entrega global con máxima seguridad y empaque de lujo artesanal.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}
