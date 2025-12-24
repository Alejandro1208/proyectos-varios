<?php
require_once __DIR__ . '/config.php';
$pdo = get_pdo();
$method = method_override();

function upload_image_if_present(string $field = 'image'): ?string {
    return handle_upload($field);
}

try {
    // Reordenar por JSON {action: "reorder", order: [ids...]}
    if ($method === 'POST' && ($_POST['action'] ?? '') === 'reorder') {
        $order = json_decode($_POST['order'] ?? '[]', true);
        if (!is_array($order)) {
            json_response(['error' => 'Orden inválido'], 400);
        }
        $pdo->beginTransaction();
        foreach ($order as $idx => $id) {
            $stmt = $pdo->prepare('UPDATE products SET sort_order = ? WHERE id = ?');
            $stmt->execute([$idx + 1, $id]);
        }
        $pdo->commit();
        json_response(['message' => 'Orden actualizado']);
    }

    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
                $stmt->execute([$id]);
                $product = $stmt->fetch();
                if (!$product) {
                    json_response(['error' => 'Producto no encontrado'], 404);
                }
                json_response($product);
            }
            $stmt = $pdo->query('SELECT * FROM products ORDER BY sort_order ASC, id ASC');
            json_response($stmt->fetchAll());
            break;

        case 'POST':
            // Crear producto
            if (($_POST['action'] ?? '') === 'reorder') {
                json_response(['error' => 'Acción inválida'], 400);
            }
            $name = trim($_POST['name'] ?? '');
            $brand = trim($_POST['brand'] ?? '');
            $price = floatval($_POST['price'] ?? 0);
            $category = $_POST['category'] ?? 'hombre';
            $description = trim($_POST['description'] ?? '');
            $stock = intval($_POST['stock'] ?? 0);
            $featured = isset($_POST['featured']) ? 1 : 0;
            $sortOrder = intval($_POST['sort_order'] ?? 0);
            $imagePath = upload_image_if_present('image') ?? trim($_POST['image'] ?? '');

            if ($name === '' || $brand === '' || $description === '' || $imagePath === '') {
                json_response(['error' => 'Faltan campos obligatorios'], 400);
            }

            $stmt = $pdo->prepare('INSERT INTO products (name, brand, price, category, image, description, stock, featured, sort_order) VALUES (?,?,?,?,?,?,?,?,?)');
            $stmt->execute([$name, $brand, $price, $category, $imagePath, $description, $stock, $featured, $sortOrder]);
            json_response(['message' => 'Producto creado', 'id' => $pdo->lastInsertId()]);
            break;

        case 'PUT':
            // Si viene por method override usamos $_POST/$_FILES; si es PUT real, parseamos php://input
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['_method'])) {
                $putData = $_POST;
            } else {
                parse_str(file_get_contents('php://input'), $putData);
            }

            $id = $putData['id'] ?? null;
            if (!$id) {
                json_response(['error' => 'ID requerido'], 400);
            }
            $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
            $stmt->execute([$id]);
            $current = $stmt->fetch();
            if (!$current) {
                json_response(['error' => 'Producto no encontrado'], 404);
            }

            $name = trim($putData['name'] ?? $current['name']);
            $brand = trim($putData['brand'] ?? $current['brand']);
            $price = isset($putData['price']) ? floatval($putData['price']) : $current['price'];
            $category = $putData['category'] ?? $current['category'];
            $description = trim($putData['description'] ?? $current['description']);
            $stock = isset($putData['stock']) ? intval($putData['stock']) : $current['stock'];
            $featured = isset($putData['featured']) ? (int)$putData['featured'] : $current['featured'];
            $sortOrder = isset($putData['sort_order']) ? intval($putData['sort_order']) : $current['sort_order'];
            $imagePath = $current['image'];

            // Actualizar imagen si se subió una nueva
            $newImage = upload_image_if_present('image');
            if ($newImage) {
                $imagePath = $newImage;
            } elseif (isset($putData['image']) && trim($putData['image']) !== '') {
                $imagePath = trim($putData['image']);
            }

            $stmt = $pdo->prepare('UPDATE products SET name=?, brand=?, price=?, category=?, image=?, description=?, stock=?, featured=?, sort_order=? WHERE id=?');
            $stmt->execute([$name, $brand, $price, $category, $imagePath, $description, $stock, $featured, $sortOrder, $id]);
            json_response(['message' => 'Producto actualizado']);
            break;

        case 'DELETE':
            parse_str(file_get_contents('php://input'), $deleteData);
            $id = $deleteData['id'] ?? ($_GET['id'] ?? null);
            if (!$id) {
                json_response(['error' => 'ID requerido'], 400);
            }
            $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
            $stmt->execute([$id]);
            json_response(['message' => 'Producto eliminado']);
            break;

        default:
          json_response(['error' => 'Método no permitido'], 405);
    }
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_response(['error' => $e->getMessage()], 500);
}
?>
