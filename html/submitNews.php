<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Database config
$host = "db";
$dbname = "newsdb";
$user = "newsadmin";
$pass = "Yourpassword123!";

// Connect to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Verbindung fehlgeschlagen: " . $e->getMessage()]);
    exit;
}

// Simple form validation
$errors = [];

$title = trim($_POST['title'] ?? '');
$content = trim($_POST['content'] ?? '');
$dateInput = trim($_POST['date'] ?? '');
$date = null;

// Validate required fields
if (empty($title)) $errors[] = "Titel ist erforderlich.";
if (empty($content)) $errors[] = "Inhalt ist erforderlich.";

// Validate and convert date
if (preg_match('/^\d{2}\.\d{2}\.\d{4}$/', $dateInput)) {
    $parts = explode('.', $dateInput);
    $date = "{$parts[2]}-{$parts[1]}-{$parts[0]}"; // Convert to YYYY-MM-DD
} else {
    $errors[] = "Ungültiges Datumsformat. Bitte TT.MM.JJJJ verwenden.";
}

// Validate image
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    $fileType = function_exists('mime_content_type') ?
        mime_content_type($_FILES['image']['tmp_name']) :
        (new finfo(FILEINFO_MIME_TYPE))->file($_FILES['image']['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        $errors[] = "Nur JPEG, PNG oder WEBP erlaubt.";
    }

    if ($_FILES['image']['size'] > 10 * 1024 * 1024) {
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

// Upload image
$uploadDir = __DIR__ . '/../assets/uploads/';
$filename = uniqid() . '_' . basename($_FILES['image']['name']);
$targetFile = $uploadDir . $filename;

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    $imagePath = '/../assets/uploads/' . $filename;
} else {
    echo json_encode(["success" => false, "message" => "Bild-Upload fehlgeschlagen."]);
    exit;
}

// Insert into DB
$stmt = $pdo->prepare("INSERT INTO news (title, content, image_path, date) VALUES (:title, :content, :image_path, :date)");
$stmt->execute([
    ':title' => $title,
    ':content' => $content,
    ':image_path' => $imagePath,
    ':date' => $date
]);

echo json_encode(["success" => true, "message" => "Neuigkeit erfolgreich hochgeladen."]);
?>
