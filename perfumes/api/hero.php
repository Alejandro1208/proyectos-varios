<?php
require_once __DIR__ . '/config.php';
$pdo = get_pdo();
$method = method_override();

// Crea la tabla si no existe (evita fallos en hosts sin migrar)
$pdo->exec("
CREATE TABLE IF NOT EXISTS hero_content (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500) NOT NULL,
  image VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

try {
    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT title, subtitle, image FROM hero_content ORDER BY id DESC LIMIT 1');
        $row = $stmt->fetch();
        if (!$row) {
            $row = ['title' => '', 'subtitle' => '', 'image' => ''];
        }
        json_response($row);
    }

    if ($method === 'POST' || $method === 'PUT') {
        $title = trim($_POST['title'] ?? '');
        $subtitle = trim($_POST['subtitle'] ?? '');
        $image = trim($_POST['image'] ?? '');
        $upload = handle_upload('image');
        if ($upload) {
            $image = $upload;
        }
        // Evitar guardar data URLs base64 si no se pudo subir el archivo
        if ($upload === null && preg_match('/^data:/', $image)) {
            json_response(['error' => 'No se pudo subir la imagen del banner'], 400);
        }
        if ($title === '' || $subtitle === '' || $image === '') {
            json_response(['error' => 'Faltan campos'], 400);
        }
        // Si ya existe un registro, actualizamos; si no, creamos uno nuevo
        $existing = $pdo->query('SELECT id FROM hero_content ORDER BY id DESC LIMIT 1')->fetchColumn();
        if ($existing) {
            $stmt = $pdo->prepare('UPDATE hero_content SET title = ?, subtitle = ?, image = ? WHERE id = ?');
            $stmt->execute([$title, $subtitle, $image, $existing]);
        } else {
            $stmt = $pdo->prepare('INSERT INTO hero_content (title, subtitle, image) VALUES (?,?,?)');
            $stmt->execute([$title, $subtitle, $image]);
        }
        json_response(['message' => 'Hero actualizado', 'data' => ['title' => $title, 'subtitle' => $subtitle, 'image' => $image]]);
    }

    json_response(['error' => 'Método no permitido'], 405);
} catch (Exception $e) {
    json_response(['error' => $e->getMessage()], 500);
}
?>
