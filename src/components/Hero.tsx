import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, CheckCircle2, Ruler, ShieldCheck, Clock } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToServices }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-gray-200 bg-[#F9F7F2]">
      {/* Subtle architectural background line */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-stone-200/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Atelier Abierto en Gamarra, Lima - Perú</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">Servicio Express 24/48h</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.12] mb-6">
              El arte de la costura <br className="hidden sm:inline" />
              <span className="italic font-normal text-stone-600">hecho a tu medida</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8 font-sans font-light">
              En <strong className="text-gray-900 font-medium">CENEIXE</strong> devolvemos la vida y el ajuste exacto a tus prendas favoritas. Desde ajustes milimétricos en sastrería y vestidos de gala, hasta transformaciones creativas y composturas cotidianas de alta costura.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                id="hero-book-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-amber-800 text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-amber-700 transition-colors shadow-xs"
              >
                <span>Solicitar Cita o Presupuesto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent('Hola CENEIXE, quisiera consultar disponibilidad y precio para un arreglo de costura.')}`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-300 text-gray-900 text-xs font-medium uppercase tracking-wider rounded-sm hover:border-gray-900 hover:bg-gray-50 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>

              <button
                onClick={onScrollToServices}
                id="hero-services-btn"
                className="inline-flex items-center justify-center px-4 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 font-medium transition-colors"
              >
                <span>Explorar servicios</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 w-full text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía de ajuste 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Prueba en probador privado</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Puntualidad garantizada</span>
              </div>
            </div>

          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-md border border-gray-200 bg-white p-2">
                <div className="w-full h-full relative overflow-hidden rounded-xs">
                  <img
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85"
                    alt="Taller de costura artesanal CENEIXE con cinta métrica y tijeras de sastre"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  
                  {/* Visual subtle overlay badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-medium">Artesanía Textil</span>
                    <p className="font-serif text-2xl italic font-light">Cada puntada cuenta una historia</p>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial / Craft Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-gray-200 p-4 rounded-sm shadow-lg max-w-[240px] text-xs">
                <div className="flex items-center gap-1.5 text-gray-900 font-medium uppercase tracking-wider text-[11px] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Alta Sastrería</span>
                </div>
                <p className="text-gray-600 leading-relaxed font-light text-[11px]">
                  Técnicas de desarmado y remallado sastre que preservan la confección original de la prenda.
                </p>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-gray-900 text-white px-4 py-2.5 rounded-sm shadow-md text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="font-medium text-xs tracking-wider uppercase leading-none">Trato Personalizado</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Probador y toma de medidas</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Atelier Numbers Strip */}
        <div className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {ATELIER_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-serif text-3xl sm:text-4xl font-light text-gray-900">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
