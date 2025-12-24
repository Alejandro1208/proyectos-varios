import React, { useEffect, useState } from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
import defaultBanners, { loadBanners } from '../../data/banners';


function Banner() {
    const [banner, setBanner] = useState(defaultBanners.home);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const data = await loadBanners();
                if (active && data.home) {
                    setBanner(data.home);
                }
            } catch (e) {
                console.error('Error cargando banner home', e);
            }
        };
        load();

        return () => {
            active = false;
        };
    }, []);

    const bgImage = typeof window !== 'undefined' && window.innerWidth < 768
        ? (banner.mobile_image || banner.desktop_image)
        : (banner.desktop_image || banner.mobile_image);

    return (
        <div className="banner" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="banner-content">
                <h1 className="title"><em>DATASHIELD</em></h1>
                <p className="subtitle">PRIMERA CONSULTORÍA JURÍDICA INTEGRAL ESPECIALIZADA EN PROTECCIÓN DE DATOS PERSONALES, PRIVACIDAD Y SEGURIDAD DE LA INFORMACIÓN para Personas Físicas, Empresas, e Instituciones Públicas y Privadas a nivel nacional e internacional.</p>
                <Link to="/servicios" className="button-one">Ver más</Link>
                <Link to="/contacto" className="button-two">Contacto</Link>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor:"#b1892e", stopOpacity:1}} />
                        <stop offset="44%" style={{stopColor:"#b1892e", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#0c0c0c", stopOpacity:1}} />
                    </linearGradient>
                </defs>
                <path fill="url(#grad1)" d="M0,192L34.3,197.3C68.6,203,137,213,206,213.3C274.3,213,343,203,411,176C480,149,549,107,617,106.7C685.7,107,754,149,823,186.7C891.4,224,960,256,1029,266.7C1097.1,277,1166,267,1234,240C1302.9,213,1371,171,1406,149.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
            </svg>
        </div>
    );
}

export default Banner;
