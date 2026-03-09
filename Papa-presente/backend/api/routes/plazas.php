<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Get all plazas
$app->get('/api/plazas', function (Request $request, Response $response) {
    $sql = "SELECT * FROM plazas";

    try {
        $db = getDB();
        $stmt = $db->query($sql);
        $plazas = $stmt->fetchAll(PDO::FETCH_OBJ);
        $response->getBody()->write(json_encode($plazas));
        return $response->withStatus(200);
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});
