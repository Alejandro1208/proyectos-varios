
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-blue-600 p-12 lg:p-16 text-white">
            <h2 className="text-4xl font-black mb-8">Hablemos de su equipo.</h2>
            <p className="text-blue-100 text-lg mb-12 leading-relaxed font-medium">
              Complete el formulario y un técnico especializado se pondrá en contacto con usted en menos de 2 horas.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <i className="fas fa-phone-alt text-2xl"></i>
                </div>
                <div>
                  <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">Llámanos</p>
                  <p className="text-xl font-bold">11 5905-0637</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <i className="fas fa-envelope text-2xl"></i>
                </div>
                <div>
                  <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-bold">vhn@gastronomia.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <i className="fas fa-map-marker-alt text-2xl"></i>
                </div>
                <div>
                  <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-1">Ubicación</p>
                  <p className="text-xl font-bold">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-12 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                    placeholder="Ej: 11 1234 5678"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Su Mensaje / Consulta</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium resize-none"
                  placeholder="Describa el problema o el equipo que necesita reparar..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-black text-white px-10 py-6 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-xl"
              >
                Enviar Consulta <i className="fas fa-paper-plane ml-3"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
