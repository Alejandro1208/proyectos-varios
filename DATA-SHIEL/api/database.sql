
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NULL,
  description VARCHAR(500) NULL,
  content LONGTEXT NULL,
  image VARCHAR(500) NULL,
  banner_image VARCHAR(500) NULL,
  author VARCHAR(150) NULL,
  date VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS legal_pages (
  page_key VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  intro TEXT,
  content LONGTEXT
);

CREATE TABLE IF NOT EXISTS contact_info (
  id INT PRIMARY KEY,
  instagram VARCHAR(255),
  tiktok VARCHAR(255),
  linkedin VARCHAR(255),
  whatsapp VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS banners (
  banner_key VARCHAR(100) PRIMARY KEY,
  desktop_image VARCHAR(500) NULL,
  mobile_image VARCHAR(500) NULL
);

INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@datashield.com', 'admin123');

INSERT INTO blogs (slug, title, subtitle, description, content, image, banner_image, author, date) VALUES
('seguridad-en-la-nube', 'Seguridad en la nube sin dolores de cabeza', 'Buenas prácticas para mantener tus datos protegidos', 'Cómo preparar tu stack para migrar a la nube sin comprometer la seguridad.', 'Adoptar la nube trae velocidad, pero también nuevos vectores de ataque. La clave está en combinar gobierno, monitoreo y educación.\n\nArranca con una revisión de accesos: limita privilegios, rota credenciales y habilita autenticación multifactor. Luego automatiza auditorías de configuración para detectar buckets abiertos, puertos expuestos o cifrado deshabilitado.\n\nNo olvides la capa humana. Define playbooks simples para incidentes, capacita a los equipos y mide tiempos de respuesta. Un posture de seguridad sólido es un hábito continuo, no un proyecto puntual.', '/static/media/banner-dos.eb92a893.png', '/static/media/banner-dos.eb92a893.png', 'Equipo Data Shield', '01/03/2024'),
('respuesta-ante-incidentes', 'Respuesta ante incidentes en 5 pasos', 'Cómo contener, erradicar y aprender de un incidente', 'Un checklist rápido para que tu equipo no improvise en el momento crítico.', 'Cuando algo pasa, el reloj se acelera. Define un canal único de comunicación, asigna un líder y documenta cada decisión.\n\nPrimero contiene: aísla el sistema afectado para cortar el movimiento lateral. Luego recopila evidencias sin contaminar los logs y activa tus respaldos si el servicio crítico está caído.\n\nAl cerrar, haz una retro. ¿Qué señal se vio tarde? ¿Qué dependencia falló? Las lecciones aprendidas deben traducirse en automatizaciones y alertas que eviten repetir el incidente.', '/static/media/banner-medio.c7df869a.jpeg', '/static/media/banner-medio.c7df869a.jpeg', 'Laura García', '15/02/2024'),
('zero-trust-en-tu-empresa', 'Zero Trust, paso a paso', 'Del dicho al hecho en entornos híbridos', 'Aplicar Zero Trust no es comprar una herramienta: es rediseñar la confianza.', 'Zero Trust implica verificar cada acceso, cada vez. Empieza segmentando la red y moviendo aplicaciones críticas tras un proxy que inspeccione identidad y contexto del dispositivo.\n\nIncorpora políticas adaptativas: si el usuario cambia de ubicación o el dispositivo está desactualizado, fuerza MFA o bloquea el acceso. Complementa con microsegmentación para reducir el radio de impacto.\n\nMide el avance con métricas: porcentaje de aplicaciones detrás de SSO, tiempo para revocar accesos y cantidad de dispositivos con postura verificada.', '/static/media/banner-paquetes.4fa3cc0c.jpg', '/static/media/banner-paquetes.4fa3cc0c.jpg', 'Marcos Soto', '28/01/2024'),
('gobierno-de-datos', 'Gobierno de datos que sí se usa', 'Políticas claras, herramientas livianas', 'El gobierno de datos debe ayudar a trabajar mejor, no frenar a los equipos.', 'Empieza inventariando los datos sensibles y quién los usa. Define clasificaciones simples (público, interno, restringido) y aplica controles alineados a cada nivel.\n\nApóyate en catálogos con ownership claro y flujos de aprobación livianos. El objetivo es visibilidad y trazabilidad, no burocracia. Revisa los accesos trimestralmente y automatiza revocaciones cuando alguien cambia de rol.\n\nEl éxito se nota cuando los equipos encuentran la data correcta rápido, saben cómo usarla y la auditoría se resuelve en minutos.', '/static/media/banner-servicios.ce583a23.jpg', '/static/media/banner-servicios.ce583a23.jpg', 'Equipo Data Shield', '10/01/2024');

INSERT INTO legal_pages (page_key, title, intro, content) VALUES
('aviso', 'Aviso Legal', 'Información sobre la titularidad del sitio y condiciones básicas de uso.', '{"sections":[{"heading":"Identificación del titular","text":"Data Shield es la entidad responsable de este sitio web. Este documento resume datos ficticios de contacto y representación para efectos demostrativos. Domicilio: Calle Seguridad 123, Ciudad Digital — Contacto: legal@datashield.com — Teléfono: +00 123 456 789"},{"heading":"Condiciones de uso","text":"El acceso al sitio implica la aceptación de estas condiciones. El usuario se compromete a utilizar los contenidos de manera lícita y a no realizar actividades que dañen la disponibilidad o integridad de los servicios. Nos reservamos el derecho de modificar, suspender o interrumpir el sitio en cualquier momento por mantenimiento, mejoras o cumplimiento normativo."},{"heading":"Propiedad intelectual","text":"Excepto que se indique lo contrario, los contenidos, logotipos y material gráfico son propiedad de Data Shield. Se prohíbe la reproducción total o parcial sin autorización previa. Las marcas y nombres comerciales de terceros pertenecen a sus respectivos titulares y se usan únicamente con fines descriptivos."}]}'),
('terminos', 'Términos y Condiciones', 'Reglas ficticias sobre el uso de nuestros servicios y responsabilidades.', '{"sections":[{"heading":"Uso del servicio","text":"Al registrarse o utilizar nuestros formularios, el usuario declara que la información proporcionada es veraz y actualizada. Podemos suspender temporalmente accesos que pongan en riesgo la seguridad de la plataforma."},{"heading":"Limitación de responsabilidad","text":"El sitio se ofrece “tal cual”. Aunque trabajamos para mantenerlo disponible y seguro, no garantizamos ausencia de interrupciones. No nos hacemos responsables de daños indirectos derivados del uso o imposibilidad de uso del sitio."},{"heading":"Modificaciones","text":"Podremos actualizar estos Términos sin aviso previo. La continuación del uso del sitio tras un cambio implica su aceptación. Publicaremos la fecha de la última actualización para referencia rápida."}]}'),
('privacidad', 'Política de Privacidad', 'Cómo tratamos los datos personales y las cookies en este sitio ficticio.', '{"sections":[{"heading":"Datos que recopilamos","text":"Podemos procesar datos de contacto enviados mediante formularios (nombre, correo, empresa) con el único fin de responder a tus solicitudes. No vendemos tus datos ni los compartimos con terceros fuera de proveedores estrictamente necesarios."},{"heading":"Uso de cookies","text":"Utilizamos cookies necesarias para que el sitio funcione y cookies opcionales de personalización, analítica y marketing que puedes aceptar o rechazar. Puedes cambiar tus preferencias en cualquier momento desde el modal de cookies."},{"heading":"Tus derechos","text":"Puedes solicitar acceso, rectificación o eliminación de tus datos. Escríbenos a privacidad@datashield.com y atenderemos tu solicitud en el menor tiempo posible."}]}');

INSERT INTO contact_info (id, instagram, tiktok, linkedin, whatsapp) VALUES
(1, 'https://www.instagram.com/datashieldpdp/', '', 'https://www.linkedin.com/in/mirella-buttafuoco-37251857/', 'https://wa.me/1158329828');

INSERT INTO banners (banner_key, desktop_image, mobile_image) VALUES
('home', '/static/media/banner-dos.eb92a893.png', '/static/media/banner-dos.eb92a893.png'),
('servicios', '/static/media/banner-servicios.ce583a23.jpg', '/static/media/banner-servicios.ce583a23.jpg'),
('paquetes', '/static/media/banner-paquetes.4fa3cc0c.jpg', '/static/media/banner-paquetes.4fa3cc0c.jpg'),
('blog', '/static/media/banner-medio.c7df869a.jpeg', '/static/media/banner-medio.c7df869a.jpeg'),
('contacto', '/static/media/banner-dos.eb92a893.png', '/static/media/banner-dos.eb92a893.png');
