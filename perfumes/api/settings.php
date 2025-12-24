<?php
require_once __DIR__ . '/config.php';
$pdo = get_pdo();
$method = method_override();

try {
    if ($method === 'GET') {
        $stmt = $pdo->prepare('SELECT `value` FROM settings WHERE `key` = ?');
        $stmt->execute(['phone']);
        $row = $stmt->fetch();
        $value = $row ? $row['value'] : '';
        json_response(['phone' => $value]);
    }

    if ($method === 'POST' || $method === 'PUT') {
        $phone = trim($_POST['phone'] ?? '');
        if ($phone === '') {
            json_response(['error' => 'Teléfono requerido'], 400);
        }
        $stmt = $pdo->prepare('INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)');
        $stmt->execute(['phone', $phone]);
        json_response(['message' => 'Teléfono actualizado', 'phone' => $phone]);
    }

    json_response(['error' => 'Método no permitido'], 405);
} catch (Exception $e) {
    json_response(['error' => $e->getMessage()], 500);
}
?>
