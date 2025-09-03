<?php
require_once 'auth_check.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Methode nicht erlaubt.";
    exit;
}

if (!isset($_POST['file'])) {
    http_response_code(400);
    echo "Keine Datei gefunden.";
    exit;
}

$filename = $_POST['file'];

// Allow letters, numbers, spaces, underscores, dashes, parentheses and .pdf extension
if (!preg_match('/^[\p{L}\p{N}\s_\-\(\)]+\.(pdf)$/iu', $filename)) {
    http_response_code(400);
    echo "Datei nicht gefunden.";
    exit;
}

$dirPath = __DIR__ . '/../assets/uploads/downloads/';
$filePath = $dirPath . $filename;

if (!file_exists($filePath)) {
    http_response_code(404);
    echo "Datei nicht gefunden.";
    exit;
}

$realFilePath = realpath($filePath);
$realDirPath  = realpath($dirPath);
if ($realFilePath === false || strpos($realFilePath, $realDirPath) !== 0) {
    http_response_code(400);
    echo "Pfad nicht gefunden.";
    exit;
}

if (unlink($realFilePath)) {
    echo "PDF wurde gelöscht.";
} else {
    http_response_code(500);
    echo "Fehler beim Löschen der PDF.";
}
?>

