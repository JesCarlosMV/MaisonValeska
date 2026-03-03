import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Cargando...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Producto no encontrado</div>;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-text-primary/40 mb-12">
        <button onClick={() => navigate('/')} className="hover:text-gold">Inicio</button>
        <ChevronRight size={12} />
        <span className="text-text-primary/60">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-text-primary">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[4/5] bg-bg-secondary overflow-hidden"
        >
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="text-gold text-[11px] uppercase tracking-[0.4em] font-bold mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">{product.name}</h1>
          <p className="text-2xl font-light tracking-wider mb-8">
            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
          </p>
          
          <div className="space-y-6 mb-12">
            <p className="text-text-primary/70 leading-relaxed font-light">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-widest">
              <div className="p-4 bg-bg-secondary border border-border-primary">
                <span className="opacity-50 block mb-1">Material</span>
                <span className="font-semibold">{product.material}</span>
              </div>
              <div className="p-4 bg-bg-secondary border border-border-primary">
                <span className="opacity-50 block mb-1">Gema</span>
                <span className="font-semibold">{product.gemstone}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full py-5 bg-ink text-white dark:bg-white dark:text-ink text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-all duration-500 mb-8"
          >
            Añadir al Carrito
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border-primary">
            <div className="text-center space-y-2">
              <Shield size={20} className="mx-auto text-gold" strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-widest opacity-60 block">Seguridad Total</span>
            </div>
            <div className="text-center space-y-2">
              <Truck size={20} className="mx-auto text-gold" strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-widest opacity-60 block">Envío Express</span>
            </div>
            <div className="text-center space-y-2">
              <RotateCcw size={20} className="mx-auto text-gold" strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-widest opacity-60 block">Devolución 30d</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
