import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Modal.css';

const defaultPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CookieIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path
      d="M53.9 32.8a3.9 3.9 0 0 1-5.4-3.6 3.9 3.9 0 0 1-6.2-4.7 3.9 3.9 0 0 1-5-5.8 3.9 3.9 0 0 1-5.8-2.7A24 24 0 1 0 53.9 32.8Z"
      fill="#d29b60"
    />
    <circle cx="25" cy="20" r="3" fill="#b0733b" />
    <circle cx="21" cy="39" r="3" fill="#b0733b" />
    <circle cx="39" cy="43" r="3" fill="#b0733b" />
    <circle cx="36" cy="27" r="2.5" fill="#b0733b" />
    <circle cx="27.5" cy="49" r="2.5" fill="#b0733b" />
    <circle cx="14" cy="29" r="2.5" fill="#b0733b" />
  </svg>
);

const readStoredPreferences = () => {
  try {
    const stored = localStorage.getItem('cookiePreferences');
    if (stored) {
      return { prefs: JSON.parse(stored), show: false };
    }
    const legacyAccepted = localStorage.getItem('acceptedCookies');
    if (legacyAccepted === 'true') {
      const allAccepted = { ...defaultPreferences, functional: true, analytics: true, marketing: true };
      localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
      return { prefs: allAccepted, show: false };
    }
  } catch (e) {
    // si localStorage no está disponible, mostramos modal Safely
  }
  return { prefs: defaultPreferences, show: true };
};

function Modal() {
  const { prefs, show } = readStoredPreferences();
  const [showModal, setShowModal] = useState(show);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState(prefs);

  const saveAndClose = (prefs) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowModal(false);
    setShowSettings(false);
  };

  const handleAccept = () => {
    saveAndClose({ necessary: true, functional: true, analytics: true, marketing: true });
  };

  const handleReject = () => {
    saveAndClose({ necessary: true, functional: false, analytics: false, marketing: false });
  };

  const handlePersonalize = () => setShowSettings(true);

  const handleSaveCustom = () => saveAndClose(preferences);

  const togglePreference = (key) => {
    if (key === 'necessary') return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="myModal" className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="cookie-icon">
            <CookieIcon />
          </div>
          <div>
            <h2>Preferencias de cookies</h2>
            <p>
              Usamos cookies necesarias y otras opcionales para mejorar tu experiencia. Puedes
              decidir ahora o ajustar más tarde. <Link to="/politica-privacidad">Ver detalles</Link>
            </p>
          </div>
        </div>

        {showSettings ? (
          <div className="modal-settings">
            <div className="setting-row">
              <div>
                <h3>Necesarias</h3>
                <p>Imprescindibles para que el sitio funcione correctamente.</p>
              </div>
              <label className="cookie-switch">
                <input type="checkbox" checked readOnly />
                <span className="cookie-slider locked" />
              </label>
            </div>
            <div className="setting-row">
              <div>
                <h3>Funcionales</h3>
                <p>Recuerdan tus preferencias (idioma, secciones vistas).</p>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => togglePreference('functional')}
                />
                <span className="cookie-slider" />
              </label>
            </div>
            <div className="setting-row">
              <div>
                <h3>Analíticas</h3>
                <p>Nos ayudan a medir el rendimiento y mejorar el sitio.</p>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                />
                <span className="cookie-slider" />
              </label>
            </div>
            <div className="setting-row">
              <div>
                <h3>Marketing</h3>
                <p>Permiten ofrecer contenido y promociones relevantes.</p>
              </div>
              <label className="cookie-switch">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => togglePreference('marketing')}
                />
                <span className="cookie-slider" />
              </label>
            </div>
            <div className="button-container settings-actions">
              <button className="modal-button cancel" onClick={() => setShowSettings(false)}>
                Volver
              </button>
              <button className="modal-button accept" onClick={handleSaveCustom}>
                Guardar y aceptar
              </button>
            </div>
          </div>
        ) : (
          <div className="button-container">
            <button className="modal-button cancel" onClick={handleReject}>
              No acepto
            </button>
            <button className="modal-button personalize" onClick={handlePersonalize}>
              Personalizado
            </button>
            <button className="modal-button accept" onClick={handleAccept}>
              Acepto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
