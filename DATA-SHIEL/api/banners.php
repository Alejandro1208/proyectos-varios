<?php
require_once __DIR__ . '/config.php';

function readInput()
{
    $input = file_get_contents('php://input');
    if (empty($input)) {
        return $_POST;
    }
    $data = json_decode($input, true);
    return $data ? $data : [];
}

function response($data, $code = 200)
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['key'])) {
        $stmt = $pdo->prepare('SELECT * FROM banners WHERE banner_key = ? LIMIT 1');
        $stmt->execute([$_GET['key']]);
        $row = $stmt->fetch();
        if (!$row) {
            response(['error' => 'Banner no encontrado'], 404);
        }
        response($row);
    }
    $stmt = $pdo->query('SELECT * FROM banners');
    response($stmt->fetchAll());
}

if (in_array($method, ['POST', 'PUT'])) {
    $data = readInput();
    if (empty($data['banner_key'])) {
        response(['error' => 'banner_key requerido'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO banners (banner_key, desktop_image, mobile_image) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE desktop_image = VALUES(desktop_image), mobile_image = VALUES(mobile_image)');
    $stmt->execute([
        $data['banner_key'],
        $data['desktop_image'] ?? '',
        $data['mobile_image'] ?? '',
    ]);
    response(['success' => true]);
}

response(['error' => 'Método no permitido'], 405);
