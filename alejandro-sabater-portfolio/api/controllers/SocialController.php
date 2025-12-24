<?php
require_once __DIR__ . '/../helpers/db.php';
require_once __DIR__ . '/../helpers/http.php';

function list_socials(): void
{
    $pdo = db();
    $rows = $pdo->query('SELECT id, platform, url, icon FROM socials ORDER BY id')->fetchAll();
    json_response($rows);
}

function upsert_social(?int $id = null): void
{
    $body = array_merge(parse_json_body(), $_POST);
    $pdo = db();

    if ($id) {
        $stmt = $pdo->prepare('UPDATE socials SET platform = ?, url = ?, icon = ? WHERE id = ?');
        $stmt->execute([
            $body['platform'] ?? '',
            $body['url'] ?? '',
            $body['icon'] ?? '',
            $id
        ]);
        json_response(['message' => 'Red social actualizada']);
        return;
    }

    $stmt = $pdo->prepare('INSERT INTO socials (platform, url, icon) VALUES (?, ?, ?)');
    $stmt->execute([
        $body['platform'] ?? '',
        $body['url'] ?? '',
        $body['icon'] ?? ''
    ]);

    json_response(['message' => 'Red social creada', 'id' => (int) $pdo->lastInsertId()], 201);
}

function delete_social(int $id): void
{
    $pdo = db();
    $stmt = $pdo->prepare('DELETE FROM socials WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['message' => 'Red social eliminada']);
}
