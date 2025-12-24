

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  category ENUM('hombre','mujer','unisex') NOT NULL DEFAULT 'hombre',
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos iniciales basados en constants.ts
INSERT INTO products (name, brand, price, category, image, description, stock) VALUES
('Odyssey Candee (Special Edition)', 'Armaf', 85000, 'hombre', 'images/products/perfume-1.jpeg', 'Perfume dulce, para mujer, mejor repercusion en invierno, duracion de 8 horas aprox', 8),
('Club de Nuit Woman', 'Armaf', 72000, 'hombre', 'images/products/perfume-2.jpeg', 'Perfume de mujer, citrico, mejor para el verano o primavera, duracion aproximada de 6 horas', 0),
('Odyssey Mandarin Sky', 'Armaf', 78000, 'mujer', 'images/products/perfume-3.jpeg', 'Perfume unisex, mas hombre que mujer, citrico dulce para invierno con una duracion de mas de 6 horas', 3);

-- Nuevos seeds para categoría hombre (imágenes en images/products/perfumes-N.jpeg)
INSERT INTO products (name, brand, price, category, image, description, stock, featured, sort_order) VALUES
('Lattafa Oud for Glory', 'Lattafa', 75000, 'hombre', 'images/products/perfumes-1.jpeg', 'Amaderado potente y elegante (Oud). Mucha presencia para hombre.', 1, 0, 1),
('Al Haramain Amber Oud - Dubai Night', 'Al Haramain', 130000, 'hombre', 'images/products/perfumes-2.jpeg', 'Maderas oscuras y nocturnas. Muy exclusivo para hombre.', 1, 0, 2),
('Rasasi Hawas for Him', 'Rasasi', 100000, 'hombre', 'images/products/perfumes-3.jpeg', 'Fresco, frutal y dura muchísimo. Un "bestseller" de hombre joven.', 1, 0, 3),
('Bharara King', 'Bharara', 150000, 'hombre', 'images/products/perfumes-4.jpeg', 'Cítrico dulce "bomba". Proyecta a metros, para el hombre que quiere llamar la atención.', 1, 0, 4),
('Lattafa Pride Nebras', 'Lattafa', 65000, 'hombre', 'images/products/perfumes-5.jpeg', 'Vainilla y cacao (chocolate). Dulce y seductor para citas.', 1, 0, 5),
('Valmara Liquid Brun', 'Valmara', 115000, 'hombre', 'images/products/perfumes-6.jpeg', 'Vainilla de altísima calidad. Clon de Althair, muy elegante para hombre.', 1, 0, 6),
('Rasasi Hawas Ice', 'Rasasi', 130000, 'hombre', 'images/products/perfumes-7.jpeg', 'La versión "hielo" del Hawas. Más cítrica y potente para el calor.', 1, 0, 7),
('Afnan 9am Dive', 'Afnan', 70000, 'hombre', 'images/products/perfumes-8.jpeg', 'Fresco, limpio y azul. Ideal para oficina o gimnasio.', 1, 0, 8),
('Al Haramain Amber Oud - Aqua Dubai', 'Al Haramain', 130000, 'hombre', 'images/products/perfumes-9.jpeg', 'Lujo fresco y marino. Olor a "millonario de vacaciones".', 1, 0, 9),
('Al Haramain Amber Oud - Gold Edition', 'Al Haramain', 130000, 'hombre', 'images/products/perfumes-10.jpeg', 'Frutal dulce muy intenso (tipo Erba Pura). Unisex tirando a masculino por potencia.', 1, 0, 10),
('Afnan 9pm', 'Afnan', 70000, 'hombre', 'images/products/perfumes-11.jpeg', 'Dulce avainillado nocturno. El rey de la fiesta (tipo Ultra Male).', 1, 0, 11),
('Afnan 9pm Rebel', 'Afnan', 150000, 'hombre', 'images/products/perfumes-12.jpeg', 'Nuevo, frutal y maderas secas. Más moderno y versátil.', 1, 0, 12),
('Afnan 9pm Elixir', 'Afnan', 90000, 'hombre', 'images/products/perfumes-13.jpeg', 'Más oscuro y maduro que el 9pm normal. Para noches serias.', 1, 0, 13),
('Armaf Club de Nuit Iconic', 'Armaf', 100000, 'hombre', 'images/products/perfumes-14.jpeg', 'Cítrico y menta (tipo Bleu de Chanel). El comodín elegante para todo.', 1, 0, 14),
('Lattafa The Kingdom', 'Lattafa', 80000, 'hombre', 'images/products/perfumes-15.jpeg', 'Lavanda y tabaco dulce. Estilo Le Male Elixir.', 1, 0, 15),
('Armaf Club de Nuit Urban Man Elixir', 'Armaf', 85000, 'hombre', 'images/products/perfumes-16.jpeg', 'Mezcla de Sauvage y Aventus. Masculino moderno.', 1, 0, 16),
('Armaf Club de Nuit Intense Man', 'Armaf', 85000, 'hombre', 'images/products/perfumes-17.jpeg', 'Limón ahumado. El perfume más vendido y famoso de esta lista.', 1, 0, 17),
('Lattafa Asad Bourbon', 'Lattafa', 70000, 'hombre', 'images/products/perfumes-18.jpeg', 'Versión con vainilla y especias. Más cálido y señor.', 1, 0, 18),
('Lattafa Asad', 'Lattafa', 65000, 'hombre', 'images/products/perfumes-19.jpeg', 'Pimienta y tabaco (tipo Sauvage Elixir). Potencia masculina económica.', 1, 0, 19),
('Lattafa Asad Zanzibar', 'Lattafa', 55000, 'hombre', 'images/products/perfumes-20.jpeg', 'Coco y notas marinas. Raro, exótico y veraniego.', 1, 0, 20),
('Lattafa Fakhar Gold (Extrait)', 'Lattafa', 75000, 'hombre', 'images/products/perfumes-21.jpeg', 'Notas solares y dulces. Muy llamativo y lujoso (tipo 1 Million Parfum).', 1, 0, 21),
('Lattafa Fakhar Black', 'Lattafa', 65000, 'hombre', 'images/products/perfumes-22.jpeg', 'Manzana y jengibre fresco (tipo YSL Y). Gusta a todo el mundo.', 1, 0, 22);

-- Teléfono inicial tomado de CONFIG.phone
INSERT INTO settings (`key`, `value`) VALUES ('phone', '1162450386')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- Hero content editable
CREATE TABLE IF NOT EXISTS hero_content (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500) NOT NULL,
  image VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO hero_content (title, subtitle, image) VALUES
('Fragancias Premium.', 'Descubrí la mejor fijación y calidad del mercado con nuestras alternativas de alta gama.', 'images/banner/banner.jpg')
ON DUPLICATE KEY UPDATE title=VALUES(title), subtitle=VALUES(subtitle), image=VALUES(image);

-- Cómo comprar section editable
CREATE TABLE IF NOT EXISTS how_to_buy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO how_to_buy (title, description, video_url) VALUES
('Cómo comprar nuestros perfumes', 'Elegí tu perfume, consultá stock por WhatsApp y coordiná envío o retiro. Aceptamos pagos online y en efectivo.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), video_url=VALUES(video_url);

-- Productos destacados flag
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INT NOT NULL DEFAULT 0;
