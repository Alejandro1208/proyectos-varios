import BannerMedio from '../../componentes/bannerMedio/BannerMedio';
import backgroundImage from '../../images/banner-dos.png'
import './Contactenos.css';
import Contacto from '../../componentes/contact/Contact'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contactenos = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
}, []);

  return (
    <div className="contactenos">
      <BannerMedio texto="Contáctenos" backgroundImage={backgroundImage} bannerKey="contacto" />
      <Contacto />
    </div>
  );
}

export default Contactenos;
