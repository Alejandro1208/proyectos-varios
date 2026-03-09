-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 16:53:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `padre_presente`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consejos`
--

CREATE TABLE `consejos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `edad_min_meses` int(11) DEFAULT NULL,
  `edad_max_meses` int(11) DEFAULT NULL,
  `categoria` enum('Crianza','Alimentación','Juegos') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consejos`
--

INSERT INTO `consejos` (`id`, `titulo`, `descripcion`, `edad_min_meses`, `edad_max_meses`, `categoria`) VALUES
(1, 'Fomentar la lectura', 'Leer juntos todos los días ayuda a desarrollar el lenguaje y la imaginación.', 6, 36, 'Crianza'),
(2, 'Frutas y verduras', 'Ofrecer una variedad de frutas y verduras de colores para asegurar una buena nutrición.', 12, 60, 'Alimentación'),
(3, 'Juego al aire libre', 'El juego al aire libre es esencial para el desarrollo físico y social.', 18, 72, 'Juegos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hijos`
--

CREATE TABLE `hijos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hijos`
--

INSERT INTO `hijos` (`id`, `usuario_id`, `nombre`, `fecha_nacimiento`) VALUES
(1, 1, 'Test Child', '2022-01-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plazas`
--

CREATE TABLE `plazas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `estado` enum('Bueno','Regular','Malo') DEFAULT 'Regular',
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plazas`
--

INSERT INTO `plazas` (`id`, `nombre`, `latitud`, `longitud`, `estado`, `notas`) VALUES
(1, 'Plaza de Mayo', -34.6083, -58.3722, 'Bueno', 'Plaza histórica con mucho espacio para correr.'),
(2, 'Parque Lezama', -34.6274, -58.3703, 'Regular', 'Algunos juegos están en reparación.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_habitos`
--

CREATE TABLE `registro_habitos` (
  `id` int(11) NOT NULL,
  `hijo_id` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `lavado_dientes` tinyint(1) DEFAULT 0,
  `limite_pantallas` tinyint(1) DEFAULT 0,
  `juego_puro` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `fecha_registro`) VALUES
(1, 'Test User', 'test@example.com', '$2y$12$VwcJ3dMaFUy8ch9is3Jxb.lmkKOhwsYfyly5.9GmMdq3DPNFg4ogK', '2024-07-27 15:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consejos`
--
ALTER TABLE `consejos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hijos`
--
ALTER TABLE `hijos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `plazas`
--
ALTER TABLE `plazas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro_habitos`
--
ALTER TABLE `registro_habitos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hijo_id` (`hijo_id`,`fecha`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consejos`
--
ALTER TABLE `consejos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `hijos`
--
ALTER TABLE `hijos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `plazas`
--
ALTER TABLE `plazas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registro_habitos`
--
ALTER TABLE `registro_habitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hijos`
--
ALTER TABLE `hijos`
  ADD CONSTRAINT `hijos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `registro_habitos`
--
ALTER TABLE `registro_habitos`
  ADD CONSTRAINT `registro_habitos_ibfk_1` FOREIGN KEY (`hijo_id`) REFERENCES `hijos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
