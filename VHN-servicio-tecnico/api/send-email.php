<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->phone) || !isset($data->message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Faltan datos en el formulario.']);
    exit();
}

$name = filter_var(trim($data->name), FILTER_SANITIZE_STRING);
$phone = filter_var(trim($data->phone), FILTER_SANITIZE_STRING);
$message = filter_var(trim($data->message), FILTER_SANITIZE_STRING);

if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
    exit();
}

$to = 'info@VHNservice.com.ar';
$subject = 'Nuevo mensaje de contacto desde el sitio web';

$email_content = "Recibiste un nuevo mensaje de contacto:\n\n";
$email_content .= "Nombre: $name\n";
$email_content .= "Teléfono: $phone\n\n";
$email_content .= "Mensaje:\n$message\n";

$headers = "From: webmaster@vhnservice.com.ar\r\n";
$headers .= "Reply-To: $phone\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado con éxito.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Hubo un error al enviar el mensaje.']);
}
?>
