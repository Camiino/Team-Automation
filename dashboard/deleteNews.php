<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Prüfen, ob ID gesendet wurde
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    http_response_code(400);
    echo "❌ Ungültige oder fehlende ID.";
    exit;
}

$id = (int)$_POST['id'];

try {
    $pdo = new PDO("mysql:host=db;dbname=newsdb;charset=utf8mb4", "newsadmin", "YourPassword123!");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Bildpfad abrufen
    $stmtImg = $pdo->prepare("SELECT image_path FROM news WHERE id = ?");
    $stmtImg->execute([$id]);
    $imagePath = $stmtImg->fetchColumn();

    // Bild löschen (nur wenn Datei existiert)
    if ($imagePath) {
        $fullPath = __DIR__ . $imagePath;
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }

    // News-Eintrag löschen
    $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);

    echo "✅ Neuigkeit erfolgreich gelöscht.";
} catch (PDOException $e) {
    http_response_code(500);
    echo "❌ Fehler beim Löschen: " . htmlspecialchars($e->getMessage());
}
?>
