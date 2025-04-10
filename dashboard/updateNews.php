<?php
// updateNews.php

// Fehlerberichterstattung aktivieren (nur in der Entwicklungsumgebung!)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Nur POST-Anfragen verarbeiten
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

// Prüfe, ob alle notwendigen Parameter gesendet wurden
if (!isset($_POST['id'], $_POST['lang'], $_POST['title'], $_POST['content'])) {
    die("Fehler: Fehlende Parameter.");
}

$id      = (int) $_POST['id'];
$lang    = trim($_POST['lang']);
$title   = trim($_POST['title']);
$content = trim($_POST['content']);

// Erlaubte Sprachcodes – passe diese Liste bei Bedarf an
$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

// Spaltennamen definieren – laut deiner init-db.sql sind die Spalten z. B. "title_de" und "content_de"
$titleCol   = "title_" . $lang;
$contentCol = "content_" . $lang;

// Verbindung zur Datenbank herstellen – nimm hier die gleichen Zugangsparameter wie in submitNews.php und getNews.php
$host     = 'localhost';
$dbname   = 'news_db';      // <== Ersetze 'news_db' durch deinen tatsächlichen Datenbanknamen
$username = 'news_user';    // <== Ersetze 'news_user' durch deinen Datenbankbenutzernamen
$password = 'news_pass';    // <== Ersetze 'news_pass' durch dein Datenbankpasswort

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankverbindung fehlgeschlagen: " . $e->getMessage());
}

// Update-Query: Aktualisiere den Titel und Inhalt in der entsprechenden Sprachspalte
$sql = "UPDATE news SET $titleCol = :title, $contentCol = :content WHERE id = :id";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        ':title'   => $title,
        ':content' => $content,
        ':id'      => $id
    ]);
    if ($stmt->rowCount() > 0) {
        echo "News erfolgreich aktualisiert.";
    } else {
        echo "Keine Änderung vorgenommen oder Eintrag nicht gefunden.";
    }
} catch (PDOException $e) {
    echo "Fehler beim Aktualisieren: " . $e->getMessage();
}
?>
