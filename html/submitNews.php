<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database config via env (from docker-compose)
$host = "db";
$dbname = "newsdb";
$user = "newsadmin";
$pass = "Yourpassword123!";

// Connect to DB
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Verbindung fehlgeschlagen: " . $e->getMessage());
}

// Simple form validation
$errors = [];

$title = trim($_POST['title'] ?? '');
$content = trim($_POST['content'] ?? '');
$date = $_POST['date'] ?? date('Y-m-d');

// 1. Validate required fields
if (empty($title)) $errors[] = "Titel ist erforderlich.";
if (empty($content)) $errors[] = "Inhalt ist erforderlich.";

// 2. Validate date
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    $errors[] = "Ungültiges Datum.";
}

// 3. Validate image
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    $fileType = mime_content_type($_FILES['image']['tmp_name']);
    
    if (!in_array($fileType, $allowedTypes)) {
        $errors[] = "Nur JPEG, PNG oder WEBP erlaubt.";
    }

    if ($_FILES['image']['size'] > 10 * 1024 * 1024) { // 2 MB
        $errors[] = "Bild darf nicht größer als 10MB sein.";
    }
} else {
    $errors[] = "Bitte ein Bild hochladen.";
}

// Stop if there are validation errors
if (!empty($errors)) {
    foreach ($errors as $err) {
        echo "❌ " . htmlspecialchars($err) . "<br>";
    }
    exit;
}

// 4. Upload image
$uploadDir = __DIR__ . '/assets/uploads/';
$filename = uniqid() . '_' . basename($_FILES['image']['name']);
$targetFile = $uploadDir . $filename;

// Create folder if needed
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    $imagePath = '/assets/uploads/' . $filename;
} else {
    die("Bild-Upload fehlgeschlagen.");
}

// 5. Insert into DB with prepared statement
$stmt = $pdo->prepare("INSERT INTO news (title, content, image_path, date) VALUES (:title, :content, :image_path, :date)");
$stmt->execute([
    ':title' => $title,
    ':content' => $content,
    ':image_path' => $imagePath,
    ':date' => $date
]);

echo "✅ Neuigkeit erfolgreich hinzugefügt!";
?>
