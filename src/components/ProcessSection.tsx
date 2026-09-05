import React from 'react';
import { TESTIMONIALS } from '../data/atelierData';
import { Compass, Scissors, Award, Star, CheckCircle, HeartHandshake, ShieldCheck } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico & Prueba de Medidas',
      subtitle: 'En probador privado',
      description: 'Te pruebas la prenda en nuestro taller. Analizamos la caída de la tela, tu postura natural y marcamos los ajustes con alfileres y tiza sastre para asegurar milímetro a milímetro el resultado deseado.',
      icon: Compass,
      tags: ['Tiza sastre', 'Análisis de caída', 'Asesoramiento estético']
    },
    {
      number: '02',
      title: 'Desmontaje & Puntada Artesanal',
      subtitle: 'Respeto absoluto al tejido',
      description: 'Descosemos con delicadeza sin rasgar las fibras originales. Empleamos hilos de alta tenacidad, puntada ciega manual en dobladillos de alta gama y maquinaria regulada para cada densidad de tela.',
      icon: Scissors,
      tags: ['Hilos Gütermann / Madeira', 'Puntada invisible a mano', 'Forros transpirables']
    },
    {
      number: '03',
      title: 'Planchado Sastre & Entrega Impecable',
      subtitle: 'Garantía de ajuste 100%',
      description: 'Tratamiento con plancha industrial de vapor continuo para asentar las costuras y dar volumen a la prenda. Te la pruebas en la recogida y te la llevas en funda protectora lista para lucir.',
      icon: Award,
      tags: ['Prensa de vapor profesional', 'Funda transpirable de cortesía', '15 días de garantía']
    }
  ];

  return (
    <section id="proceso" className="py-24 bg-[#F9F7F2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-800" />
            <span>El Método CENEIXE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Cómo trabajamos en nuestro taller
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-sans font-light">
            Una experiencia cuidada donde la prenda recupera su ajuste impecable y tú disfrutas de un servicio cercano, riguroso y puntual.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-sm p-8 relative flex flex-col justify-between hover:border-gray-400 transition-all duration-200 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-light text-amber-800">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-stone-50 text-gray-900 flex items-center justify-center border border-gray-200">
                      <IconComponent className="w-4 h-4 text-amber-800" />
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800 block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-1.5">
                  {step.tags.map((tag, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-xs text-gray-700 font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Testimonials & Trust */}
        <div className="rounded-sm bg-white border border-gray-200 p-8 sm:p-12 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800 block mb-2">
                Opiniones de Clientes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900">
                La confianza de quienes nos entregan sus prendas
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900 bg-stone-50 px-4 py-2 rounded-sm border border-gray-200">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-700">4.9 / 5 en más de 200 reseñas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-[#F9F7F2] p-6 rounded-sm border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic leading-relaxed mb-4 font-light">
                    "{t.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="font-medium text-xs uppercase tracking-wider text-gray-900">{t.name}</p>
                  <p className="text-[11px] text-gray-500">{t.role} • <span className="text-amber-800">{t.service}</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-light">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong className="font-semibold text-gray-900">Garantía de ajuste:</strong> Si requieres cualquier retoque tras probarte la prenda en casa, lo ajustamos sin coste adicional.
              </span>
            </div>
            <span className="text-gray-500 text-right uppercase tracking-widest text-[11px] font-medium shrink-0">
              CENEIXE • Alta Costura
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
