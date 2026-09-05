import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle, X } from 'lucide-react';
import { ATELIER_INFO } from './data/atelierData';

export default function App() {
  // Selected options passed to contact/booking form
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedGarment, setSelectedGarment] = useState<string>('');
  const [selectedNotes, setSelectedNotes] = useState<string>('');
  const [showFloatingTip, setShowFloatingTip] = useState<boolean>(true);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (service?: string, garment?: string, notes?: string) => {
    if (service) setSelectedService(service);
    if (garment) setSelectedGarment(garment);
    if (notes) setSelectedNotes(notes);
    scrollToSection('contacto');
  };

  const handleSelectServiceForBooking = (serviceName: string, garment: string, estimate?: string) => {
    setSelectedService(serviceName);
    setSelectedGarment(garment);
    if (estimate) setSelectedNotes(estimate);
    scrollToSection('contacto');
  };

  const handleRequestSimilarWork = (itemTitle: string) => {
    setSelectedService('Arreglo similar a trabajo de galería');
    setSelectedNotes(`Consulta inspirada en el trabajo previo: "${itemTitle}"`);
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToServices={() => scrollToSection('servicios')}
        />

        {/* 2. Services & Interactive Budget Calculator */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 3. Portfolio & Before-After Comparison Gallery */}
        <GallerySection
          onRequestSimilarWork={handleRequestSimilarWork}
        />

        {/* 4. The Atelier Craftsmanship Process & Reviews */}
        <ProcessSection />

        {/* 5. Direct Contact Hub & Booking Form */}
        <ContactSection
          initialService={selectedService}
          initialGarment={selectedGarment}
          initialNotes={selectedNotes}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Direct WhatsApp Helper Button */}
      <aside aria-label="Contacto flotante" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {showFloatingTip && (
          <div className="bg-white border border-gray-200 text-gray-900 px-3.5 py-2 rounded-sm shadow-md text-xs max-w-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
            <span className="font-light text-[11px] leading-tight">
              ¿Dudas sobre un arreglo? Envíanos una foto por WhatsApp
            </span>
            <button
              onClick={() => setShowFloatingTip(false)}
              className="text-gray-400 hover:text-gray-900 p-0.5"
              aria-label="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={`https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent('Hola CENEIXE, quisiera consultar disponibilidad para un arreglo.')}`}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="flex items-center gap-2 px-4 py-3 rounded-sm bg-emerald-700 text-white shadow-md hover:bg-emerald-800 transition-all duration-200 uppercase tracking-widest text-xs font-semibold"
          aria-label="Escribir por WhatsApp a CENEIXE"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </aside>
    </div>
  );
}
