<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Get consejos by age
$app->get('/api/consejos/{hijo_id}', function (Request $request, Response $response, array $args) {
    $hijo_id = $args['hijo_id'];

    $sql_hijo = "SELECT fecha_nacimiento FROM hijos WHERE id = :hijo_id";
    $sql_consejos = "SELECT * FROM consejos WHERE edad_min_meses <= :edad_meses AND edad_max_meses >= :edad_meses";

    try {
        $db = getDB();

        // Get child's birth date
        $stmt_hijo = $db->prepare($sql_hijo);
        $stmt_hijo->bindParam(':hijo_id', $hijo_id);
        $stmt_hijo->execute();
        $hijo = $stmt_hijo->fetch(PDO::FETCH_OBJ);

        if (!$hijo) {
            $response->getBody()->write(json_encode(['error' => 'Child not found']));
            return $response->withStatus(404);
        }

        // Calculate age in months
        $fecha_nacimiento = new DateTime($hijo->fecha_nacimiento);
        $hoy = new DateTime();
        $edad = $hoy->diff($fecha_nacimiento);
        $edad_meses = ($edad->y * 12) + $edad->m;

        // Get consejos
        $stmt_consejos = $db->prepare($sql_consejos);
        $stmt_consejos->bindParam(':edad_meses', $edad_meses);
        $stmt_consejos->execute();
        $consejos = $stmt_consejos->fetchAll(PDO::FETCH_OBJ);

        $response->getBody()->write(json_encode($consejos));
        return $response->withStatus(200);
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});
