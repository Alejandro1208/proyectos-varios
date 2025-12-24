import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    hcaptcha: any;
  }
}

const HCAPTCHA_SITE_KEY = 'b52e8d14-84be-4d78-96c0-f6ee31427878';
const HCAPTCHA_SCRIPT_SRC = 'https://js.hcaptcha.com/1/api.js?hl=es';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaId, setCaptchaId] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);

  // Ensure hCaptcha script is loaded and widget is rendered
  useEffect(() => {
    const renderCaptcha = () => {
      if (!window.hcaptcha || !captchaRef.current) return;
      // Avoid rendering multiple times if already present
      const hasIframe = captchaRef.current.querySelector('iframe');
      if (hasIframe) return;
      const id = window.hcaptcha.render(captchaRef.current, { sitekey: HCAPTCHA_SITE_KEY });
      setCaptchaId(id);
    };

    if (window.hcaptcha) {
      renderCaptcha();
      return;
    }

    const existingScript = document.querySelector(`script[src="${HCAPTCHA_SCRIPT_SRC}"]`) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', renderCaptcha, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = HCAPTCHA_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = renderCaptcha;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFormState('submitting');

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());
    const hcaptchaToken = (captchaId !== null ? window.hcaptcha?.getResponse(captchaId) : window.hcaptcha?.getResponse()) || data['h-captcha-response'];

    if (!hcaptchaToken) {
      setErrorMessage('Por favor completa el hCaptcha antes de enviar.');
      setFormState('error');
      return;
    }

    const payload = {
      ...data,
      'h-captcha-response': hcaptchaToken,
    };

    try {
      const response = await fetch('/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormState('success');
        if (window.hcaptcha) {
          if (captchaId !== null) {
            window.hcaptcha.reset(captchaId);
          } else {
            window.hcaptcha.reset();
          }
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al enviar el formulario.');
        setFormState('error');
        if (window.hcaptcha) {
          if (captchaId !== null) {
            window.hcaptcha.reset(captchaId);
          } else {
            window.hcaptcha.reset();
          }
        }
      }
    } catch (error) {
      setErrorMessage('Error de red. Por favor, intente de nuevo.');
      setFormState('error');
      if (window.hcaptcha) {
        if (captchaId !== null) {
          window.hcaptcha.reset(captchaId);
        } else {
          window.hcaptcha.reset();
        }
      }
    }
  };
  
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Hablemos de su Proyecto</h2>
            <p className="text-slate-600 mb-10 text-lg">
              Solicite una cotización rápida o asesoría técnica especializada. Nuestro equipo de ingenieros está listo para diseñar la solución de filtrado perfecta.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <a href="https://wa.me/5491155129684" target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-lg text-blue-600 mt-1 hover:bg-blue-200 transition-colors">
                  <Phone size={20} />
                </a>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase">Teléfonos / WhatsApp</h4>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href="https://wa.me/5491155129684" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                      +54 9 11 5512-9684
                    </a>
                    <a href="https://wa.me/5491131576788" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">
                      +54 9 11 3157-6788
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mt-1">
                  <Mail size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase">Email</h4>
                  <p className="text-slate-600">ventas@ingefilt.com</p>
                  <p className="text-slate-600">ingenieria@ingefilt.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mt-1">
                  <MapPin size={20} />
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase">Ubicación</h4>
                  <a href="https://maps.app.goo.gl/aK7vaiGZSwsiE33N6?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">
                    4076 Valparaiso
                    <br />
                    Tortuguitas, Provincia de Buenos Aires
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center p-4 text-center animate-fade-in h-full min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Envío Exitoso!</h3>
                <p className="text-slate-600 mb-8">
                  Gracias por contactarnos. Un ingeniero especialista revisará su requerimiento y se pondrá en contacto a la brevedad.
                </p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-6 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Juan Pérez" 
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="Su Empresa S.A." 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="+54 9 11 5512-9684" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="juan@ejemplo.com" 
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Detalles del Requerimiento</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4} 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    placeholder="Necesito filtros para pozo de agua, ranura 0.50mm..."
                  ></textarea>
                </div>

                <div ref={captchaRef} className="h-captcha" data-sitekey={HCAPTCHA_SITE_KEY}></div>

                {formState === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Solicitud"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
