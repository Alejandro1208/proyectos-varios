<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

// Register user
$app->post('/api/register', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $nombre = $data['nombre'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO usuarios (nombre, email, password) VALUES (:nombre, :email, :password)";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $response->getBody()->write(json_encode(['message' => 'User registered successfully']));
        return $response->withStatus(201);
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});

// Login user
$app->post('/api/login', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT * FROM usuarios WHERE email = :email";

    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        
        if ($user && password_verify($password, $user->password)) {
            // Here you would generate and return a token (e.g., JWT)
            $response->getBody()->write(json_encode(['message' => 'Login successful', 'user' => $user]));
            return $response->withStatus(200);
        } else {
            $response->getBody()->write(json_encode(['error' => 'Invalid credentials']));
            return $response->withStatus(401);
        }
    } catch (PDOException $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withStatus(500);
    }
});
