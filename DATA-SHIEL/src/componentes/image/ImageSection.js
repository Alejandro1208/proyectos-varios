import React from 'react';
import './ImageSection.css'; 
import image from './img/Justice-amico.svg'; 


function ImageSection() {
    return (
        <div className="image-section">
            <div className="card-dos">
                <div>
                    <h2>Defensa y privacidad integral</h2>
                    <p>También asistimos y asesoramos a personas, en su defensa jurídica en los caso de denuncias y reclamaciones, para que sus derechos no se encuentren vulnerados.</p>
          <p>Suprimimos, Accedemos y Rectificamos- Derechos ARCO+ - todos los antecedentes de deudas de los informes comerciales vigentes. Litigación contra entidades bancarias financieras por error en divulgación de información en las bases de datos. Eliminación de avisos publicitarios, Casos de suplantación de identidad.</p>
          <p>Trabajamos en tratamiento de datos personales de menores de edad y personas en situación de vulnerabilidad, su privacidad, protección de la imagen.</p>
          <p>Violencia Digital y Viol de Género.</p>
                </div>
                <div>
                    <img src={image} alt="" width="200px" />
                </div>
            </div>
        </div>
    );
}

export default ImageSection;
