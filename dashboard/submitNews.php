<?php
require_once 'auth_check.php';

header('Content-Type: application/json');

if (file_exists('../config.php')) {
    require_once '../config.php';
} else {
    // Falls keine config.php vorhanden ist, hier die Standardwerte anpassen:
    $host     = 'localhost';
    $dbname   = 'news_db';      // DB-Name anpassen!
    $username = 'news_user';    // Benutzername anpassen!
    $password = 'news_pass';    // Passwort anpassen!
}

// Connect to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Verbindung fehlgeschlagen: " . $e->getMessage()]);
    exit;
}

// Gather form fields for all languages
$title_de    = trim($_POST['title_de']    ?? '');
$content_de  = trim($_POST['content_de']  ?? '');
$title_en    = trim($_POST['title_en']    ?? '');
$content_en  = trim($_POST['content_en']  ?? '');
$title_pl    = trim($_POST['title_pl']    ?? '');
$content_pl  = trim($_POST['content_pl']  ?? '');
$title_ru    = trim($_POST['title_ru']    ?? '');
$content_ru  = trim($_POST['content_ru']  ?? '');
$dateInput   = trim($_POST['date']        ?? '');

// Basic validation
$errors = [];

// Check if each language field is provided (adjust if you want them optional)
if (empty($title_de))   $errors[] = "Titel (DE) ist erforderlich.";
if (empty($content_de)) $errors[] = "Inhalt (DE) ist erforderlich.";

if (empty($title_en))   $errors[] = "Title (EN) is required.";
if (empty($content_en)) $errors[] = "Content (EN) is required.";

if (empty($title_pl))   $errors[] = "Tytuł (PL) jest wymagany.";
if (empty($content_pl)) $errors[] = "Treść (PL) jest wymagana.";

if (empty($title_ru))   $errors[] = "Заголовок (RU) обязателен.";
if (empty($content_ru)) $errors[] = "Содержание (RU) обязательно.";

// Validate date format (TT.MM.JJJJ → YYYY-MM-DD)
$dateDB = null;
if (preg_match('/^\d{2}\.\d{2}\.\d{4}$/', $dateInput)) {
    $parts = explode('.', $dateInput);
    $dateDB = "{$parts[2]}-{$parts[1]}-{$parts[0]}"; // YYYY-MM-DD
} else {
    $errors[] = "Ungültiges Datumsformat. Bitte TT.MM.JJJJ verwenden.";
}

// Validate image
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    // mime_content_type() requires PHP >= 7.2 or the finfo extension
    $fileType = function_exists('mime_content_type')
        ? mime_content_type($_FILES['image']['tmp_name'])
        : (new finfo(FILEINFO_MIME_TYPE))->file($_FILES['image']['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        $errors[] = "Nur JPEG, PNG oder WEBP sind erlaubt.";
    }

    if ($_FILES['image']['size'] > 10 * 1024 * 1024) { // 10 MB limit
        $errors[] = "Bild darf nicht größer als 10MB sein.";
    }
} else {
    $errors[] = "Bitte ein Bild hochladen.";
}

// Return validation errors if any
if (!empty($errors)) {
    echo json_encode(["success" => false, "message" => implode("\n", $errors)]);
    exit;
}

// Attempt file upload
$uploadDir = __DIR__ . '/../assets/uploads/';
$filename = uniqid() . '_' . basename($_FILES['image']['name']);
$targetFile = $uploadDir . $filename;

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    // Store the relative path for use in the front-end
    $imagePath = '/../assets/uploads/' . $filename;
} else {
    echo json_encode(["success" => false, "message" => "Bild-Upload fehlgeschlagen."]);
    exit;
}

// Insert into DB
try {
    $stmt = $pdo->prepare("
        INSERT INTO news (
          title_de, content_de,
          title_en, content_en,
          title_pl, content_pl,
          title_ru, content_ru,
          image_path, date
        ) VALUES (
          :title_de, :content_de,
          :title_en, :content_en,
          :title_pl, :content_pl,
          :title_ru, :content_ru,
          :image_path, :date
        )
    ");
    $stmt->execute([
        ':title_de'    => $title_de,
        ':content_de'  => $content_de,
        ':title_en'    => $title_en,
        ':content_en'  => $content_en,
        ':title_pl'    => $title_pl,
        ':content_pl'  => $content_pl,
        ':title_ru'    => $title_ru,
        ':content_ru'  => $content_ru,
        ':image_path'  => $imagePath,
        ':date'        => $dateDB
    ]);

    echo json_encode(["success" => true, "message" => "Neuigkeit erfolgreich hochgeladen."]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Datenbankfehler: " . $e->getMessage()]);
}
