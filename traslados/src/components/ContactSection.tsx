import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, PhoneCall, Bus } from 'lucide-react';
import companyData from '../data/companyData.json';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    passengers: '19',
    serviceType: 'Corporativo / Industrial',
    message: ''
  });

  const company = companyData.company;
  const whatsappUrl = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent('Hola, me contacto desde la sección de Contacto de la web para realizar una consulta sobre traslados.')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message with prefilled data
    const message = `Hola! Mi nombre es ${formData.name} ${formData.company ? `de la empresa (${formData.company})` : ''}.\nQuisiera consultar sobre:\n- Servicio: ${formData.serviceType}\n- Pasajeros estimados: ${formData.passengers}\n- Email: ${formData.email}\n- Teléfono: ${formData.phone}\n- Mensaje: ${formData.message}`;
    
    window.open(`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/60 inline-block">
            Contacto Directo & Cotizaciones
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Viajá con Nosotros • Contactanos
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Respuestas inmediatas para empresas, instituciones y organizadores de eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
              
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
                <Bus className="w-5 h-5 text-blue-400" />
                <span>Canales Oficiales de Atención</span>
              </h3>

              {/* Phone Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Teléfono & WhatsApp</div>
                  <a 
                    href={`tel:${company.formattedPhone}`}
                    className="text-lg font-bold text-white hover:text-blue-300 transition-colors"
                  >
                    {company.phone}
                  </a>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Atención directa vía WhatsApp
                  </div>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Correo Electrónico</div>
                  <a 
                    href={`mailto:${company.email}`}
                    className="text-base font-bold text-white hover:text-indigo-300 transition-colors break-all"
                  >
                    {company.email}
                  </a>
                  <div className="text-xs text-slate-400 mt-0.5">Consultas corporativas y presupuestos</div>
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Horario de Servicio</div>
                  <div className="text-sm font-bold text-white">{company.operatingHours}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Operatividad continua las 24 horas</div>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xl transition-all flex items-center justify-between border border-emerald-400/40 group"
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-7 h-7 text-emerald-100 animate-bounce" />
                <div>
                  <div className="text-base font-bold">¿Necesitas respuesta inmediata?</div>
                  <div className="text-xs text-emerald-100 font-normal">Chateá directamente con nuestro equipo de logística</div>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-700 group-hover:bg-emerald-800 uppercase tracking-wider">
                Enviar
              </span>
            </a>

          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
            
            <h3 className="text-2xl font-bold text-white mb-2">
              Solicitar Presupuesto Personalizado
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-8">
              Complete los detalles de su viaje o servicio corporativo para recibir una cotización formal sin compromiso.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">¡Consulta Enviada!</h4>
                <p className="text-sm text-slate-300">
                  Se ha redirigido a WhatsApp con su solicitud completada. Nos pondremos en contacto a la brevedad.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Roberto Gómez"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Empresa u Organización (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ej. Logística Industrial S.A."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 ..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email de Contacto *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tipo de Servicio
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Corporativo / Industrial">Traslado de Personal Industrial</option>
                      <option value="Turismo Receptivo Extranjeros">Turismo Receptivo para Empresas</option>
                      <option value="Eventos / Recreativo Grupal">Viajes Recreativos / Clubes / Eventos</option>
                      <option value="Otro Servicio">Otro requerimiento especial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Cantidad de Pasajeros Aprox.
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Hasta 19 pax (1 Sprinter)">Hasta 19 Pasajeros (1 Sprinter)</option>
                      <option value="Hasta 38 pax (2 Sprinters)">Hasta 38 Pasajeros (2 Sprinters)</option>
                      <option value="Hasta 60 pax (3 Sprinters)">Hasta 60 Pasajeros (3 Sprinters)</option>
                      <option value="Más de 60 pax">Más de 60 Pasajeros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Detalles del Viaje (Origen, Destino, Fechas, Horarios)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Especifique el origen, punto de llegada, fechas estimadas o requerimientos especiales..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 border border-blue-400/30"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Consulta y Cotizar por WhatsApp</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
