import React, { useState } from 'react';
import { ATELIER_INFO, FAQS } from '../data/atelierData';
import { AppointmentFormData } from '../types';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  UploadCloud, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialGarment?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialGarment = '',
  initialNotes = ''
}) => {
  // Booking Form State
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    garmentType: initialGarment || 'pantalon',
    serviceType: initialService || 'Ajuste general',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: 'tarde',
    notes: initialNotes || '',
    hasPhoto: false
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  // Sync props if changed externally
  React.useEffect(() => {
    if (initialGarment) {
      setFormData(prev => ({ ...prev, garmentType: initialGarment }));
    }
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    }
    if (initialNotes) {
      setFormData(prev => ({ ...prev, notes: initialNotes }));
    }
  }, [initialGarment, initialService, initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'CEN-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomCode);
    setIsSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      setFormData(prev => ({ ...prev, hasPhoto: true }));
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Hola CENEIXE, me pongo en contacto desde vuestra web:
- Nombre: ${formData.fullName || 'Cliente'}
- Prenda: ${formData.garmentType}
- Arreglo: ${formData.serviceType}
- Urgencia: ${formData.urgency === 'express' ? 'Exprés (24-48h)' : 'Estándar'}
${formData.preferredDate ? `- Fecha preferida: ${formData.preferredDate}` : ''}
${formData.notes ? `- Detalles: ${formData.notes}` : ''}
¿Podríamos coordinar la cita o darme un presupuesto estimado? Gracias!`;

    return `https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contacto" className="py-24 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-white border border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageCircle className="w-3.5 h-3.5 text-amber-800" />
            <span>Contacto Directo & Citas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Estamos a tu disposición en el taller
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-sans font-light">
            Escríbenos directamente por WhatsApp, llámanos o reserva una cita con probador para atenderte sin esperas.
          </p>
        </div>

        {/* Direct Channel Cards (Fast Contact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${ATELIER_INFO.whatsappClean}?text=${encodeURIComponent('Hola CENEIXE, me gustaría hacer una consulta sobre un arreglo de ropa.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-sm bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-stone-50 border border-gray-200 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900 mb-1">WhatsApp Directo</h3>
              <p className="text-xs text-gray-600 mb-3 font-light">
                Envíanos una foto de tu prenda y te orientamos sobre viabilidad y presupuesto en minutos.
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <span>{ATELIER_INFO.whatsapp}</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Phone Call */}
          <a
            href={`tel:${ATELIER_INFO.phone.replace(/\s+/g, '')}`}
            className="group p-6 rounded-sm bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-stone-50 border border-gray-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900 mb-1">Teléfono Taller</h3>
              <p className="text-xs text-gray-600 mb-3 font-light">
                Llámanos durante el horario comercial para consultas urgentes o concertar cita.
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-900 flex items-center gap-1">
              <span>{ATELIER_INFO.phone}</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${ATELIER_INFO.email}?subject=Consulta%20CENEIXE`}
            className="group p-6 rounded-sm bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-stone-50 border border-gray-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900 mb-1">Correo Electrónico</h3>
              <p className="text-xs text-gray-600 mb-3 font-light">
                Para solicitudes de vestidos de novia, eventos o presupuestos detallados.
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-900 flex items-center gap-1">
              <span>{ATELIER_INFO.email}</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=Av+Aviación+470+Gamarra+La+Victoria+Lima+Perú"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-sm bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-sm bg-stone-50 border border-gray-200 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-900 mb-1">Taller Físico</h3>
              <p className="text-xs text-gray-600 mb-3 font-light">
                {ATELIER_INFO.address}
              </p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-900 flex items-center gap-1">
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </a>

        </div>

        {/* Main Interactive Contact Grid: Booking Form & Atelier Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left / Top: Interactive Booking & Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-sm p-7 sm:p-10 border border-gray-200 shadow-xs relative">
            
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800 block mb-1">
                Reserva con Probador o Cotización
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900">
                Solicitar Cita / Envío de Consulta
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-light">
                Completa el formulario y te confirmaremos tu cita en menos de 2 horas laborables.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-normal text-gray-900 mb-2">
                  ¡Solicitud Recibida con Éxito!
                </h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 font-light">
                  Hemos registrado tu solicitud con código <strong className="text-gray-900 font-mono">{bookingRef}</strong>. Nos pondremos en contacto contigo para confirmar la fecha y hora en el taller.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-emerald-700 text-white text-xs font-semibold uppercase tracking-widest hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir en WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setUploadedFileName(null);
                    }}
                    className="px-5 py-3 rounded-sm border border-gray-200 text-gray-900 text-xs font-semibold uppercase tracking-wider hover:bg-gray-50"
                  >
                    Hacer otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen Navarro"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="carmen@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Tipo de Prenda *
                    </label>
                    <select
                      value={formData.garmentType}
                      onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                    >
                      <option value="pantalon">Pantalón o Jeans</option>
                      <option value="traje">Traje / Americana sastre</option>
                      <option value="vestido">Vestido de fiesta o cóctel</option>
                      <option value="novia">Vestido de novia / Ceremonia</option>
                      <option value="abrigo">Abrigo o Chaquetón</option>
                      <option value="camisa">Camisa o Blusa</option>
                      <option value="upcycling">Transformación de prenda antigua</option>
                      <option value="hogar">Cortinas / Textil hogar</option>
                    </select>
                  </div>
                </div>

                {/* Urgency & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Prioridad del Arreglo
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'normal' })}
                        className={`py-2 px-3 rounded-sm text-xs uppercase tracking-wider font-medium text-center border transition-all ${
                          formData.urgency === 'normal'
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-[#F9F7F2] text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        Estándar (3-5d)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'express' })}
                        className={`py-2 px-3 rounded-sm text-xs uppercase tracking-wider font-medium text-center border transition-all ${
                          formData.urgency === 'express'
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-[#F9F7F2] text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        Exprés (24-48h)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                      Fecha sugerida para la prueba
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors font-light"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                    ¿Qué necesitas hacer en la prenda? (Detalles del arreglo)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej. Necesito estrechar 2 cm de cintura y acortar el bajo manteniendo el acabado original..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-gray-200 bg-[#F9F7F2] text-xs sm:text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none font-light"
                  />
                </div>

                {/* Photo Upload Simulator */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-gray-700 mb-1.5">
                    Adjuntar foto de la prenda o referencia (Opcional)
                  </label>
                  <label className="flex items-center justify-center gap-3 p-3.5 border-2 border-dashed border-gray-200 rounded-sm cursor-pointer hover:bg-stone-50 transition-colors">
                    <UploadCloud className="w-5 h-5 text-amber-800" />
                    <span className="text-xs text-gray-600 font-light">
                      {uploadedFileName ? (
                        <span className="font-medium text-emerald-700 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {uploadedFileName} (Adjuntada)
                        </span>
                      ) : (
                        'Haz clic para adjuntar foto o arrástrala aquí (JPG, PNG)'
                      )}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit button & WhatsApp alternative */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    id="submit-booking-form"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-sm bg-amber-800 text-white text-xs font-semibold uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar Solicitud</span>
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-sm border border-gray-200 text-gray-900 text-xs font-semibold uppercase tracking-wider hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-center text-gray-500 pt-1 font-light">
                  Respuesta media en WhatsApp: menos de 15 minutos en horario comercial.
                </p>

              </form>
            )}

          </div>

          {/* Right / Bottom: Workshop Hours & Physical Location Badge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Timetable Card */}
            <div className="bg-white p-7 rounded-sm border border-gray-200 shadow-xs">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-sm bg-stone-50 border border-gray-200 text-gray-900 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-normal text-gray-900">Horario de Atención</h4>
                  <p className="text-xs text-gray-500 font-light">Visitas sin cita o reservas prioritarias</p>
                </div>
              </div>

              <div className="space-y-3 text-xs divide-y divide-gray-100">
                <div className="pt-2 flex justify-between items-start">
                  <span className="font-medium text-gray-900 uppercase tracking-wider text-[11px]">Lunes a Viernes</span>
                  <span className="text-gray-600 text-right font-light">09:30 - 14:00<br />16:30 - 20:00</span>
                </div>
                <div className="pt-2 flex justify-between items-start">
                  <span className="font-medium text-gray-900 uppercase tracking-wider text-[11px]">Sábados</span>
                  <span className="text-gray-600 text-right font-light">10:00 - 14:00<br /><span className="text-[10px] text-amber-800">(Cita previa para pruebas)</span></span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="font-medium text-gray-400 uppercase tracking-wider text-[11px]">Domingos y Festivos</span>
                  <span className="text-gray-400 font-light">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Atelier Location & Proximity */}
            <div className="bg-white p-7 rounded-sm border border-gray-200 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-sm bg-stone-50 border border-gray-200 text-gray-900 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-normal text-gray-900">Ubicación del Taller</h4>
                  <p className="text-xs text-gray-500 font-light">Emporio Gamarra, La Victoria - Lima</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-4 leading-relaxed font-light">
                {ATELIER_INFO.address}. A escasos pasos de la Estación Gamarra (Línea 1), con probadores amplios y climatizados.
              </p>

              {/* Simulated Map Visual Card */}
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-gray-200 bg-stone-100 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                  alt="Ubicación mapa del taller CENEIXE en Lima, Perú"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                  <div className="bg-white text-gray-900 px-4 py-2 rounded-sm shadow-md flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-amber-800" />
                    <span>CENEIXE • Gamarra</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Av+Aviación+470+Gamarra+La+Victoria+Lima+Perú"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-sm border border-gray-200 text-gray-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
              >
                <span>Abrir ruta en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-gray-200">
          <div className="text-center mb-10">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800 block mb-1">
              Dudas Habituales
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900">
              Preguntas Frecuentes sobre el Taller
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-sm border border-gray-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-normal text-gray-900 hover:text-amber-800 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
