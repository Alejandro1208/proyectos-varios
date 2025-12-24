import BannerMedio from '../../componentes/bannerMedio/BannerMedio';
import backgroundImage from '../../images/banner-servicios.jpg';
import './Servicios.css';
import Servicios from '../../componentes/servicios/Servicios';
import React from 'react';

const Contactenos = () => {
    return (
        <div className="contactenos">
            <BannerMedio texto="Servicios" backgroundImage={backgroundImage} bannerKey="servicios" />

            <div className='servicios'>
                <Servicios/>
            </div>
        </div>
    );
}

export default Contactenos;
