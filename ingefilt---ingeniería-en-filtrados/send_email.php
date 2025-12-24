<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
    $company = filter_var($data['company'] ?? '', FILTER_SANITIZE_STRING);
    $phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);
    $hcaptcha_response = $data['h-captcha-response'] ?? '';

    if (empty($hcaptcha_response)) {
        http_response_code(400);
        echo json_encode(["message" => "hCaptcha token missing"]);
        exit;
    }

    $secret_key = getenv('HCAPTCHA_SECRET') ?: '';
    if ($secret_key === '') {
        http_response_code(500);
        echo json_encode(["message" => "HCAPTCHA_SECRET no configurado"]);
        exit;
    }
    $verify_url = 'https://hcaptcha.com/siteverify';

    $post_data = http_build_query([
        'secret' => $secret_key,
        'response' => $hcaptcha_response
    ]);

    $ch = curl_init($verify_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $response_data = json_decode($response, true);

    if ($response_data['success']) {
        $to = "ventas@ingefilt.com";
        $subject = "Nuevo mensaje de contacto de " . $name;

        $safe_name = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safe_company = htmlspecialchars($company, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safe_phone = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safe_email = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        $safe_message = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

        $text_body  = "Nombre: " . $name . "\n";
        $text_body .= "Empresa: " . $company . "\n";
        $text_body .= "Teléfono: " . $phone . "\n";
        $text_body .= "Email: " . $email . "\n";
        $text_body .= "Mensaje:\n" . $message . "\n";

        $html_body = '
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; background:#f7f9fc; padding:24px; color:#0f172a;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden;">
            <tr>
              <td style="background:#1d4ed8; padding:18px 24px; color:#ffffff; font-size:18px; font-weight:bold;">
                Nuevo mensaje de contacto
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 16px 0; font-size:15px;">Se recibió una nueva consulta desde el formulario web:</p>
                <table cellpadding="0" cellspacing="0" style="width:100%; font-size:14px; line-height:1.5; border-collapse:collapse;">
                  <tr>
                    <td style="width:140px; font-weight:bold; color:#475569; padding:6px 0;">Nombre</td>
                    <td style="color:#0f172a; padding:6px 0;">' . $safe_name . '</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; color:#475569; padding:6px 0;">Empresa</td>
                    <td style="color:#0f172a; padding:6px 0;">' . $safe_company . '</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; color:#475569; padding:6px 0;">Teléfono</td>
                    <td style="color:#0f172a; padding:6px 0;">' . $safe_phone . '</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; color:#475569; padding:6px 0;">Email</td>
                    <td style="color:#0f172a; padding:6px 0;"><a href="mailto:' . $safe_email . '" style="color:#1d4ed8; text-decoration:none;">' . $safe_email . '</a></td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; color:#475569; padding:12px 0; vertical-align:top;">Mensaje</td>
                    <td style="color:#0f172a; padding:12px 0; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">' . $safe_message . '</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px; background:#f1f5f9; color:#475569; font-size:12px;">
                Enviado automáticamente desde ingefilt.com
              </td>
            </tr>
          </table>
        </body>
        </html>';

        $headers = "From: Ingefilt <ventas@ingefilt.com>\r\n";
        if (!empty($email)) {
            $headers .= "Reply-To: " . $email . "\r\n";
        }
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        if (mail($to, $subject, $html_body, $headers, "-f ventas@ingefilt.com")) {
            http_response_code(200);
            echo json_encode(["message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to send email"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "hCaptcha verification failed"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
