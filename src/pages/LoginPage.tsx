import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-bg-secondary p-10 border border-border-primary shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif italic mb-2">
            {isLogin ? 'Bienvenido de nuevo' : 'Crear Cuenta'}
          </h2>
          <p className="text-sm text-text-primary/60 font-light">
            {isLogin ? 'Acceda a su universo privado Valeska' : 'Únase a nuestra herencia exclusiva'}
          </p>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 opacity-60">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full bg-bg-primary border border-border-primary px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Su nombre"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 opacity-60">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="email" 
                className="w-full bg-bg-primary border border-border-primary pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="email@ejemplo.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 opacity-60">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="password" 
                className="w-full bg-bg-primary border border-border-primary pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-ink text-white dark:bg-white dark:text-ink text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-3">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border-primary text-center">
          <p className="text-xs text-text-primary/60 mb-6 font-light">O continuar con</p>
          <div className="flex justify-center gap-4">
            <button className="p-3 border border-border-primary hover:bg-bg-primary transition-colors">
              <Github size={20} />
            </button>
            <button className="p-3 border border-border-primary hover:bg-bg-primary transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] uppercase tracking-widest font-bold text-gold hover:text-text-primary transition-colors"
          >
            {isLogin ? '¿No tiene cuenta? Regístrese' : '¿Ya tiene cuenta? Inicie sesión'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
