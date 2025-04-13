<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (file_exists('../config.php')) {
    require_once '../config.php';
} else {
    // Falls keine config.php vorhanden ist, hier die Standardwerte anpassen:
    $host     = 'localhost';
    $dbname   = 'news_db';      // DB-Name anpassen!
    $username = 'news_user';    // Benutzername anpassen!
    $password = 'news_pass';    // Passwort anpassen!
}

//$host = getenv('DB_HOST') ?: 'localhost';
//$username = getenv('DB_USER') ?: 'root';
//$password = getenv('DB_PASSWORD') ?: '';
//$dbname   = getenv('DB_NAME') ?: 'newsdb';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
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
    // Alle mehrsprachigen Felder abfragen:
    $sql = "SELECT 
              id,
              title_de,
              content_de,
              title_en,
              content_en,
              title_pl,
              content_pl,
              title_ru,
              content_ru,
              image_path,
              date
            FROM news 
            ORDER BY date DESC";
    $stmt = $pdo->query($sql);
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($news);
} catch (PDOException $e) {
    // Fehlerbehandlung, z.B. error_log oder entsprechende JSON-Ausgabe
    error_log($e->getMessage());
    echo json_encode(["error" => "Daten konnten nicht geladen werden."]);
}

?>
