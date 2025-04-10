<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Direkter Zugriff nicht erlaubt.");
}

if (!isset($_POST['id'], $_POST['lang'], $_POST['title'], $_POST['content'])) {
    die("Fehler: Fehlende Parameter.");
}

$id = (int)$_POST['id'];
$lang = trim($_POST['lang']);
$title = trim($_POST['title']);
$content = trim($_POST['content']);

$allowedLangs = ['de', 'en', 'pl', 'ru'];
if (!in_array($lang, $allowedLangs)) {
    die("Fehler: Ungültiger Sprachcode.");
}

$titleCol = "title_" . $lang;
$contentCol = "content_" . $lang;

$host = 'localhost';
$dbname = 'deine_datenbank';      // anpassen!
$username = 'dein_benutzername';   // anpassen!
$password = 'dein_passwort';       // anpassen!

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Verbindung fehlgeschlagen: " . $e->getMessage());
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
    echo "Fehler: " . $e->getMessage();
}
?>
