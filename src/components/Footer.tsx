import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-bg-secondary text-text-primary pt-24 pb-12 border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif tracking-widest uppercase">Valeska</h2>
            <p className="text-sm text-text-primary/60 leading-relaxed font-light">
              Desde 1924, Maison Valeska ha sido sinónimo de la más alta artesanía en joyería, 
              creando piezas que trascienden el tiempo y celebran los momentos más preciosos de la vida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-gold transition-colors"><Facebook size={20} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-gold transition-colors"><Twitter size={20} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-8">Servicios</h4>
            <ul className="space-y-4 text-sm text-text-primary/60 font-light">
              <li><a href="#" className="hover:text-text-primary transition-colors">Cita Privada</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Cuidado de Joyas</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Grabado Personalizado</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Guía de Tallas</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-8">La Maison</h4>
            <ul className="space-y-4 text-sm text-text-primary/60 font-light">
              <li><a href="#" className="hover:text-text-primary transition-colors">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Compromiso Ético</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Prensa</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-8">Newsletter</h4>
            <p className="text-sm text-text-primary/60 mb-6 font-light">
              Suscríbase para recibir invitaciones exclusivas y noticias de la Maison.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Su correo electrónico"
                className="w-full bg-transparent border-b border-border-primary py-2 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-text-primary transition-colors">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-border-primary flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-text-primary/40">
          <p>© 2026 Maison Valeska. Todos los derechos reservados.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
