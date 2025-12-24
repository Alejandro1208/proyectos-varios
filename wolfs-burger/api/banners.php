<?php
ini_set('display_errors', 1); error_reporting(E_ALL);
require_once 'db_connection.php';
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

switch ($method) {
    case 'GET': handleGetBanners(); break;
    case 'POST': handleSaveBanner(); break;
    case 'DELETE': handleDeleteBanner(); break;
    default: http_response_code(405); echo json_encode(['error' => 'Método no permitido.']); break;
}

function getFullImageUrl($path) {
    if (empty($path)) return null;
    $scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $basePath = substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));
    return "$scheme://$host$basePath/" . ltrim($path, '/');
}

function handleGetBanners() {
    $conn = getDbConnection();
    $sql = "SELECT id, image_url, image_url_mobile, alt_text FROM banners ORDER BY id DESC";
    $result = $conn->query($sql);
    $banners = [];
    if ($result) {
        while($row = $result->fetch_assoc()) {
            $row['image_url'] = getFullImageUrl($row['image_url']);
            $row['image_url_mobile'] = getFullImageUrl($row['image_url_mobile']);
            $banners[] = $row;
        }
    }
    header('Content-Type: application/json');
    echo json_encode($banners);
    $conn->close();
}

function handleSaveBanner() {
    $conn = getDbConnection();
    $id = $_POST['id'] ?? null;
    $alt_text = 'Banner image';

    $imageUrl = $_POST['existing_image_url'] ?? null;
    $imageUrlMobile = $_POST['existing_image_url_mobile'] ?? null;

    // Función para procesar la subida de un archivo
    function processUpload($fileKey, $currentPath, $conn) {
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            // Borrar imagen anterior si existe
            if ($currentPath && file_exists($currentPath)) {
                unlink($currentPath);
            }

            $uploadDir = 'uploads/banners/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

            $fileName = uniqid('banner_') . '-' . basename($_FILES[$fileKey]['name']);
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $uploadPath)) {
                return $uploadPath;
            }
        }
        return $currentPath; // Retorna la ruta actual si no hay archivo nuevo
    }

    $imageUrl = processUpload('image_desktop', $imageUrl, $conn);
    $imageUrlMobile = processUpload('image_mobile', $imageUrlMobile, $conn);

    if ($id) { // Actualizar banner existente
        $stmt = $conn->prepare("UPDATE banners SET image_url = ?, image_url_mobile = ?, alt_text = ? WHERE id = ?");
        $stmt->bind_param("sssi", $imageUrl, $imageUrlMobile, $alt_text, $id);
    } else { // Crear nuevo banner
        $stmt = $conn->prepare("INSERT INTO banners (image_url, image_url_mobile, alt_text) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $imageUrl, $imageUrlMobile, $alt_text);
    }

    if ($stmt->execute()) {
        http_response_code($id ? 200 : 201);
        echo json_encode(['success' => true, 'id' => $id ? $id : $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar el banner en la base de datos.', 'db_error' => $stmt->error]);
    }
    $stmt->close();
    $conn->close();
}

function handleDeleteBanner() {
    $conn = getDbConnection();
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    if (!$id) { http_response_code(400); echo json_encode(['error' => 'ID de banner requerido.']); return; }

    $stmt = $conn->prepare("SELECT image_url, image_url_mobile FROM banners WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $deleteStmt = $conn->prepare("DELETE FROM banners WHERE id = ?");
        $deleteStmt->bind_param("i", $id);
        if ($deleteStmt->execute()) {
            if (!empty($row['image_url']) && file_exists($row['image_url'])) unlink($row['image_url']);
            if (!empty($row['image_url_mobile']) && file_exists($row['image_url_mobile'])) unlink($row['image_url_mobile']);
            http_response_code(200);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al eliminar de la base de datos.']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Banner no encontrado.']);
    }
    $conn->close();
}
?>