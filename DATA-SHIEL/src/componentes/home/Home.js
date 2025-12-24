import React from 'react';
import Banner from '../banner/Banner';
import OfferSection from '../offer/OfferSection';
import Servicios from '../servicios/Servicios';
import ImageSection from '../image/ImageSection';
import Contact from '../contact/Contact';
import Modal from '../modal/Modal';


function App() {
    return (
        <div className="App">
            <Banner />
            <OfferSection />
            <Servicios />
            {/* <PackagesContainer /> */}
            <ImageSection />
            <Contact />
            <Modal />
        </div>
    );
}

export default App;
