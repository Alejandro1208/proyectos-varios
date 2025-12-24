import image1 from './img-blog/banner-dos.png';
import image2 from './img-blog/banner-medio.jpeg';
import image3 from './img-blog/banner-paquetes.jpg';
import image4 from './img-blog/banner-servicios.jpg';

const API_URL = '/api/blogs.php';

export class BlogPost {
  constructor({ id, slug, title, subtitle, date, author, description, content, image, bannerImage }) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.subtitle = subtitle;
    this.date = date;
    this.author = author;
    this.description = description;
    this.content = content;
    this.image = image;
    this.thumbnail = image;
    this.bannerImage = bannerImage || image;
  }

  get url() {
    return `/blog/${this.slug}`;
  }
}

// Datos de ejemplo usados como fallback si la API falla
const defaultBlogJson = [
  {
    id: 1,
    slug: 'seguridad-en-la-nube',
    title: 'Seguridad en la nube sin dolores de cabeza',
    subtitle: 'Buenas prácticas para mantener tus datos protegidos',
    date: '01/03/2024',
    author: 'Equipo Data Shield',
    description: 'Cómo preparar tu stack para migrar a la nube sin comprometer la seguridad.',
    content: `Adoptar la nube trae velocidad, pero también nuevos vectores de ataque. La clave está en combinar gobierno, monitoreo y educaci\u00f3n.

Arranca con una revisi\u00f3n de accesos: limita privilegios, rota credenciales y habilita autenticaci\u00f3n multifactor. Luego automatiza auditor\u00edas de configuraci\u00f3n para detectar buckets abiertos, puertos expuestos o cifrado deshabilitado.

No olvides la capa humana. Define playbooks simples para incidentes, capacita a los equipos y mide tiempos de respuesta. Un posture de seguridad s\u00f3lido es un h\u00e1bito continuo, no un proyecto puntual.`,
    image: image1,
    bannerImage: image1,
  },
  {
    id: 2,
    slug: 'respuesta-ante-incidentes',
    title: 'Respuesta ante incidentes en 5 pasos',
    subtitle: 'Cómo contener, erradicar y aprender de un incidente',
    date: '15/02/2024',
    author: 'Laura García',
    description: 'Un checklist rápido para que tu equipo no improvise en el momento crítico.',
    content: `Cuando algo pasa, el reloj se acelera. Define un canal \u00fanico de comunicaci\u00f3n, asigna un l\u00edder y documenta cada decisi\u00f3n.

Primero contiene: a\u00edsla el sistema afectado para cortar el movimiento lateral. Luego recopila evidencias sin contaminar los logs y activa tus respaldos si el servicio cr\u00edtico est\u00e1 ca\u00eddo.

Al cerrar, haz una retro. \u00bfQu\u00e9 se\u00f1al se vio tarde? \u00bfQu\u00e9 dependencia fall\u00f3? Las lecciones aprendidas deben traducirse en automatizaciones y alertas que eviten repetir el incidente.`,
    image: image2,
    bannerImage: image2,
  },
  {
    id: 3,
    slug: 'zero-trust-en-tu-empresa',
    title: 'Zero Trust, paso a paso',
    subtitle: 'Del dicho al hecho en entornos híbridos',
    date: '28/01/2024',
    author: 'Marcos Soto',
    description: 'Aplicar Zero Trust no es comprar una herramienta: es rediseñar la confianza.',
    content: `Zero Trust implica verificar cada acceso, cada vez. Empieza segmentando la red y moviendo aplicaciones cr\u00edticas tras un proxy que inspeccione identidad y contexto del dispositivo.

Incorpora pol\u00edticas adaptativas: si el usuario cambia de ubicaci\u00f3n o el dispositivo est\u00e1 desactualizado, fuerza MFA o bloquea el acceso. Complementa con microsegmentaci\u00f3n para reducir el radio de impacto.

Mide el avance con m\u00e9tricas: porcentaje de aplicaciones detr\u00e1s de SSO, tiempo para revocar accesos y cantidad de dispositivos con postura verificada.`,
    image: image3,
    bannerImage: image3,
  },
  {
    id: 4,
    slug: 'gobierno-de-datos',
    title: 'Gobierno de datos que sí se usa',
    subtitle: 'Políticas claras, herramientas livianas',
    date: '10/01/2024',
    author: 'Equipo Data Shield',
    description: 'El gobierno de datos debe ayudar a trabajar mejor, no frenar a los equipos.',
    content: `Empieza inventariando los datos sensibles y qui\u00e9n los usa. Define clasificaciones simples (p\u00fablico, interno, restringido) y aplica controles alineados a cada nivel.

Ap\u00f3yate en cat\u00e1logos con ownership claro y flujos de aprobaci\u00f3n livianos. El objetivo es visibilidad y trazabilidad, no burocracia. Revisa los accesos trimestralmente y automatiza revocaciones cuando alguien cambia de rol.

El \u00e9xito se nota cuando los equipos encuentran la data correcta r\u00e1pido, saben c\u00f3mo usarla y la auditor\u00eda se resuelve en minutos.`,
    image: image4,
    bannerImage: image4,
  },
];

const mapToPost = (item, index) =>
  new BlogPost({
    id: item.id || index + 1,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    date: item.date,
    author: item.author,
    description: item.description,
    content: item.content,
    image: item.image || item.banner_image || item.imageUrl || image1,
    bannerImage: item.bannerImage || item.banner_image || item.image,
  });

const parseToPosts = (items = []) => items.map((post, index) => mapToPost(post, index));

export const getBlogPosts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al cargar blogs: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Respuesta inesperada al listar blogs');
    }
    return parseToPosts(data);
  } catch (e) {
    console.error('Error obteniendo blogs, usando datos por defecto', e);
    return parseToPosts(defaultBlogJson);
  }
};

export const findPostBySlug = async (slug) => {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
};

export const createBlog = async (blog) => {
  const payload = {
    slug: blog.slug,
    title: blog.title,
    subtitle: blog.subtitle,
    description: blog.description,
    content: blog.content,
    image: blog.bannerImage || blog.image || '',
    banner_image: blog.bannerImage || blog.image || '',
    author: blog.author,
    date: blog.date,
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'No se pudo crear el blog');
  }

  return mapToPost({ ...payload, id: data.id }, 0);
};

export const updateBlog = async (blog) => {
  const payload = {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    subtitle: blog.subtitle,
    description: blog.description,
    content: blog.content,
    image: blog.bannerImage || blog.image || '',
    banner_image: blog.bannerImage || blog.image || '',
    author: blog.author,
    date: blog.date,
  };

  const response = await fetch(`${API_URL}?id=${encodeURIComponent(blog.id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'No se pudo actualizar el blog');
  }

  return mapToPost(payload, 0);
};

export const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'No se pudo eliminar el blog');
  }
  return true;
};

export default getBlogPosts;
