import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={64} className="text-gold mb-8 opacity-20" strokeWidth={1} />
        <h2 className="text-3xl font-serif italic mb-4">Su bolsa está vacía</h2>
        <p className="text-text-primary/60 mb-8 font-light max-w-md">
          Descubra nuestras colecciones exclusivas y encuentre la pieza perfecta para su legado.
        </p>
        <Link to="/" className="px-12 py-4 bg-ink text-white dark:bg-white dark:text-ink text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all">
          Seguir Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-serif italic mb-12">Su Bolsa de Compra ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-6 pb-8 border-b border-border-primary"
            >
              <div className="w-32 h-40 bg-bg-secondary overflow-hidden flex-shrink-0">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-text-primary/40 hover:text-red-500 transition-colors">
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-text-primary/50 mb-4">{item.material}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-border-primary">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-bg-secondary transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-bg-secondary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-medium">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary p-8 border border-border-primary sticky top-32">
            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold mb-8">Resumen del Pedido</h3>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between opacity-60">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalPrice)}</span>
              </div>
              <div className="flex justify-between opacity-60">
                <span>Envío</span>
                <span className="text-gold uppercase tracking-widest text-[10px] font-bold">Gratuito</span>
              </div>
              <div className="pt-4 border-t border-border-primary flex justify-between text-lg font-serif italic">
                <span>Total</span>
                <span>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalPrice)}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-ink text-white dark:bg-white dark:text-ink text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-3">
              Finalizar Compra <ArrowRight size={16} />
            </button>
            <p className="mt-6 text-[10px] text-center opacity-40 leading-relaxed uppercase tracking-widest">
              Impuestos incluidos. Pago seguro mediante encriptación SSL de 256 bits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
