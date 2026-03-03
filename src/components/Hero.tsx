import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-ink">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1573408302185-9146fe634ad0?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Jewelry Hero"
          className="w-full h-full object-cover brightness-75"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-80 mb-4 block">
            Nueva Colección 2026
          </span>
          <h2 className="text-5xl md:text-8xl font-serif italic mb-8 leading-tight">
            L'Art de l'Éternité
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-10 py-4 bg-white text-ink text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-white transition-all duration-500">
              Explorar Colección
            </button>
            <button className="px-10 py-4 border border-white/30 backdrop-blur-sm text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-ink transition-all duration-500">
              Ver Alta Joyería
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div 
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};
