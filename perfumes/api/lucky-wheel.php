<?php

require_once __DIR__ . '/config.php';

$method = method_override();

if ($method === 'GET') {
    $pdo = get_pdo();
    $stmt = $pdo->query('SELECT `key`, `value` FROM lucky_wheel_settings');
    $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    
    $stmt = $pdo->query('SELECT * FROM lucky_wheel_prizes ORDER BY id');
    $prizes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    json_response(['settings' => $settings, 'prizes' => $prizes]);

}

if ($method === 'POST') {
    $data = input_body();

    $pdo = get_pdo();
    $pdo->beginTransaction();
    try {
        if (isset($data['settings'])) {
            $stmt = $pdo->prepare("INSERT INTO lucky_wheel_settings (`key`, `value`) VALUES (:key, :value) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)");
            foreach ($data['settings'] as $key => $value) {
                $stmt->execute(['key' => $key, 'value' => $value]);
            }
        }

        if (isset($data['prizes'])) {
            $pdo->exec("DELETE FROM lucky_wheel_prizes");
            $stmt = $pdo->prepare("INSERT INTO lucky_wheel_prizes (name, value, chance, background_color, text_color) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['prizes'] as $prize) {
                $stmt->execute([
                    $prize['name'], $prize['value'], $prize['chance'], $prize['background_color'], $prize['text_color']
                ]);
            }
        }
        $pdo->commit();
    } catch (Exception $e) {
        $pdo->rollBack();
        json_response(['error' => $e->getMessage()], 500);
    }
    
    json_response(['success' => true]);
}

require_method(['GET', 'POST']);
