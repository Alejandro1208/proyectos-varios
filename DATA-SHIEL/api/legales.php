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
        $stmt = $pdo->prepare('SELECT * FROM legal_pages WHERE page_key = ?');
        $stmt->execute([$_GET['key']]);
        $row = $stmt->fetch();
        if (!$row) {
            response(['error' => 'Página no encontrada'], 404);
        }
        response($row);
    }
    $stmt = $pdo->query('SELECT * FROM legal_pages');
    response($stmt->fetchAll());
}

if (in_array($method, ['POST', 'PUT'])) {
    $data = readInput();
    if (empty($data['page_key'])) {
        response(['error' => 'page_key requerido'], 400);
    }

    $stmt = $pdo->prepare('INSERT INTO legal_pages (page_key, title, intro, content) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title = VALUES(title), intro = VALUES(intro), content = VALUES(content)');
    $stmt->execute([
        $data['page_key'],
        $data['title'] ?? '',
        $data['intro'] ?? '',
        $data['content'] ?? '',
    ]);
    response(['success' => true]);
}

response(['error' => 'Método no permitido'], 405);
