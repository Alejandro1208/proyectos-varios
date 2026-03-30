<?php
require_once __DIR__ . '/config.php';

$pdo = get_pdo();
$method = method_override();

function upload_image_if_present(string $field = 'image'): ?string {
    return handle_upload($field);
}

try {
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
            $stmt = $pdo->query('SELECT * FROM products ORDER BY sort_order ASC');
            $products = $stmt->fetchAll();
            foreach ($products as &$p) {
                $p['id'] = (int)$p['id'];
                $p['price'] = (float)$p['price'];
                $p['stock'] = (int)$p['stock'];
                $p['featured'] = (bool)$p['featured'];
                $p['sort_order'] = (int)$p['sort_order'];
            }
            json_response($products);
            break;

        case 'POST':
            $imagePath = upload_image_if_present('image');
            $image = $imagePath ?? $_POST['image'] ?? '';

            $stmt = $pdo->prepare('INSERT INTO products (name, brand, price, category, image, description, stock, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([
                $_POST['name'] ?? '',
                $_POST['brand'] ?? '',
                $_POST['price'] ?? 0,
                $_POST['category'] ?? 'hombre',
                $image,
                $_POST['description'] ?? '',
                $_POST['stock'] ?? 0,
                !empty($_POST['featured']) ? 1 : 0,
                0 
            ]);
            json_response(['message' => 'Producto creado', 'id' => $pdo->lastInsertId()]);
            break;

        case 'PUT':
            $id = $_POST['id'] ?? null;
            if (!$id) {
                json_response(['error' => 'ID requerido'], 400);
            }
            
            $imagePath = upload_image_if_present('image');
            $image = $imagePath ?? $_POST['image'] ?? '';
            
            $stmt = $pdo->prepare('UPDATE products SET name = ?, brand = ?, price = ?, category = ?, image = ?, description = ?, stock = ?, featured = ? WHERE id = ?');
            $stmt->execute([
                $_POST['name'],
                $_POST['brand'],
                $_POST['price'],
                $_POST['category'],
                $image,
                $_POST['description'],
                $_POST['stock'],
                !empty($_POST['featured']) ? 1 : 0,
                $id
            ]);
            json_response(['message' => 'Producto actualizado']);
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
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
    json_response(['error' => $e->getMessage()], 500);
}
?>
