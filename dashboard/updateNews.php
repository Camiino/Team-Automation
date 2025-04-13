<?php
require_once 'auth_check.php';

// Nur POST-Anfragen zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

// Parameterprüfung: id, lang, title und content müssen übergeben werden
if (!isset($_POST['id'], $_POST['lang'], $_POST['title'], $_POST['content'])) {
    die("Fehler: Fehlende Parameter.");
}

$id      = (int) $_POST['id'];
$lang    = trim($_POST['lang']);
$title   = trim($_POST['title']);
$content = trim($_POST['content']);

// Debug-Ausgabe: Eingegangene Parameter anzeigen
echo "Debug: Parameter empfangen:<br>";
echo "ID: $id<br>";
echo "Sprache: $lang<br>";
echo "Titel: $title<br>";
echo "Inhalt: $content<br><br>";

// Erlaubte Sprachcodes (anpassen, wenn nötig)
$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

// Dynamisch die Spaltennamen erzeugen, z. B. "title_de" und "content_de"
$titleCol   = "title_" . $lang;
$contentCol = "content_" . $lang;

// Gemeinsame DB-Konfiguration laden, falls vorhanden (config.php im selben Verzeichnis)
if (file_exists('../config.php')) {
    require_once '../config.php';
} else {
    // Falls keine config.php vorhanden ist, hier die Standardwerte anpassen:
    $host     = 'localhost';
    $dbname   = 'news_db';      // DB-Name anpassen!
    $username = 'news_user';    // Benutzername anpassen!
    $password = 'news_pass';    // Passwort anpassen!
}

try {
    // Verbindung zur Datenbank herstellen
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankverbindung fehlgeschlagen: " . $e->getMessage());
}

// SQL-Update: Aktualisiere die entsprechenden Spalten anhand der ID
$sql = "UPDATE news SET $titleCol = :title, $contentCol = :content WHERE id = :id";
$stmt = $pdo->prepare($sql);

// Ausführung und Debugging: Fehlerinfo ausgeben, falls vorhanden
try {
    $stmt->execute([
        ':title'   => $title,
        ':content' => $content,
        ':id'      => $id
    ]);
    
    // Debug: Fehlerinformation des Statements ausgeben
    echo "<pre>SQL Fehlerinfo: ";
    print_r($stmt->errorInfo());
    echo "</pre>";
    
    if ($stmt->rowCount() > 0) {
        echo "News erfolgreich aktualisiert.";
    } else {
        echo "Keine Änderung vorgenommen oder Eintrag nicht gefunden.";
    }
} catch (PDOException $e) {
    echo "Fehler beim Aktualisieren: " . $e->getMessage();
}
?>
