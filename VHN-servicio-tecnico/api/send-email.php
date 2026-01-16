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

$to = 'info@vhnservice.com';
$subject = 'Nuevo mensaje de contacto desde el sitio web';

$email_content = '
<html>
<head>
    <title>Nuevo mensaje de contacto</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; border: 1px solid #cccccc;">
                    <tr>
                        <td align="center" bgcolor="#007bff" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                            Nuevo Mensaje de Contacto
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #333333; font-size: 20px;">
                                        <strong>Detalles del Contacto:</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 30px 0; color: #555555; font-size: 16px; line-height: 20px;">
                                        <p><strong>Nombre:</strong> ' . $name . '</p>
                                        <p><strong>Teléfono:</strong> ' . $phone . '</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #333333; font-size: 20px;">
                                        <strong>Mensaje:</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 0 0; color: #555555; font-size: 16px; line-height: 20px;">
                                        <p>' . nl2br($message) . '</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" style="padding: 30px 30px 30px 30px;">
                            <p style="margin: 0; color: #888888; font-size: 14px;">Este es un correo electrónico automatizado enviado desde su sitio web.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: webmaster@vhnservice.com\r\n";
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
