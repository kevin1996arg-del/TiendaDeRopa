import React, { useState } from 'react';
import { SERVICES_LIST, ATELIER_INFO } from '../data/atelierData';
import { ServiceItem } from '../types';
import { 
  Scissors, 
  Clock, 
  Check, 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  MessageCircle,
  HelpCircle,
  Shield,
  Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string, garment: string, estimate?: string) => void;
}

type ServiceCategory = 'all' | 'arreglos' | 'sastreria' | 'fiesta' | 'transformacion' | 'hogar';

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('all');
  
  // Interactive Calculator State
  const [calcGarment, setCalcGarment] = useState<'pantalon' | 'americana' | 'vestido' | 'camisa' | 'abrigo' | 'hogar'>('pantalon');
  const [calcAlterations, setCalcAlterations] = useState<string[]>(['bajo']);
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'express'>('standard');
  const [calcQuantity, setCalcQuantity] = useState<number>(1);

  const filteredServices = activeTab === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === activeTab);

  // Price matrix for the interactive estimator
  const alterationOptions: Record<string, { id: string; label: string; price: number; days: number }[]> = {
    pantalon: [
      { id: 'bajo', label: 'Bajo simple a máquina', price: 12, days: 2 },
      { id: 'bajo_orig', label: 'Bajo original jeans (efecto desgastado)', price: 15, days: 2 },
      { id: 'cintura', label: 'Estrechar o ensanchar cintura', price: 18, days: 3 },
      { id: 'pernera', label: 'Estrechar pernera completa (tubo)', price: 20, days: 3 },
      { id: 'cremallera', label: 'Sustitución de cremallera', price: 14, days: 2 },
    ],
    americana: [
      { id: 'mangas', label: 'Acortar mangas simples', price: 25, days: 4 },
      { id: 'mangas_hombro', label: 'Acortar mangas desde el hombro', price: 45, days: 5 },
      { id: 'entallar', label: 'Entallar costados y espalda', price: 35, days: 4 },
      { id: 'hombros', label: 'Reducir hombreras / hombro', price: 40, days: 5 },
      { id: 'forro', label: 'Cambio integral de forro', price: 65, days: 6 },
    ],
    vestido: [
      { id: 'bajo_fiesta', label: 'Bajo en gasa o tejido fino con varias capas', price: 30, days: 4 },
      { id: 'entallar_corpiño', label: 'Entallar corpiño / pecho / cintura', price: 38, days: 5 },
      { id: 'tirantes', label: 'Ajustar tirantes o escote halter', price: 18, days: 3 },
      { id: 'cremallera_inv', label: 'Cambio de cremallera invisible', price: 22, days: 3 },
      { id: 'copas', label: 'Incorporar copas interiores', price: 20, days: 3 },
    ],
    camisa: [
      { id: 'mangas_camisa', label: 'Acortar mangas con puño sastre', price: 18, days: 3 },
      { id: 'entallar_camisa', label: 'Entallar costados o pinzas traseras', price: 16, days: 3 },
      { id: 'cuello', label: 'Voltear o reparar cuello gastado', price: 16, days: 3 },
      { id: 'bajo_camisa', label: 'Acortar bajo curvado', price: 14, days: 2 },
    ],
    abrigo: [
      { id: 'bajo_abrigo', label: 'Acortar bajo de paño o plumífero', price: 32, days: 4 },
      { id: 'mangas_abrigo', label: 'Acortar mangas de paño', price: 28, days: 4 },
      { id: 'cremallera_gruesa', label: 'Cremallera metálica reforzada', price: 28, days: 4 },
      { id: 'forro_abrigo', label: 'Cambio de forro térmico o satén', price: 75, days: 6 },
    ],
    hogar: [
      { id: 'bajo_cortina', label: 'Ajuste de bajo en cortina (por paño)', price: 16, days: 3 },
      { id: 'cinta_fruncir', label: 'Colocación de cinta fruncidora nueva', price: 18, days: 3 },
      { id: 'funda_cojin', label: 'Funda de cojín con cremallera oculta', price: 15, days: 3 },
    ]
  };

  const toggleAlteration = (altId: string) => {
    if (calcAlterations.includes(altId)) {
      if (calcAlterations.length > 1) {
        setCalcAlterations(calcAlterations.filter(id => id !== altId));
      }
    } else {
      setCalcAlterations([...calcAlterations, altId]);
    }
  };

  // Calculation formulas
  const currentOptions = alterationOptions[calcGarment] || [];
  const baseSubtotal = calcAlterations.reduce((sum, altId) => {
    const item = currentOptions.find(o => o.id === altId);
    return sum + (item ? item.price : 0);
  }, 0);

  const urgencyMultiplier = calcUrgency === 'express' ? 1.25 : 1.0;
  const estimatedTotal = Math.round(baseSubtotal * calcQuantity * urgencyMultiplier);
  const maxDays = Math.max(...calcAlterations.map(altId => {
    const item = currentOptions.find(o => o.id === altId);
    return item ? item.days : 2;
  }), 2);

  const estimatedDeliveryDays = calcUrgency === 'express' 
    ? Math.max(1, Math.round(maxDays / 2)) 
    : maxDays;

  const garmentLabels: Record<string, string> = {
    pantalon: 'Pantalón / Jeans',
    americana: 'Americana / Traje',
    vestido: 'Vestido / Fiesta',
    camisa: 'Camisa / Blusa',
    abrigo: 'Abrigo / Chaquetón',
    hogar: 'Textil Hogar / Cortinas'
  };

  const handleBookWithEstimate = () => {
    const selectedLabels = calcAlterations
      .map(id => currentOptions.find(o => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    
    const estimateSummary = `${garmentLabels[calcGarment]} (${selectedLabels}) - Estimado: ~S/ ${estimatedTotal} (${calcUrgency === 'express' ? 'Servicio Exprés' : 'Estándar'})`;
    onSelectServiceForBooking('Presupuesto Calculadora', garmentLabels[calcGarment], estimateSummary);
  };

  const getWhatsAppEstimateUrl = () => {
    const selectedLabels = calcAlterations
      .map(id => currentOptions.find(o => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const msg = `Hola CENEIXE, he calculado un presupuesto en vuestra web para:
- Prenda: ${garmentLabels[calcGarment]} (x${calcQuantity})
- Arreglos: ${selectedLabels}
- Modalidad: ${calcUrgency === 'express' ? 'Exprés (24-48h)' : 'Estándar (~' + estimatedDeliveryDays + ' días)'}
- Estimación aproximada: ~S/ ${estimatedTotal}
¿Tenéis disponibilidad para traer la prenda esta semana?`;

    return `https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="servicios" className="py-24 bg-[#F9F7F2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <Scissors className="w-3.5 h-3.5 text-amber-800" />
            <span>Nuestros Servicios Artesanales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Cada tejido tratado con maestría
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-sans font-light">
            Combinamos técnicas de sastrería tradicional y maquinaria especializada para garantizar costuras limpias, invisibles y de máxima durabilidad.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-14">
          {[
            { id: 'all', label: 'Todos los servicios' },
            { id: 'arreglos', label: 'Bajos y Composturas' },
            { id: 'sastreria', label: 'Sastrería & Trajes' },
            { id: 'fiesta', label: 'Ceremonia & Novias' },
            { id: 'transformacion', label: 'Upcycling & Vintage' },
            { id: 'hogar', label: 'Cortinas & Hogar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ServiceCategory)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between rounded-sm p-7 bg-white border transition-all duration-200 hover:shadow-sm ${
                service.popular
                  ? 'border-amber-800/40 ring-1 ring-amber-800/20'
                  : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800">
                    {service.category === 'sastreria' && 'Sastrería'}
                    {service.category === 'arreglos' && 'Compostura'}
                    {service.category === 'fiesta' && 'Alta Costura'}
                    {service.category === 'transformacion' && 'Diseño & Upcycling'}
                    {service.category === 'hogar' && 'Decoración'}
                  </span>

                  {service.popular && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-900 px-2 py-0.5 rounded-sm border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      Más solicitado
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-normal text-gray-900 mb-2.5">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 mb-5 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Desde</span>
                    <span className="font-serif text-2xl font-light text-gray-900">
                      S/ {service.basePrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Plazo habitual</span>
                    <span className="text-xs font-medium text-gray-700 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-amber-800" />
                      {service.timeEstimate}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(service.title, 'Prenda a consultar')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-widest text-gray-900 bg-stone-50 border border-gray-200 hover:bg-amber-800 hover:text-white hover:border-amber-800 transition-colors"
                >
                  <span>Pedir cita para este servicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Estimator / Budget Calculator Box */}
        <div id="calculadora" className="rounded-sm bg-gray-900 text-white p-6 sm:p-10 lg:p-12 shadow-lg border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800/30 rounded-full pointer-events-none blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-800 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gray-800 border border-gray-700 text-amber-300 text-xs font-medium uppercase tracking-wider mb-3">
                  <Calculator className="w-3.5 h-3.5 text-amber-400" />
                  <span>Herramienta Interactiva</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
                  Calculadora orientativa de arreglos
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xl font-light">
                  Selecciona el tipo de prenda y los ajustes necesarios para obtener una estimación de precio y fecha de entrega aproximada.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-300 bg-gray-800 px-4 py-2.5 rounded-sm border border-gray-700 self-start lg:self-center font-light">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Precios con IGV incluido. Presupuesto final confirmado en prueba presencial.</span>
              </div>
            </div>

            {/* Step 1: Select Garment */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-widest text-amber-300/90 mb-3">
                1. Selecciona el tipo de prenda
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { id: 'pantalon', label: 'Pantalón / Jeans' },
                  { id: 'americana', label: 'Americana / Traje' },
                  { id: 'vestido', label: 'Vestido / Fiesta' },
                  { id: 'camisa', label: 'Camisa / Blusa' },
                  { id: 'abrigo', label: 'Abrigo / Chaqueta' },
                  { id: 'hogar', label: 'Textil Hogar' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setCalcGarment(g.id as any);
                      const firstAlt = alterationOptions[g.id]?.[0]?.id;
                      if (firstAlt) setCalcAlterations([firstAlt]);
                    }}
                    className={`py-3 px-3 rounded-sm text-xs font-medium uppercase tracking-wider text-center transition-all ${
                      calcGarment === g.id
                        ? 'bg-white text-gray-900 font-semibold shadow-xs'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Alterations & Options */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-8">
                <label className="block text-xs font-semibold uppercase tracking-widest text-amber-300/90 mb-3">
                  2. ¿Qué ajustes necesitas? (Puedes seleccionar varios)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentOptions.map((opt) => {
                    const isSelected = calcAlterations.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleAlteration(opt.id)}
                        className={`flex items-center justify-between p-3.5 rounded-sm text-left text-xs transition-all border ${
                          isSelected
                            ? 'bg-white text-gray-900 border-white font-medium'
                            : 'bg-gray-800/80 text-gray-300 border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-xs flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-gray-900 border-gray-900 text-white'
                                : 'border-gray-500'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{opt.label}</span>
                        </div>
                        <span className={`font-semibold shrink-0 ml-2 ${isSelected ? 'text-gray-900' : 'text-amber-400'}`}>
                          +S/ {opt.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Urgency and Quantity */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4 bg-gray-800/90 p-5 rounded-sm border border-gray-700">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-amber-300/90 mb-2.5">
                    3. Plazo de entrega
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button
                      onClick={() => setCalcUrgency('standard')}
                      className={`py-2 px-3 rounded-sm text-xs font-medium uppercase tracking-wider text-center transition-all ${
                        calcUrgency === 'standard'
                          ? 'bg-white text-gray-900 font-semibold'
                          : 'bg-gray-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      Estándar ({estimatedDeliveryDays} d)
                    </button>
                    <button
                      onClick={() => setCalcUrgency('express')}
                      className={`py-2 px-3 rounded-sm text-xs font-medium uppercase tracking-wider text-center transition-all ${
                        calcUrgency === 'express'
                          ? 'bg-white text-gray-900 font-semibold'
                          : 'bg-gray-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      ⚡ Exprés (24-48h)
                    </button>
                  </div>

                  <label className="block text-xs font-semibold uppercase tracking-widest text-amber-300/90 mb-2">
                    Cantidad de prendas
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCalcQuantity(num)}
                        className={`w-8 h-8 rounded-sm text-xs font-semibold flex items-center justify-center transition-all ${
                          calcQuantity === num
                            ? 'bg-white text-gray-900'
                            : 'bg-gray-900 text-gray-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-700">
                  <p className="text-[11px] text-gray-400 flex items-center gap-1.5 font-light">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Entrega aprox: en ~{estimatedDeliveryDays} días laborales</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Results Bar */}
            <div className="bg-gray-800/80 border border-gray-700 rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1">
                  Presupuesto orientativo ({calcQuantity} {calcQuantity === 1 ? 'prenda' : 'prendas'})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-white">
                    ~S/ {estimatedTotal}
                  </span>
                  <span className="text-xs text-amber-300 uppercase tracking-wider">estimados</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Incluye fornituras estándar, hilos de alta tenacidad y planchado artesanal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href={getWhatsAppEstimateUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-emerald-700 text-white text-xs uppercase tracking-wider font-semibold hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar a WhatsApp</span>
                </a>

                <button
                  onClick={handleBookWithEstimate}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold hover:bg-amber-700 transition-colors shadow-xs"
                >
                  <span>Pedir Cita con este Presupuesto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
