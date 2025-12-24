<?php
require_once __DIR__ . '/../helpers/db.php';
require_once __DIR__ . '/../helpers/http.php';

function list_videos(): void
{
    $pdo = db();
    $rows = $pdo->query('SELECT id, title FROM videos ORDER BY title')->fetchAll();
    json_response($rows);
}

function create_video(): void
{
    $body = array_merge(parse_json_body(), $_POST);
    $id = trim($body['id'] ?? '');
    $title = trim($body['title'] ?? '');

    if ($id === '' || $title === '') {
        json_response(['message' => 'ID y título son obligatorios'], 400);
    }

    $pdo = db();
    $stmt = $pdo->prepare('INSERT INTO videos (id, title) VALUES (?, ?)');

    try {
        $stmt->execute([$id, $title]);
    } catch (Throwable $e) {
        json_response(['message' => 'No se pudo crear el video', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Video creado', 'id' => $id], 201);
}

function update_video(string $id): void
{
    $body = array_merge(parse_json_body(), $_POST);
    $newId = trim($body['id'] ?? $id);
    $title = trim($body['title'] ?? '');

    if ($newId === '' || $title === '') {
        json_response(['message' => 'ID y título son obligatorios'], 400);
    }

    $pdo = db();
    try {
        $pdo->beginTransaction();
        // Update row; allow changing the video ID (primary key) by deleting+inserting
        $pdo->prepare('DELETE FROM videos WHERE id = ?')->execute([$id]);
        $pdo->prepare('INSERT INTO videos (id, title) VALUES (?, ?)')->execute([$newId, $title]);
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        json_response(['message' => 'No se pudo actualizar el video', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Video actualizado', 'id' => $newId]);
}

function delete_video(string $id): void
{
    $pdo = db();
    $stmt = $pdo->prepare('DELETE FROM videos WHERE id = ?');
    $stmt->execute([$id]);
    json_response(['message' => 'Video eliminado']);
}
