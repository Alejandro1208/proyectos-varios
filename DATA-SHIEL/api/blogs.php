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
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare('SELECT * FROM blogs WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        $blog = $stmt->fetch();
        if (!$blog) {
            response(['error' => 'Blog no encontrado'], 404);
        }
        response($blog);
    }
    $stmt = $pdo->query('SELECT * FROM blogs ORDER BY created_at DESC');
    response($stmt->fetchAll());
}

if ($method === 'POST') {
    $data = readInput();
    $stmt = $pdo->prepare('INSERT INTO blogs (slug, title, subtitle, description, content, image, banner_image, author, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
        $data['slug'],
        $data['title'],
        $data['subtitle'] ?? '',
        $data['description'] ?? '',
        $data['content'] ?? '',
        $data['image'] ?? '',
        $data['banner_image'] ?? '',
        $data['author'] ?? '',
        $data['date'] ?? '',
    ]);
    response(['id' => $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    parse_str($_SERVER['QUERY_STRING'] ?? '', $query);
    $id = $query['id'] ?? null;
    $data = readInput();
    $id = $data['id'] ?? $id;
    if (!$id) {
        response(['error' => 'ID requerido'], 400);
    }

    $stmt = $pdo->prepare('UPDATE blogs SET slug = ?, title = ?, subtitle = ?, description = ?, content = ?, image = ?, banner_image = ?, author = ?, date = ? WHERE id = ?');
    $stmt->execute([
        $data['slug'],
        $data['title'],
        $data['subtitle'] ?? '',
        $data['description'] ?? '',
        $data['content'] ?? '',
        $data['image'] ?? '',
        $data['banner_image'] ?? '',
        $data['author'] ?? '',
        $data['date'] ?? '',
        $id,
    ]);
    response(['success' => true]);
}

if ($method === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'] ?? '', $query);
    $id = $query['id'] ?? null;
    if (!$id) {
        response(['error' => 'ID requerido'], 400);
    }
    $stmt = $pdo->prepare('DELETE FROM blogs WHERE id = ?');
    $stmt->execute([$id]);
    response(['success' => true]);
}

response(['error' => 'Método no permitido'], 405);
