
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || success) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(result.message || 'Hubo un error al enviar el mensaje.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
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
                  <p className="text-xl font-bold">info@vhnservice.com</p>
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
              <div>
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full px-10 py-6 rounded-2xl font-black text-lg transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-xl disabled:opacity-70 flex items-center justify-center text-white
                    ${success ? 'bg-green-500' : 'bg-slate-900 hover:bg-black'}
                  `}
                >
                  {loading ? (
                    'Enviando...'
                  ) : success ? (
                    <i className="fas fa-check text-2xl"></i>
                  ) : (
                    <>
                      Enviar Consulta
                      <i className="fas fa-paper-plane ml-3"></i>
                    </>
                  )}
                </button>
                {error && <p className="text-red-600 mt-4 font-bold">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
