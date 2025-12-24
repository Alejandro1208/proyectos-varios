import React, { useEffect, useState } from 'react';
import './Contact.css';
import contactImage from './img/logo.png';

const HCAPTCHA_SITE_KEY =
  process.env.REACT_APP_HCAPTCHA_SITE_KEY ||
  '021c471e-d8aa-492c-80a8-63d055326234';

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status.type === 'success') {
      const timer = setTimeout(() => setStatus({ type: null, message: '' }), 3500);
      return () => clearTimeout(timer);
    }
  }, [status.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!window.hcaptcha) {
      setStatus({
        type: 'error',
        message: 'No pudimos cargar la verificación. Recarga la página e inténtalo nuevamente.',
      });
      return;
    }

    const captchaToken = window.hcaptcha.getResponse();
    if (!captchaToken) {
      setStatus({
        type: 'error',
        message: 'Confirma que no eres un robot.',
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/contact-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });
      const body = await response.json();
      if (!response.ok || !body.success) {
        throw new Error(body.error || 'No se pudo enviar tu mensaje.');
      }

      setStatus({ type: 'success', message: 'Mensaje enviado. Te contactaremos pronto.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      window.hcaptcha.reset();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'No se pudo enviar tu mensaje.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit}>
        {status.type === 'success' && (
          <div className="form-toast">
            <span className="form-toast__icon">✔</span>
            <span>{status.message}</span>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="recaptcha-wrapper">
          <div className="h-captcha" data-sitekey={HCAPTCHA_SITE_KEY}></div>
        </div>

        {status.type === 'error' && status.message && (
          <p className="form-status form-status--error">{status.message}</p>
        )}

        <button type="submit" className="button" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <div className="info-card" data-aos="fade-right" data-aos-duration="2000">
        <h2>Dejanos tu consulta</h2>
        <img src={contactImage} alt="Descripción de la imagen" />
        <p></p>
      </div>
    </div>
  );
}

export default ContactSection;
