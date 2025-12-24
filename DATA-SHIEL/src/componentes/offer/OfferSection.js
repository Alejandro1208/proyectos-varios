import React from 'react';
import './OfferSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; //


function OfferSection() {
    React.useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="section">
            <div className="section-content" data-aos="fade-right" data-aos-duration="2000">
                <h2>Lo que ofrecemos</h2>
                <p>En DATASHIELD brindamos asesoramiento integral a Personas Físicas y Jurídicas. Nos especializamos en Protección de Datos Personales, Privacidad, Seguridad de la Información, Acceso y Nuevas Tecnologías. Trabajamos y prevenimos los Ciberataques en las que pueda verse afectada su organización. Asesoramos en materia de Videovigilancia y compromisos de confidencialidad con los trabajadores.</p>
                <p>Ofrecemos charlas de capacitación y concientización orientadas a empleados de manera online - presencial sobre seguridad de la información, privacidad y protección de datos personales.</p>
                <p>Asesoramos y litigamos en defensa de entidades financieras, pequeñas y medianas empresas.</p>
            </div>
        </div>
    );
}

export default OfferSection;