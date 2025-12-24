<?php
require_once __DIR__ . '/config.php';
$pdo = get_pdo();
$method = method_override();

try {
    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT title, description, video_url FROM how_to_buy ORDER BY id DESC LIMIT 1');
        $row = $stmt->fetch();
        if (!$row) {
            $row = ['title' => '', 'description' => '', 'video_url' => ''];
        }
        json_response(['title' => $row['title'], 'description' => $row['description'], 'videoUrl' => $row['video_url']]);
    }

    if ($method === 'POST' || $method === 'PUT') {
        $title = trim($_POST['title'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $video = trim($_POST['videoUrl'] ?? '');
        if ($title === '' || $description === '' || $video === '') {
            json_response(['error' => 'Faltan campos'], 400);
        }
        // Actualiza el último registro; si no existe, inserta uno nuevo
        $existing = $pdo->query('SELECT id FROM how_to_buy ORDER BY id DESC LIMIT 1')->fetchColumn();
        if ($existing) {
            $stmt = $pdo->prepare('UPDATE how_to_buy SET title = ?, description = ?, video_url = ? WHERE id = ?');
            $stmt->execute([$title, $description, $video, $existing]);
        } else {
            $stmt = $pdo->prepare('INSERT INTO how_to_buy (title, description, video_url) VALUES (?,?,?)');
            $stmt->execute([$title, $description, $video]);
        }
        json_response(['message' => 'Sección actualizada', 'data' => ['title' => $title, 'description' => $description, 'videoUrl' => $video]]);
    }

    json_response(['error' => 'Método no permitido'], 405);
} catch (Exception $e) {
    json_response(['error' => $e->getMessage()], 500);
}
?>
