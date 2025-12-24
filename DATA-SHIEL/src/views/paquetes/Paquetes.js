import BannerMedio from '../../componentes/bannerMedio/BannerMedio';
import backgroundImage from '../../images/banner-paquetes.jpg'
import './Paquetes.css';
import React from 'react';
import Paquetes from '../../componentes/packages/PackagesContainer'
import 'aos/dist/aos.css';

const Contactenos = () => {
  return (
    <div className="contactenos">
      <BannerMedio texto="Paquetes" backgroundImage={backgroundImage} bannerKey="paquetes" />
      <Paquetes></Paquetes>
    </div>
  );
}

export default Contactenos;
