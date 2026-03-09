<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Get habits for a child on a specific date
$app->get('/api/habitos/{hijo_id}/{fecha}', function (Request $request, Response $response, array $args) {
    $hijo_id = $args['hijo_id'];
    $fecha = $args['fecha'];

    $sql = "SELECT * FROM registro_habitos WHERE hijo_id = :hijo_id AND fecha = :fecha";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':hijo_id', $hijo_id);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->execute();
        $habitos = $stmt->fetch(PDO::FETCH_OBJ);

        if (!$habitos) {
            // If no record for the day, create one
            $sql_insert = "INSERT INTO registro_habitos (hijo_id, fecha) VALUES (:hijo_id, :fecha)";
            $stmt_insert = $db->prepare($sql_insert);
            $stmt_insert->bindParam(':hijo_id', $hijo_id);
            $stmt_insert->bindParam(':fecha', $fecha);
            $stmt_insert->execute();

            // Fetch the newly created record
            $stmt->execute();
            $habitos = $stmt->fetch(PDO::FETCH_OBJ);
        }

        $response->getBody()->write(json_encode($habitos));
        return $response->withStatus(200);
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});

// Update habit
$app->put('/api/habitos/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $data = $request->getParsedBody();
    $lavado_dientes = $data['lavado_dientes'];
    $limite_pantallas = $data['limite_pantallas'];
    $juego_puro = $data['juego_puro'];

    $sql = "UPDATE registro_habitos SET 
                lavado_dientes = :lavado_dientes, 
                limite_pantallas = :limite_pantallas, 
                juego_puro = :juego_puro
            WHERE id = :id";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':lavado_dientes', $lavado_dientes);
        $stmt->bindParam(':limite_pantallas', $limite_pantallas);
        $stmt->bindParam(':juego_puro', $juego_puro);
        $stmt->execute();
        
        $response->getBody()->write(json_encode(['message' => 'Habits updated successfully']));
        return $response->withStatus(200);
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});
