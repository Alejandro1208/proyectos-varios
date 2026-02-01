<?php
require_once __DIR__ . '/config.php';

$method = method_override();
$pdo = get_pdo();

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT code, discount_percentage, is_active FROM promo_codes LIMIT 1");
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($data) $data['is_active'] = (bool)$data['is_active'];
    json_response($data ?: ['code' => '', 'discount_percentage' => 0, 'is_active' => false]);
}

if ($method === 'POST') {
    $data = input_body();
    
    // Aseguramos que exista la fila ID 1
    $pdo->query("INSERT IGNORE INTO promo_codes (id, code, discount_percentage, is_active) VALUES (1, '', 0, 0)");
    $stmt = $pdo->prepare("UPDATE promo_codes SET code = ?, discount_percentage = ?, is_active = ? WHERE id = 1");
    $stmt->execute([
        $data['code'],
        $data['discount_percentage'],
        $data['is_active'] ? 1 : 0
    ]);
    
    json_response(['success' => true, 'message' => 'Código promocional actualizado']);
}

require_method(['GET', 'POST']);