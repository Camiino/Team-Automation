<?php
// updateNews.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

if (!isset($_POST['id'], $_POST['lang'], $_POST['title'], $_POST['content'])) {
    die("Fehler: Fehlende Parameter.");
}

$id = (int) $_POST['id'];
$lang = trim($_POST['lang']);
$title = trim($_POST['title']);
$content = trim($_POST['content']);

// Erlaubte Sprachen (passe an, falls nötig)
$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

// Erzeuge Spaltennamen (angenommen, die Spalten heißen z. B. title_de und content_de)
$titleCol = "title_" . $lang;
$contentCol = "content_" . $lang;

// Datenbank-Verbindungsdaten anpassen
$host = 'localhost';
$dbname = 'deine_datenbank';
$username = 'dein_benutzername';
$password = 'dein_passwort';

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankverbindung fehlgeschlagen: " . $e->getMessage());
}

$sql = "UPDATE news SET $titleCol = :title, $contentCol = :content WHERE id = :id";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([':title' => $title, ':content' => $content, ':id' => $id]);
    if ($stmt->rowCount() > 0) {
        echo "News erfolgreich aktualisiert.";
    } else {
        echo "Keine Änderung vorgenommen oder Eintrag nicht gefunden.";
    }
} catch (PDOException $e) {
    echo "Fehler beim Aktualisieren: " . $e->getMessage();
}
