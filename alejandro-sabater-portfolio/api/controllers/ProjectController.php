<?php
require_once __DIR__ . '/../helpers/db.php';
require_once __DIR__ . '/../helpers/http.php';
require_once __DIR__ . '/../helpers/uploads.php';

function list_projects(): void
{
    $pdo = db();
    $rows = $pdo->query(
        "SELECT p.id, p.title, p.description, p.image_url AS imageUrl, p.site_url AS siteUrl
         FROM projects p
         ORDER BY p.id"
    )->fetchAll();

    foreach ($rows as &$row) {
        $stmt = $pdo->prepare('SELECT technology FROM project_technologies WHERE project_id = ? ORDER BY id');
        $stmt->execute([$row['id']]);
        $row['technologies'] = array_map(fn($r) => $r['technology'], $stmt->fetchAll());
    }

    json_response($rows);
}

function create_project(): void
{
    $body = array_merge(parse_json_body(), $_POST);
    $techs = normalize_tech($body['technologies'] ?? []);
    $imageUrl = $body['imageUrl'] ?? '';

    if (isset($_FILES['image'])) {
        try {
            $filename = save_image_upload($_FILES['image']);
            $imageUrl = '/images/' . $filename;
        } catch (Throwable $e) {
            json_response(['message' => $e->getMessage()], 400);
        }
    }

    $pdo = db();
    try {
        $pdo->beginTransaction();
        $stmt = $pdo->prepare(
            'INSERT INTO projects (title, description, image_url, site_url) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([
            $body['title'] ?? '',
            $body['description'] ?? '',
            $imageUrl,
            $body['siteUrl'] ?? ''
        ]);
        $projectId = (int) $pdo->lastInsertId();

        if (!empty($techs)) {
            $insert = $pdo->prepare('INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)');
            foreach ($techs as $tech) {
                $insert->execute([$projectId, $tech]);
            }
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        json_response(['message' => 'Error al crear proyecto', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Proyecto creado', 'id' => $projectId], 201);
}

function update_project(int $id): void
{
    $body = array_merge(parse_json_body(), $_POST);
    // Permitimos método override _method=PUT enviado por POST multipart
    if (($body['_method'] ?? '') === 'PUT') {
        unset($body['_method']);
    }
    $techs = normalize_tech($body['technologies'] ?? []);
    $imageUrl = $body['imageUrl'] ?? null;

    if (isset($_FILES['image'])) {
        try {
            $filename = save_image_upload($_FILES['image']);
            $imageUrl = '/images/' . $filename;
        } catch (Throwable $e) {
            json_response(['message' => $e->getMessage()], 400);
        }
    }

    $pdo = db();
    try {
        $pdo->beginTransaction();
        $pdo->prepare(
            'UPDATE projects SET title = ?, description = ?, site_url = ?, image_url = COALESCE(?, image_url) WHERE id = ?'
        )->execute([
            $body['title'] ?? '',
            $body['description'] ?? '',
            $body['siteUrl'] ?? '',
            $imageUrl,
            $id
        ]);

        $pdo->prepare('DELETE FROM project_technologies WHERE project_id = ?')->execute([$id]);
        if (!empty($techs)) {
            $insert = $pdo->prepare('INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)');
            foreach ($techs as $tech) {
                $insert->execute([$id, $tech]);
            }
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        json_response(['message' => 'Error al actualizar proyecto', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Proyecto actualizado']);
}

function upload_project_image(int $id): void
{
    if (!isset($_FILES['image'])) {
        json_response(['message' => 'No se adjuntó archivo'], 400);
    }

    try {
        $filename = save_image_upload($_FILES['image']);
    } catch (Throwable $e) {
        json_response(['message' => $e->getMessage()], 400);
    }

    $imageUrl = '/images/' . $filename;
    $pdo = db();
    $pdo->prepare('UPDATE projects SET image_url = ? WHERE id = ?')->execute([$imageUrl, $id]);

    json_response(['imageUrl' => $imageUrl]);
}

function normalize_tech($value): array
{
    if (is_array($value)) {
        return $value;
    }
    if (is_string($value)) {
        return array_filter(array_map('trim', explode(',', $value)));
    }
    return [];
}

function delete_project(int $id): void
{
    $pdo = db();
    $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
    try {
        $stmt->execute([$id]);
    } catch (Throwable $e) {
        json_response(['message' => 'No se pudo eliminar el proyecto', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Proyecto eliminado']);
}
