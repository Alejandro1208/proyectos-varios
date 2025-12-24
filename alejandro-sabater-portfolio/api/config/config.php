<?php
$projectRoot = dirname(__DIR__, 2);

return [
    'db_host' => getenv('DB_HOST') ?: 'localhost',
    'db_name' => getenv('DB_NAME') ?: 'ale287_portafolio',
    'db_user' => getenv('DB_USER') ?: 'ale287_Alejandro',
    'db_pass' => getenv('DB_PASSWORD') ?: 'Giovanni2906.',
    'db_port' => getenv('DB_PORT') ?: 3306,
    'uploads_dir' => realpath($projectRoot . '/images') ?: ($projectRoot . '/images')
];
