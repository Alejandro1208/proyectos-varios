<?php

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function parse_json_body(): array
{
    $input = file_get_contents('php://input');
    if (!$input) {
        return [];
    }

    $decoded = json_decode($input, true);
    return is_array($decoded) ? $decoded : [];
}
