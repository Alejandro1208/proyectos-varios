import React, { useEffect } from 'react';
import './PackagesContainer.css'; 

function PackagesContainer() {

  useEffect(() => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            obs.unobserve(entry.target); // deja de observar una vez animado
          }
        });
      },
      {
        threshold: 0.2, // 20% visible para disparar la animación
      }
    );

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <h2>Nuestros Paquetes</h2>
      <div className="card-container">
        <div className="card">
          <h3>PACK INDIVIDUAL 1</h3>
          <p>2 hs de reunión sesión online inicio...</p>
          <a href="#" className="button">Consultar</a>
        </div>
        <div className="card">
          <h3>PACK INDIVIDUAL 1</h3>
          <p>2 hs de reunión sesión online inicio...</p>
          <a href="#" className="button">Consultar</a>
        </div>
        <div className="card">
          <h3>PACK INDIVIDUAL 1</h3>
          <p>2 hs de reunión sesión online inicio...</p>
          <a href="#" className="button">Consultar</a>
        </div>
        <div className="card">
          <h3>PACK INDIVIDUAL 1</h3>
          <p>2 hs de reunión sesión online inicio...</p>
          <a href="#" className="button">Consultar</a>
        </div>
      </div>
    </div>
  );
}

export default PackagesContainer;
