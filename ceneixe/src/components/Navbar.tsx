import React, { useState, useEffect } from 'react';
import { Scissors, Phone, MessageCircle, Calendar, Menu, X } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería de Trabajos', href: '#galeria' },
    { name: 'Calculadora', href: '#calculadora' },
    { name: 'El Taller', href: '#proceso' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-gray-200 ${
        scrolled ? 'py-4 shadow-xs' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-gray-900 text-white flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <Scissors className="w-4 h-4 stroke-[1.75]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-light tracking-[0.25em] text-gray-900 uppercase block leading-none font-serif">
              {ATELIER_INFO.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-800 font-semibold block mt-1">
              Atelier de Costura
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest text-gray-500 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-500 hover:text-gray-900 transition-colors relative py-1 hover:border-b hover:border-gray-900"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Direct Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent('Hola CENEIXE, me gustaría consultar por un arreglo de costura.')}`}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-gray-700 border border-gray-200 bg-white rounded-sm hover:border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            id="nav-appointment-btn"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white bg-amber-800 rounded-sm hover:bg-amber-700 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Solicitar Cita</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-sm transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 pt-4 pb-6">
          <nav className="flex flex-col gap-3 mb-5 text-xs uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 py-1.5 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-800 text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-amber-700"
            >
              <Calendar className="w-4 h-4" />
              <span>Solicitar Cita Directa</span>
            </button>
            <a
              href={`https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent('Hola CENEIXE, me gustaría consultar por un arreglo de costura.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 text-gray-800 text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-gray-50"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Consultar por WhatsApp</span>
            </a>
            <a
              href={`tel:${ATELIER_INFO.phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-500"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Llamar al taller ({ATELIER_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
