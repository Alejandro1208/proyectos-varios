const defaultLegalContent = {
  aviso: {
    title: 'Aviso Legal',
    intro: 'Información sobre la titularidad del sitio y condiciones básicas de uso.',
    sections: [
      {
        heading: 'Identificación del titular',
        text:
          'Data Shield es la entidad responsable de este sitio web. Este documento resume datos ficticios de contacto y representación para efectos demostrativos. Domicilio: Calle Seguridad 123, Ciudad Digital — Contacto: legal@datashield.com — Teléfono: +00 123 456 789',
      },
      {
        heading: 'Condiciones de uso',
        text:
          'El acceso al sitio implica la aceptación de estas condiciones. El usuario se compromete a utilizar los contenidos de manera lícita y a no realizar actividades que dañen la disponibilidad o integridad de los servicios. Nos reservamos el derecho de modificar, suspender o interrumpir el sitio en cualquier momento.',
      },
      {
        heading: 'Propiedad intelectual',
        text:
          'Excepto que se indique lo contrario, los contenidos, logotipos y material gráfico son propiedad de Data Shield. Se prohíbe la reproducción total o parcial sin autorización previa. Las marcas de terceros pertenecen a sus titulares.',
      },
    ],
  },
  terminos: {
    title: 'Términos y Condiciones',
    intro: 'Reglas ficticias sobre el uso de nuestros servicios y responsabilidades.',
    sections: [
      {
        heading: 'Uso del servicio',
        text:
          'Al registrarse o utilizar nuestros formularios, el usuario declara que la información proporcionada es veraz y actualizada. Podemos suspender temporalmente accesos que pongan en riesgo la seguridad de la plataforma.',
      },
      {
        heading: 'Limitación de responsabilidad',
        text:
          'El sitio se ofrece “tal cual”. Aunque trabajamos para mantenerlo disponible y seguro, no garantizamos ausencia de interrupciones. No nos hacemos responsables de daños indirectos derivados del uso o imposibilidad de uso del sitio.',
      },
      {
        heading: 'Modificaciones',
        text:
          'Podremos actualizar estos Términos sin aviso previo. La continuación del uso del sitio tras un cambio implica su aceptación. Publicaremos la fecha de la última actualización para referencia rápida.',
      },
    ],
  },
  privacidad: {
    title: 'Política de Privacidad',
    intro: 'Cómo tratamos los datos personales y las cookies en este sitio ficticio.',
    sections: [
      {
        heading: 'Datos que recopilamos',
        text:
          'Podemos procesar datos de contacto enviados mediante formularios (nombre, correo, empresa) con el único fin de responder a tus solicitudes. No vendemos tus datos ni los compartimos con terceros fuera de proveedores estrictamente necesarios.',
      },
      {
        heading: 'Uso de cookies',
        text:
          'Utilizamos cookies necesarias para que el sitio funcione y cookies opcionales de personalización, analítica y marketing que puedes aceptar o rechazar. Puedes cambiar tus preferencias en cualquier momento desde el modal de cookies.',
      },
      {
        heading: 'Tus derechos',
        text:
          'Puedes solicitar acceso, rectificación o eliminación de tus datos. Escríbenos a privacidad@datashield.com y atenderemos tu solicitud en el menor tiempo posible.',
      },
    ],
  },
};

const API_URL = '/api/legales.php';

const mergePage = (key, remotePage) => {
  const base = defaultLegalContent[key];
  if (!remotePage) return base;

  let sections = base.sections;
  if (remotePage.content) {
    try {
      const parsed = JSON.parse(remotePage.content);
      if (parsed && Array.isArray(parsed.sections)) {
        sections = parsed.sections;
      }
    } catch (e) {
      // Si el contenido no es JSON, lo usamos como un único bloque
      sections = [
        {
          heading: base.title,
          text: remotePage.content,
        },
      ];
    }
  }

  return {
    title: remotePage.title || base.title,
    intro: remotePage.intro || base.intro,
    sections,
  };
};

export const loadLegalContent = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al cargar legales: ${response.status}`);
    }
    const data = await response.json();
    const result = { ...defaultLegalContent };

    if (Array.isArray(data)) {
      data.forEach((row) => {
        if (row.page_key && result[row.page_key]) {
          result[row.page_key] = mergePage(row.page_key, row);
        }
      });
    }

    return result;
  } catch (e) {
    console.error('Error obteniendo legales, usando valores por defecto', e);
    return defaultLegalContent;
  }
};

export const saveLegalContent = async (content) => {
  const entries = Object.entries(content);
  for (const [key, page] of entries) {
    try {
      const body = {
        page_key: key,
        title: page.title,
        intro: page.intro,
        content: JSON.stringify({ sections: page.sections }),
      };
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'No se pudo guardar la página legal');
      }
    } catch (e) {
      console.error(`Error guardando legales para ${key}`, e);
    }
  }
};

export const getLegalPage = async (key) => {
  const all = await loadLegalContent();
  return all[key] || defaultLegalContent[key];
};

export default defaultLegalContent;
