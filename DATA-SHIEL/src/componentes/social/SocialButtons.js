import React, { useEffect, useState } from 'react';
import './SocialButtons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import defaultContactData, { loadContactData } from '../../data/contactData';

function SocialButtons() {
    const [contact, setContact] = useState(defaultContactData);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const data = await loadContactData();
                if (active) {
                    setContact(data);
                }
            } catch (e) {
                console.error('Error cargando datos de contacto', e);
            }
        };
        load();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div>
            <div className="social-buttons">
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="social-button instagram">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="social-button linkedin">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            </div>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="whatsapp-button">
                <FontAwesomeIcon icon={faWhatsapp} />
            </a>
        </div>
    );
}

export default SocialButtons;
