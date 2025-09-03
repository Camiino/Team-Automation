<?php
// Gemeinsame DB-Konfiguration mit Fallback auf .env

// Polyfills for PHP < 8 string helpers
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }
}
if (!function_exists('str_ends_with')) {
    function str_ends_with($haystack, $needle) {
        if ($needle === '') return true;
        return substr($haystack, -strlen($needle)) === $needle;
    }
}

function readEnvFile($path)
{
    if (!is_readable($path)) return [];
    $vars = [];
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        $pos = strpos($line, '=');
        if ($pos === false) continue;
        $key = trim(substr($line, 0, $pos));
        $val = trim(substr($line, $pos + 1));
        // strip optional surrounding quotes
        if ((str_starts_with($val, '"') && str_ends_with($val, '"')) || (str_starts_with($val, "'") && str_ends_with($val, "'"))) {
            $val = substr($val, 1, -1);
        }
        $vars[$key] = $val;
    }
    return $vars;
}

// First try environment variables (e.g. Docker/Coolify)
$host     = getenv('DB_HOST') ?: '';
$dbname   = getenv('DB_NAME') ?: '';
$username = getenv('DB_USER') ?: '';
$password = getenv('DB_PASSWORD') ?: '';

// If any missing, attempt to read from local .env
if ($host === '' || $dbname === '' || $username === '' || $password === '') {
    $env = readEnvFile(__DIR__ . '/.env');
    $host     = $host     !== '' ? $host     : ($env['DB_HOST'] ?? $host);
    $dbname   = $dbname   !== '' ? $dbname   : ($env['DB_NAME'] ?? $dbname);
    $username = $username !== '' ? $username : ($env['DB_USER'] ?? $username);
    $password = $password !== '' ? $password : ($env['DB_PASSWORD'] ?? $password);
}

// Final fallbacks (developer defaults)
if ($host === '')     { $host = 'localhost'; }
if ($dbname === '')   { $dbname = 'newsdb'; }
if ($username === '') { $username = 'root'; }
if ($password === '') { $password = ''; }
?>
