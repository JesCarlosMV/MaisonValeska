import { motion } from 'framer-motion';
import { Product } from '../types';
import { Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary mb-6">
        <Link to={`/producto/${product.id}`}>
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <Link 
            to={`/producto/${product.id}`}
            className="w-12 h-12 rounded-full bg-bg-primary text-text-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-gold hover:text-white"
          >
            <Plus size={24} strokeWidth={1} />
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 rounded-full bg-bg-primary text-text-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-gold hover:text-white delay-75"
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] uppercase tracking-widest bg-bg-primary/90 px-3 py-1 text-text-primary font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-serif mb-1 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-text-primary/50 uppercase tracking-widest mb-2">
          {product.material}
        </p>
        <p className="text-sm font-medium tracking-wider">
          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </p>
      </div>
    </motion.div>
  );
};

export const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-semibold mb-4 block">
            Piezas Destacadas
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic">
            Selección de la Maison
          </h2>
        </div>
        <button className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-text-primary/20 pb-1 hover:border-gold hover:text-gold transition-all">
          Ver Todo el Catálogo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
