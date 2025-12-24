import React, { useState } from 'react';
import './Servicios.css';

const services = [
  {
    id: 'proteccion-datos',
    title: 'Protección de Datos Personales',
    description:
      'Asesoramiento y auditoría en privacidad, Habeas Data, protección de imagen, robo de identidad, derechos de acceso/rectificación/supresión, videovigilancia, informes comerciales y reclamaciones en salud. Redacción de documentos y políticas internas.',
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad',
    description:
      'Identificamos, detectamos, protegemos y respondemos ante ataques. Buenas prácticas de seguridad, medidas preventivas, investigaciones digitales y capacitaciones adaptadas a tu organización.',
  },
  {
    id: 'defensa-consumidor',
    title: 'Defensa del Consumidor y Competencia',
    description:
      'Asesoramiento preventivo y representación en litigios individuales/colectivos, procedimientos administrativos y reclamos extrajudiciales en materia de consumo y competencia.',
  },
  {
    id: 'derecho-corporativo',
    title: 'Derecho Corporativo – Societario',
    description:
      'Creación y seguimiento de estructuras societarias: Startups, fintech, franquicias. Actas, trámites ante IGJ, fusiones, disoluciones y variaciones de capital.',
  },
  {
    id: 'compraventas',
    title: 'Compraventas y Contratos',
    description:
      'Compraventa de bienes, acuerdos societarios, redacción de contratos, transferencias de fondo de comercio y asesoramiento contractual integral.',
  },
  {
    id: 'propiedad-intelectual',
    title: 'Propiedad Intelectual',
    description:
      'Protección de software, marcas, modelos industriales, diseños, patentes y defensa de activos intangibles mediante negociación, mediación y litigios.',
  },
  {
    id: 'laboral',
    title: 'Laboral',
    description:
      'Despidos, enfermedades, ausentismo, derecho individual y colectivo. Estrategias con RRHH para contratación y gestión interna.',
  },
];

function ServicesContainer() {
  const [selected, setSelected] = useState(null);

  const closeModal = () => setSelected(null);

  return (
    <div className="contenedor-servicios">
      <h2>Nuestros Servicios</h2>
      <div className="services-list">
        {services.map((service) => (
          <button
            key={service.id}
            className="service-pill"
            onClick={() => setSelected(service)}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="service-modal" onClick={closeModal}>
          <div className="service-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="service-modal__close" onClick={closeModal}>×</button>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesContainer;
