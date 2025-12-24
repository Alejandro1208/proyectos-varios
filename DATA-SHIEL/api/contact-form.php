<?php
require_once __DIR__ . '/config.php';

function readInput()
{
    $input = file_get_contents('php://input');
    if (empty($input)) {
        return $_POST;
    }
    $data = json_decode($input, true);
    return $data ? $data : [];
}

function response($data, $code = 200)
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    response(['error' => 'Método no permitido'], 405);
}

$payload = readInput();
$name = trim($payload['name'] ?? '');
$email = trim($payload['email'] ?? '');
$phone = trim($payload['phone'] ?? '');
$message = trim($payload['message'] ?? '');
$captchaToken = $payload['captchaToken'] ?? '';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    response(['error' => 'Nombre, email y mensaje son obligatorios'], 400);
}

$hcaptchaSecret = getenv('HCAPTCHA_SECRET') ?: '';

if ($hcaptchaSecret === '') {
    response(['error' => 'HCAPTCHA_SECRET no configurado'], 500);
}

if (empty($captchaToken)) {
    response(['error' => 'Falta el token de verificación'], 400);
}

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query([
            'secret' => $hcaptchaSecret,
            'response' => $captchaToken,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        'timeout' => 10,
    ],
]);

$verifyResponse = file_get_contents('https://hcaptcha.com/siteverify', false, $context);
if (!$verifyResponse) {
    response(['error' => 'No se pudo validar el captcha'], 400);
}

$verification = json_decode($verifyResponse, true);
if (empty($verification['success'])) {
    response(['error' => 'Verificación de captcha fallida'], 400);
}

$to = getenv('CONTACT_EMAIL_TO') ?: 'info@datashieldpdp.com';
$fromEmail = getenv('CONTACT_EMAIL_FROM') ?: 'info@datashieldpdp.com';
$subject = 'Nuevo mensaje desde el formulario de contacto';
$cleanMessage = strip_tags($message);
$htmlName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$htmlEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$htmlPhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$htmlMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$htmlIp = htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'N/D', ENT_QUOTES, 'UTF-8');

$body = <<<HTML
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6fa;padding:24px;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0c172d;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:700;">
            Nuevo mensaje desde el formulario de contacto
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;color:#0f172a;font-size:15px;line-height:1.6;">
            <p style="margin:0 0 12px;">Recibiste una nueva consulta desde el sitio web:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:12px 0;">
              <tr>
                <td width="140" style="font-weight:700;color:#0c172d;padding:6px 0;">Nombre:</td>
                <td style="color:#111827;padding:6px 0;">{$htmlName}</td>
              </tr>
              <tr>
                <td width="140" style="font-weight:700;color:#0c172d;padding:6px 0;">Email:</td>
                <td style="color:#111827;padding:6px 0;"><a href="mailto:{$htmlEmail}" style="color:#0d6efd;text-decoration:none;">{$htmlEmail}</a></td>
              </tr>
              <tr>
                <td width="140" style="font-weight:700;color:#0c172d;padding:6px 0;">Teléfono:</td>
                <td style="color:#111827;padding:6px 0;">{$htmlPhone}</td>
              </tr>
              <tr>
                <td width="140" style="font-weight:700;color:#0c172d;padding:6px 0;vertical-align:top;">Mensaje:</td>
                <td style="color:#111827;padding:6px 0;">{$htmlMessage}</td>
              </tr>
            </table>
            <p style="margin:18px 0 0;font-size:12px;color:#6b7280;">IP remitente: {$htmlIp}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0c172d;color:#cbd5e1;padding:14px 24px;font-size:12px;text-align:center;">
            Data Shield — Formulario de contacto
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
HTML;

ini_set('sendmail_from', $fromEmail);
$headers = implode("\r\n", [
    "From: Data Shield <{$fromEmail}>",
    "Reply-To: {$email}",
    "Content-Type: text/html; charset=utf-8",
    'MIME-Version: 1.0',
]);

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    response(['error' => 'No se pudo enviar el correo'], 500);
}

response(['success' => true]);
