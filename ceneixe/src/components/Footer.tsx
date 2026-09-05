import React from 'react';
import { Scissors, Heart, ArrowUp } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-12 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-sm bg-white text-gray-950 flex items-center justify-center">
                <Scissors className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="font-serif tracking-[0.25em] text-2xl font-normal uppercase text-white">
                {ATELIER_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-6 font-light">
              Taller de costura, sastrería y arreglos textiles en Gamarra, La Victoria - Lima, Perú. Cuidado milimétrico, pasión por el oficio y compromiso con prendas duraderas y perfectamente entalladas.
            </p>

            <div className="text-xs text-gray-400 space-y-1 font-light">
              <p>{ATELIER_INFO.address}</p>
              <p className="text-amber-500/90 font-medium">Tel: {ATELIER_INFO.phone} • WhatsApp: {ATELIER_INFO.whatsapp}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/90 mb-5">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-light">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios y Tarifas
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">
                  Galería de Trabajos Previos
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Calculadora de Presupuesto
                </a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-white transition-colors">
                  El Método del Taller
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Contacto & Cita Previa
                </a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/90 mb-5">
              Especialidades del Taller
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li>• Entalle de americanas y trajes sastre a mano</li>
              <li>• Ajustes finos de vestidos de novia e invitada</li>
              <li>• Subida de bajos conservando acabado original</li>
              <li>• Transformación y modernización de ropa vintage</li>
              <li>• Confección y adaptación de cortinas y textil hogar</li>
              <li>• Servicio urgente 24h/48h para eventos y viajes</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <p>© {new Date().getFullYear()} {ATELIER_INFO.name}. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Confeccionado con mimo artesanal <Heart className="w-3 h-3 text-amber-600 fill-amber-600" />
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-wider text-[11px]"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
