<?php
// Simple PHP router for profile, projects y redes
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/helpers/http.php';
require_once __DIR__ . '/controllers/ProfileController.php';
require_once __DIR__ . '/controllers/ProjectController.php';
require_once __DIR__ . '/controllers/SocialController.php';
require_once __DIR__ . '/controllers/VideoController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$route = '/' . ltrim(str_replace($base, '', $uri), '/');
$method = $_SERVER['REQUEST_METHOD'];

// Profile
if ($route === '/profile' && $method === 'GET') {
    get_profile();
} elseif ($route === '/profile' && $method === 'PUT') {
    update_profile();
} elseif ($route === '/profile/avatar' && $method === 'POST') {
    upload_avatar();
}

// Projects
if ($route === '/projects' && $method === 'GET') {
    list_projects();
} elseif ($route === '/projects' && $method === 'POST') {
    create_project();
} elseif (preg_match('#^/projects/([0-9]+)$#', $route, $matches) && in_array($method, ['PUT', 'POST'], true)) {
    update_project((int) $matches[1]);
} elseif (preg_match('#^/projects/([0-9]+)/image$#', $route, $matches) && $method === 'POST') {
    upload_project_image((int) $matches[1]);
} elseif (preg_match('#^/projects/([0-9]+)$#', $route, $matches) && $method === 'DELETE') {
    delete_project((int) $matches[1]);
}

// Socials
if ($route === '/socials' && $method === 'GET') {
    list_socials();
} elseif ($route === '/socials' && $method === 'POST') {
    upsert_social();
} elseif (preg_match('#^/socials/([0-9]+)$#', $route, $matches) && $method === 'PUT') {
    upsert_social((int) $matches[1]);
} elseif (preg_match('#^/socials/([0-9]+)$#', $route, $matches) && $method === 'DELETE') {
    delete_social((int) $matches[1]);
}

// Videos
if ($route === '/videos' && $method === 'GET') {
    list_videos();
} elseif ($route === '/videos' && $method === 'POST') {
    create_video();
} elseif (preg_match('#^/videos/([A-Za-z0-9_-]+)$#', $route, $matches) && $method === 'PUT') {
    update_video($matches[1]);
} elseif (preg_match('#^/videos/([A-Za-z0-9_-]+)$#', $route, $matches) && $method === 'DELETE') {
    delete_video($matches[1]);
}

json_response(['message' => 'Ruta no encontrada'], 404);
