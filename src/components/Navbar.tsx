import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = isHomePage
    ? (isScrolled ? 'bg-bg-primary/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8')
    : 'bg-bg-primary/95 backdrop-blur-md py-4 shadow-sm border-b border-border-primary';

  const textClasses = isHomePage
    ? (isScrolled ? 'text-text-primary' : 'text-white')
    : 'text-text-primary';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navClasses}`}>
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-colors duration-500 ${textClasses}`}>
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          <Link to="/colecciones" className="hover:text-gold transition-colors">Colecciones</Link>
          <Link to="/alta-joyeria" className="hover:text-gold transition-colors">Alta Joyería</Link>
          <Link to="/universo" className="hover:text-gold transition-colors">El Universo</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center group">
          <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase transition-colors group-hover:text-gold">
            Valeska
          </h1>
          <p className="text-[8px] tracking-[0.4em] uppercase opacity-60 -mt-1">
            Haute Joaillerie
          </p>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button 
            onClick={toggleTheme}
            className="hover:text-gold transition-colors p-2"
            aria-label="Toggle theme"
          >
            {isHomePage && !isScrolled 
              ? <Sun size={20} strokeWidth={1.5} />
              : (theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />)
            }
          </button>
          <button className="hidden md:block hover:text-gold transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/login" className="hover:text-gold transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/carrito" className="relative hover:text-gold transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 bg-bg-primary z-[60] p-8 flex flex-col text-text-primary"
          >
            <button 
              className="self-end mb-12"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col space-y-8 text-2xl font-serif italic">
              <Link to="/colecciones" onClick={() => setIsMobileMenuOpen(false)}>Colecciones</Link>
              <Link to="/alta-joyeria" onClick={() => setIsMobileMenuOpen(false)}>Alta Joyería</Link>
              <Link to="/universo" onClick={() => setIsMobileMenuOpen(false)}>El Universo</Link>
              <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
