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
    $stmt = $pdo->query('SELECT * FROM contact_info LIMIT 1');
    $row = $stmt->fetch();
    response($row ?: []);
}

if (in_array($method, ['POST', 'PUT'])) {
    $data = readInput();
    $stmt = $pdo->prepare('INSERT INTO contact_info (id, instagram, tiktok, linkedin, whatsapp) VALUES (1, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE instagram = VALUES(instagram), tiktok = VALUES(tiktok), linkedin = VALUES(linkedin), whatsapp = VALUES(whatsapp)');
    $stmt->execute([
        $data['instagram'] ?? '',
        $data['tiktok'] ?? '',
        $data['linkedin'] ?? '',
        $data['whatsapp'] ?? '',
    ]);
    response(['success' => true]);
}

response(['error' => 'Método no permitido'], 405);
