<?php

// Datos que te dio DonWeb
$db_host = 'localhost';
$db_name = 'a0030832_datas';
$db_user = 'a0030832_datas';
$db_pass = 'sumu51POmu';
$db_charset = 'utf8mb4';

$dsn = "mysql:host=$db_host;dbname=$db_name;charset=$db_charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error de conexión a la base de datos',
        'details' => $e->getMessage(),
    ]);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
