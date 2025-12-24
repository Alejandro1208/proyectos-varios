<?php
// Datos de conexión (relleno). Cambiá estos valores en producción.
const DB_HOST = 'localhost';
const DB_NAME = 'ale287_growsestore';
const DB_USER = 'ale287_Alejandro';
const DB_PASS = 'Giovanni2906.';

function get_pdo(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}

function json_response($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function require_method(array $methods): void {
    if (!in_array($_SERVER['REQUEST_METHOD'], $methods, true)) {
        json_response(['error' => 'Método no permitido'], 405);
    }
}

function input_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function method_override(): string {
    if (isset($_POST['_method'])) {
        return strtoupper($_POST['_method']);
    }
    return $_SERVER['REQUEST_METHOD'] ?? 'GET';
}

function handle_upload(string $field = 'image'): ?string {
    if (!isset($_FILES[$field]) || !is_uploaded_file($_FILES[$field]['tmp_name'])) {
        return null;
    }
    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    $mime = mime_content_type($_FILES[$field]['tmp_name']);
    if (!isset($allowed[$mime])) {
        json_response(['error' => 'Formato de imagen no permitido'], 400);
    }
    $ext = $allowed[$mime];
    $filename = uniqid('prod_', true) . '.' . $ext;
    $uploadDir = realpath(__DIR__ . '/..') . '/upload';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }
    $dest = $uploadDir . '/' . $filename;
    if (!move_uploaded_file($_FILES[$field]['tmp_name'], $dest)) {
        json_response(['error' => 'No se pudo guardar la imagen'], 500);
    }
    // Ruta relativa para servir desde la web
    return 'upload/' . $filename;
}
?>
