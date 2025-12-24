const defaultContactData = {
  instagram: 'https://www.instagram.com/datashieldpdp/',
  tiktok: '',
  linkedin: 'https://www.linkedin.com/in/tu_usuario',
  whatsapp: 'https://wa.me/1158329828',
};

const API_URL = '/api/contacto.php';

export const loadContactData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al cargar contacto: ${response.status}`);
    }
    const data = await response.json();
    if (!data) return defaultContactData;
    return {
      instagram: data.instagram || defaultContactData.instagram,
      tiktok: data.tiktok || defaultContactData.tiktok,
      linkedin: data.linkedin || defaultContactData.linkedin,
      whatsapp: data.whatsapp || defaultContactData.whatsapp,
    };
  } catch (e) {
    console.error('Error obteniendo contacto, usando valores por defecto', e);
    return defaultContactData;
  }
};

export const saveContactData = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || 'No se pudo guardar la información de contacto');
  }
};

export default defaultContactData;
