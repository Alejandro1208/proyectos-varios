<?php
$uploadDir = __DIR__ . '/images/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Archivo no recibido']);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Error al subir archivo', 'code' => $file['error']]);
    exit;
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeName = uniqid('banner_', true) . ($extension ? '.' . $extension : '');
$destination = $uploadDir . $safeName;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar el archivo']);
    exit;
}

$publicPath = '/api/images/' . $safeName;

echo json_encode(['path' => $publicPath]);
