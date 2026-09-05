import React, { useState } from 'react';
import { PORTFOLIO_LIST } from '../data/atelierData';
import { PortfolioItem } from '../types';
import { Sparkles, Eye, CheckCircle, Clock, X, ArrowRight, SlidersHorizontal, Quote } from 'lucide-react';

interface GallerySectionProps {
  onRequestSimilarWork: (itemTitle: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onRequestSimilarWork }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  
  // Track slider comparison position for each item or active modal
  const [comparisonSliderPos, setComparisonSliderPos] = useState<number>(50);
  const [cardViewModes, setCardViewModes] = useState<Record<string, 'after' | 'before'>>({});

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_LIST
    : PORTFOLIO_LIST.filter(item => item.category === selectedCategory);

  const toggleCardView = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardViewModes(prev => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before'
    }));
  };

  return (
    <section id="galeria" className="py-24 bg-[#F9F7F2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Trabajos Previos & Transformaciones</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
              Galería de composturas y alta sastrería
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-md font-sans font-light">
            Compara el antes y el después de nuestras intervenciones textiles. Cada puntada está pensada para respetar la caída natural y la confección original de la prenda.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center flex-wrap gap-2 mb-12 pb-4 border-b border-gray-200">
          {[
            { id: 'all', label: 'Todos los trabajos' },
            { id: 'sastreria', label: 'Sastrería & Trajes' },
            { id: 'fiesta', label: 'Ceremonia & Novias' },
            { id: 'transformacion', label: 'Upcycling & Vintage' },
            { id: 'arreglos', label: 'Denim & Diario' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const currentMode = cardViewModes[item.id] || 'after';
            const displayImage = currentMode === 'before' ? item.beforeImage : item.afterImage;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveItem(item);
                  setComparisonSliderPos(50);
                }}
                className="group cursor-pointer rounded-sm bg-white border border-gray-200 overflow-hidden transition-all duration-200 hover:border-gray-400 hover:shadow-sm flex flex-col"
              >
                {/* Image Container with Before/After Toggle */}
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  <img
                    src={displayImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-900/85 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider rounded-sm uppercase">
                      {item.tag}
                    </span>
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider backdrop-blur-xs ${
                      currentMode === 'after' 
                        ? 'bg-emerald-700/90 text-white' 
                        : 'bg-amber-700/90 text-white'
                    }`}>
                      {currentMode === 'after' ? 'Resultado Final' : 'Antes'}
                    </span>
                  </div>

                  {/* Toggle Mode Button */}
                  <button
                    onClick={(e) => toggleCardView(item.id, e)}
                    className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-900 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-xs backdrop-blur-xs transition-colors flex items-center gap-1.5 z-10 border border-gray-200"
                    title="Alternar entre antes y después"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
                    <span>Ver {currentMode === 'after' ? 'Antes' : 'Después'}</span>
                  </button>

                  {/* Hover Inspect Prompt */}
                  <div className="absolute inset-0 bg-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white text-gray-900 text-xs font-medium uppercase tracking-widest shadow-md">
                      <Eye className="w-4 h-4 text-amber-800" />
                      <span>Comparar antes y después</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed font-light">
                      {item.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="space-y-1.5 mb-4">
                      {item.details.slice(0, 2).map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-light">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-800" />
                      <span>Plazo: {item.completionTime}</span>
                    </span>

                    <span className="font-semibold uppercase tracking-wider text-xs text-gray-900 group-hover:text-amber-800 flex items-center gap-1">
                      <span>Ver detalles</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail & Interactive Before/After Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F9F7F2] rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-300 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left: Interactive Before/After Slider */}
              <div className="lg:col-span-7 bg-stone-200 relative min-h-[350px] lg:min-h-[500px] overflow-hidden">
                
                {/* AFTER Image (Full background) */}
                <img
                  src={activeItem.afterImage}
                  alt={`Resultado final de ${activeItem.title}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                
                {/* BEFORE Image (Clipped by slider position) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${comparisonSliderPos}%` }}
                >
                  <img
                    src={activeItem.beforeImage}
                    alt={`Estado previo de ${activeItem.title}`}
                    className="absolute inset-y-0 left-0 w-full h-full object-cover object-center max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute bottom-4 left-4 bg-gray-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    Antes (Prenda original)
                  </div>
                </div>

                {/* After Label Badge */}
                <div className="absolute bottom-4 right-4 bg-emerald-700/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  Después (Ajuste CENEIXE)
                </div>

                {/* Draggable Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none"
                  style={{ left: `${comparisonSliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-900 flex items-center justify-center text-gray-900">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
                  </div>
                </div>

                {/* Range Input for Smooth Dragging */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparisonSliderPos}
                  onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                  aria-label="Deslizar para comparar antes y después"
                />

                <div className="absolute top-4 left-4 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-sm pointer-events-none backdrop-blur-xs uppercase tracking-wider font-medium text-[10px]">
                  ↔ Desliza para comparar
                </div>
              </div>

              {/* Right: Technical Notes & Client Impact */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-amber-800 mb-2">
                    <span>{activeItem.tag}</span>
                    <span>•</span>
                    <span className="text-emerald-700">Completado en {activeItem.completionTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 mb-4">
                    {activeItem.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                    {activeItem.description}
                  </p>

                  {/* Craftsmanship Details */}
                  <div className="bg-[#F9F7F2] p-4 rounded-sm border border-gray-200 mb-6">
                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-900 mb-2.5">
                      Ficha de intervención técnica
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-700 font-light">
                      {activeItem.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-800 mt-1.5 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Client Quote */}
                  {activeItem.clientNote && (
                    <div className="relative pl-5 py-1 italic text-xs text-gray-600 border-l-2 border-amber-800 mb-6 font-light">
                      <Quote className="w-3.5 h-3.5 text-amber-800 absolute -left-1.5 top-0 bg-white" />
                      "{activeItem.clientNote}"
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onRequestSimilarWork(activeItem.title);
                      setActiveItem(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-amber-800 text-white text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-amber-700 transition-colors shadow-xs"
                  >
                    <span>Solicitar un arreglo similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-center text-gray-500 font-light">
                    Te asesoraremos personalmente sobre la viabilidad y caída en tu prenda.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
