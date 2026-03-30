<?php
require_once __DIR__ . '/config.php';
$pdo = get_pdo();
$method = method_override();

try {
    if ($method === 'GET') {
        $stmt = $pdo->query('SELECT `key`, `value` FROM settings');
        $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        json_response($settings);
    }

    if ($method === 'POST' || $method === 'PUT') {
        if (isset($_POST['key']) && isset($_POST['value'])) {
            $key = $_POST['key'];
            $value = $_POST['value'];
        } elseif (isset($_POST['phone'])) {
            $key = 'phone';
            $value = $_POST['phone'];
        } else {
            json_response(['error' => 'Datos faltantes'], 400);
        }

        $stmt = $pdo->prepare('INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)');
        $stmt->execute([$key, $value]);
        json_response(['message' => 'Configuración actualizada']);
    }

    json_response(['error' => 'Método no permitido'], 405);
} catch (Exception $e) {
    json_response(['error' => $e->getMessage()], 500);
}
?>
