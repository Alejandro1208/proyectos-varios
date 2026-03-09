<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

// Manejar solicitudes OPTIONS (Preflight CORS) para cualquier ruta
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Middleware to enable CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Database connection
function getDB() {
    $dbhost = "localhost";
    $dbname = "padre_presente";
    $dbuser = "root";
    $dbpass = "";
    $mysql_conn_str = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_str, $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

// Routes
$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Welcome to Padre Presente API");
    return $response;
});

require __DIR__ . '/routes/auth.php';
require __DIR__ . '/routes/consejos.php';
require __DIR__ . '/routes/plazas.php';
require __DIR__ . '/routes/habitos.php';

$app->run();
