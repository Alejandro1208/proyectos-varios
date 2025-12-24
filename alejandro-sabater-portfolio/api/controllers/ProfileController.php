<?php
require_once __DIR__ . '/../helpers/db.php';
require_once __DIR__ . '/../helpers/http.php';
require_once __DIR__ . '/../helpers/uploads.php';

function get_profile(): void
{
    $pdo = db();
    $stmt = $pdo->query(
        "SELECT p.id, p.name, p.role, p.location, p.bio_short AS bioShort, p.bio_long AS bioLong,
                p.avatar_url AS avatarUrl, p.email
         FROM profiles p
         LIMIT 1"
    );
    $profile = $stmt->fetch();

    if (!$profile) {
        json_response(['message' => 'Perfil no encontrado'], 404);
    }

    $skillsStmt = $pdo->prepare('SELECT skill FROM profile_skills WHERE profile_id = ? ORDER BY id');
    $skillsStmt->execute([$profile['id']]);
    $profile['skills'] = array_map(fn($row) => $row['skill'], $skillsStmt->fetchAll());

    json_response($profile);
}

function update_profile(): void
{
    $body = array_merge(parse_json_body(), $_POST);
    $skills = [];
    if (isset($body['skills'])) {
        if (is_array($body['skills'])) {
            $skills = $body['skills'];
        } else {
            $skills = array_filter(array_map('trim', explode(',', (string) $body['skills'])));
        }
    }

    $pdo = db();
    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            'UPDATE profiles SET name = ?, role = ?, location = ?, bio_short = ?, bio_long = ?, email = ? WHERE id = 1'
        );
        $stmt->execute([
            $body['name'] ?? '',
            $body['role'] ?? '',
            $body['location'] ?? '',
            $body['bioShort'] ?? '',
            $body['bioLong'] ?? '',
            $body['email'] ?? ''
        ]);

        $pdo->prepare('DELETE FROM profile_skills WHERE profile_id = 1')->execute();
        if (!empty($skills)) {
            $insert = $pdo->prepare('INSERT INTO profile_skills (profile_id, skill) VALUES (1, ?)');
            foreach ($skills as $skill) {
                $insert->execute([$skill]);
            }
        }

        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        json_response(['message' => 'Error al actualizar perfil', 'error' => $e->getMessage()], 500);
    }

    json_response(['message' => 'Perfil actualizado']);
}

function upload_avatar(): void
{
    if (!isset($_FILES['avatar'])) {
        json_response(['message' => 'No se adjuntó archivo'], 400);
    }

    try {
        $filename = save_image_upload($_FILES['avatar']);
    } catch (Throwable $e) {
        json_response(['message' => $e->getMessage()], 400);
    }

    $avatarUrl = '/images/' . $filename;
    $pdo = db();
    $pdo->prepare('UPDATE profiles SET avatar_url = ? WHERE id = 1')->execute([$avatarUrl]);

    json_response(['avatarUrl' => $avatarUrl]);
}
