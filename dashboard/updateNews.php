<?php
// updateNews.php

// DB-Konfiguration laden (verwende denselben Pfad wie in deinen anderen PHP-Dateien)
require_once 'config.php';

// Nur POST-Anfragen zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

// Es müssen alle Parameter übergeben werden
if (!isset($_POST['id'], $_POST['lang'], $_POST['title'], $_POST['content'])) {
    die("Fehler: Fehlende Parameter.");
}

$id      = (int) $_POST['id'];
$lang    = trim($_POST['lang']);
$title   = trim($_POST['title']);
$content = trim($_POST['content']);

// Erlaubte Sprachcodes
$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

// Dynamisch den Spaltennamen erzeugen, z. B. "title_de" und "content_de"
$titleCol   = "title_" . $lang;
$contentCol = "content_" . $lang;

try {
    // Erstelle eine neue PDO-Verbindung mithilfe der in config.php definierten Parameter
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankverbindung fehlgeschlagen: " . $e->getMessage());
}

// Update-Query: Aktualisiere den Titel und Inhalt in der entsprechenden Sprache
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
