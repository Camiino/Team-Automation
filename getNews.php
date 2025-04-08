<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "db";
$dbname = "newsdb";
$user = "newsadmin";
$pass = "Yourpassword123!";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Datenbankverbindung fehlgeschlagen."]);
    exit;
}

// Unterstützte Sprachen
$supportedLanguages = ['de', 'en', 'pl', 'ru'];
$defaultLang = 'de';

// Sprache ermitteln (Reihenfolge: GET > Referer > default)
$lang = $_GET['lang'] ?? null;

// Versuche Sprache aus dem Referer abzuleiten
if (!$lang && isset($_SERVER['HTTP_REFERER'])) {
    if (strpos($_SERVER['HTTP_REFERER'], 'index_en') !== false || strpos($_SERVER['HTTP_REFERER'], '/html_en/') !== false) {
        $lang = 'en';
    } elseif (strpos($_SERVER['HTTP_REFERER'], 'index_pl') !== false || strpos($_SERVER['HTTP_REFERER'], '/html_pl/') !== false) {
        $lang = 'pl';
    } elseif (strpos($_SERVER['HTTP_REFERER'], 'index_ru') !== false || strpos($_SERVER['HTTP_REFERER'], '/html_ru/') !== false) {
        $lang = 'ru';
    } else {
        $lang = 'de';
    }
}

// Falls Sprache nicht unterstützt wird, fallback
if (!in_array($lang, $supportedLanguages)) {
    $lang = $defaultLang;
}

$titleCol = "title_" . $lang;
$contentCol = "content_" . $lang;

try {
    $stmt = $pdo->query("SELECT id, $titleCol AS title, $contentCol AS content, image_path, date FROM news ORDER BY date DESC");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($news);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Fehler beim Abrufen der Nachrichten."]);
}
?>
