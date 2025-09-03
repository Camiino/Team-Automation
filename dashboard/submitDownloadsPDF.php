<?php
require_once 'auth_check.php';

// Target directory for general downloads
$targetDir = __DIR__ . '/../assets/uploads/downloads/';
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (!isset($_FILES['pdf'])) {
    http_response_code(400);
    echo "Keine Datei hochgeladen.";
    exit;
}

if ($_FILES['pdf']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['pdf']['tmp_name'];
    $fileName = basename($_FILES['pdf']['name']);

    // Restrict to .pdf files only
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if ($ext !== 'pdf') {
        http_response_code(400);
        echo "Nur PDF-Dateien sind erlaubt.";
        exit;
    }

    $targetPath = $targetDir . $fileName;
    if (move_uploaded_file($fileTmpPath, $targetPath)) {
        header("Location: dashboard.php?downloads_success=1");
        exit;
    } else {
        http_response_code(500);
        echo "Fehler beim Verschieben der Datei.";
        exit;
    }
} else {
    http_response_code(400);
    echo "Fehler beim Hochladen der Datei.";
    exit;
}
?>

