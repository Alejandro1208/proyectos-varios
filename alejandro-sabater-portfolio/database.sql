
CREATE TABLE IF NOT EXISTS profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120) NOT NULL,
  location VARCHAR(120) NOT NULL,
  bio_short TEXT NOT NULL,
  bio_long TEXT NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  email VARCHAR(180) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  profile_id INT NOT NULL,
  skill VARCHAR(80) NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profiles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  site_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_technologies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  technology VARCHAR(80) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS socials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform VARCHAR(80) NOT NULL,
  url VARCHAR(255) NOT NULL,
  icon VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS videos (
  id VARCHAR(32) PRIMARY KEY,
  title VARCHAR(180) NOT NULL
);

-- Seed profile
INSERT INTO profiles (id, name, role, location, bio_short, bio_long, avatar_url, email) VALUES
(1, 'Alejandro Sabater', 'Frontend Web Developer', 'José C. Paz, Buenos Aires', 'De José C. Paz al mundo digital. Creando experiencias web únicas.', 'Hola, soy Alejandro. Mi historia es una de perseverancia y transformación. Vengo de José C. Paz y mi camino no fue lineal; pasé de cartonero a convertirme en Desarrollador Web. Esta trayectoria me enseñó el valor del esfuerzo y la resolución de problemas. Hoy dedico mis días a escribir código limpio, eficiente y escalable, transformando ideas en realidades digitales.', 'https://picsum.photos/id/64/400/400', 'alejandroramonsabater@hotmail.com');

INSERT INTO profile_skills (profile_id, skill) VALUES
(1, 'React'),
(1, 'TypeScript'),
(1, 'Tailwind CSS'),
(1, 'PHP'),
(1, 'MySQL'),
(1, 'Git'),
(1, 'Node.js'),
(1, 'Figma');

-- Seed projects
INSERT INTO projects (id, title, description, image_url, site_url) VALUES
(1, 'E-Commerce Tech', 'Tienda online completa con carrito y pasarela de pagos.', 'https://picsum.photos/id/1/600/400', '#'),
(2, 'Dashboard Admin', 'Panel de administración para gestión de usuarios y métricas.', 'https://picsum.photos/id/20/600/400', '#'),
(3, 'Landing Page Inmobiliaria', 'Sitio web de alto impacto para venta de propiedades.', 'https://picsum.photos/id/48/600/400', '#'),
(4, 'App de Clima', 'Aplicación de pronóstico del tiempo consumiendo API externa.', 'https://picsum.photos/id/56/600/400', '#'),
(5, 'Blog Personal', 'Sistema de blog con CMS headless.', 'https://picsum.photos/id/60/600/400', '#');

INSERT INTO project_technologies (project_id, technology) VALUES
(1, 'React'),
(1, 'Redux'),
(1, 'Stripe'),
(2, 'Vue.js'),
(2, 'Firebase'),
(2, 'Chart.js'),
(3, 'HTML'),
(3, 'SASS'),
(3, 'JS Vanilla'),
(4, 'React'),
(4, 'Tailwind'),
(4, 'OpenWeatherAPI'),
(5, 'Next.js'),
(5, 'Sanity.io');

-- Seed socials
INSERT INTO socials (platform, url, icon) VALUES
('Instagram', 'https://instagram.com', 'Instagram'),
('LinkedIn', 'https://linkedin.com', 'Linkedin'),
('WhatsApp', 'https://wa.me/123456789', 'MessageCircle');

-- Seed videos
INSERT INTO videos (id, title) VALUES
('dQw4w9WgXcQ', 'Mi historia: De Cartonero a Dev'),
('M7lc1UVf-VE', 'Tutorial: React desde cero'),
('tgbNymZ7vqY', 'Consejos para Juniors');
