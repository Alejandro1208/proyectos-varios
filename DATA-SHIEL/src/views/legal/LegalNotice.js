import React, { useEffect, useState } from 'react';
import './LegalPage.css';
import defaultLegalContent, { getLegalPage } from '../../data/legalContent';
import { asHtml } from './richText';

const LegalNotice = () => {
  const [page, setPage] = useState(defaultLegalContent.aviso);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const current = await getLegalPage('aviso');
        if (active) {
          setPage(current);
        }
      } catch (e) {
        console.error('Error cargando aviso legal', e);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <h1>{page.title}</h1>
        <p dangerouslySetInnerHTML={asHtml(page.intro)} />
      </div>

      {page.sections.map((section, index) => (
        <section key={index} className="legal-section">
          <h2>{section.heading}</h2>
          <p dangerouslySetInnerHTML={asHtml(section.text)} />
        </section>
      ))}
    </div>
  );
};

export default LegalNotice;
