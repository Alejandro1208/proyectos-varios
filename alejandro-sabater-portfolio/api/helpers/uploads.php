<?php
$config = require __DIR__ . '/../config/config.php';

function ensure_upload_dir(): string
{
    $config = require __DIR__ . '/../config/config.php';
    $dir = $config['uploads_dir'];

    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    return rtrim($dir, '/');
}

function save_image_upload(array $file): string
{
    if (!isset($file['tmp_name'], $file['name'])) {
        throw new RuntimeException('Archivo inválido');
    }

    if (!is_uploaded_file($file['tmp_name'])) {
        throw new RuntimeException('No es una carga válida');
    }

    $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $mime = mime_content_type($file['tmp_name']) ?: '';
    if (!in_array($mime, $allowed, true)) {
        throw new RuntimeException('Solo se permiten imágenes (jpg, png, gif, webp)');
    }

    $uploadsDir = ensure_upload_dir();
    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '-', strtolower($file['name']));
    $filename = time() . '-' . $safeName;
    $destination = $uploadsDir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new RuntimeException('No se pudo mover el archivo');
    }

    return $filename;
}
