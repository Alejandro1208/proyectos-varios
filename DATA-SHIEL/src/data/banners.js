const API_URL = '/api/banners.php';

const defaultBanners = {
  home: {
    desktop_image: '/static/media/banner-dos.eb92a893.png',
    mobile_image: '/static/media/banner-dos.eb92a893.png',
  },
  servicios: {
    desktop_image: '/static/media/banner-servicios.ce583a23.jpg',
    mobile_image: '/static/media/banner-servicios.ce583a23.jpg',
  },
  paquetes: {
    desktop_image: '/static/media/banner-paquetes.4fa3cc0c.jpg',
    mobile_image: '/static/media/banner-paquetes.4fa3cc0c.jpg',
  },
  blog: {
    desktop_image: '/static/media/banner-medio.c7df869a.jpeg',
    mobile_image: '/static/media/banner-medio.c7df869a.jpeg',
  },
  contacto: {
    desktop_image: '/static/media/banner-dos.eb92a893.png',
    mobile_image: '/static/media/banner-dos.eb92a893.png',
  },
};

export const loadBanners = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al cargar banners');
    const data = await res.json();
    const map = { ...defaultBanners };
    if (Array.isArray(data)) {
      data.forEach((row) => {
        if (row.banner_key) {
          map[row.banner_key] = {
            desktop_image: row.desktop_image || defaultBanners[row.banner_key]?.desktop_image,
            mobile_image: row.mobile_image || row.desktop_image || defaultBanners[row.banner_key]?.mobile_image,
          };
        }
      });
    }
    return map;
  } catch (e) {
    console.error('Error leyendo banners, usando por defecto', e);
    return defaultBanners;
  }
};

export const saveBanner = async (bannerKey, payload) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ banner_key: bannerKey, ...payload }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.error || 'No se pudo guardar el banner');
  }
  return true;
};

export default defaultBanners;
