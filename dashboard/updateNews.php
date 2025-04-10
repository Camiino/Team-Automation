<?php
// updateNews.php

// Fehlerberichterstattung aktivieren – (in der Produktivumgebung ggf. deaktivieren)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Stelle sicher, dass nur POST-Anfragen verarbeitet werden
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

// Überprüfe, ob alle notwendigen Parameter übergeben wurden
if (!isset($_POST['id'], $_POST['lang'], $_POST['title'])) {
    die("Fehler: Fehlende Parameter.");
}

$id = (int) $_POST['id'];
$lang = trim($_POST['lang']);
$title = trim($_POST['title']);

// Erlaubte Sprachcodes – passe diese Liste gegebenenfalls an
$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

// Erzeuge den Spaltennamen, beispielsweise "title_de"
$column = "title_" . $lang;

// Datenbank-Verbindungsdaten – Werte bitte an deine Umgebung anpassen
$host = 'localhost';
$dbname = 'deine_datenbank';      // z. B. "my_news_db"
$username = 'dein_benutzername';   // z. B. "root"
$password = 'dein_passwort';       // z. B. "" oder "secret"

try {
    // Erstelle eine Verbindung via PDO
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankverbindung fehlgeschlagen: " . $e->getMessage());
}

// Aktualisiere den Titel in der entsprechenden Spalte der Tabelle "news"
$sql = "UPDATE news SET $column = :title WHERE id = :id";
$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([':title' => $title, ':id' => $id]);
    if ($stmt->rowCount() > 0) {
        echo "Titel erfolgreich aktualisiert.";
    } else {
        // Möglicherweise gab es keine Änderung oder der Datensatz wurde nicht gefunden
        echo "Keine Änderung vorgenommen oder Eintrag nicht gefunden.";
    }
} catch (PDOException $e) {
    echo "Fehler beim Aktualisieren: " . $e->getMessage();
}
