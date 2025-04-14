<?php
require_once 'auth_check.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Methode nicht erlaubt.";
    exit;
}

// Ensure the 'file' parameter is provided
if (!isset($_POST['file'])) {
    http_response_code(400);
    echo "Keine Datei gefunden.";
    exit;
}

$filename = $_POST['file'];

// Validate the file name: allow letters, numbers, underscores, dashes, spaces, and parentheses, with a .pdf extension (case-insensitive)
if (!preg_match('/^[\p{L}\p{N}\s_\-\(\)]+\.(pdf)$/iu', $filename)) {
    http_response_code(400);
    echo "Datei nicht gefunden.";
    exit;
}

// Define the target directory where the PDF files are stored
$dirPath = __DIR__ . '/../assets/uploads/karriere/';
$filePath = $dirPath . $filename;

// Verify that the file exists
if (!file_exists($filePath)) {
    http_response_code(404);
    echo "Datei nicht gefunden.";
    exit;
}

// Use realpath() to resolve the file path and ensure it's within the allowed directory (prevents directory traversal)
$realFilePath = realpath($filePath);
$realDirPath  = realpath($dirPath);
if ($realFilePath === false || strpos($realFilePath, $realDirPath) !== 0) {
    http_response_code(400);
    echo "Pfad nicht gefunden.";
    exit;
}

// Attempt to delete the file
if (unlink($realFilePath)) {
    echo "PDF wurde gelöscht.";
} else {
    http_response_code(500);
    echo "Fehler beim löschen der PDF.";
}
?>
