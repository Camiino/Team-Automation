<?php
//ini_set('display_errors', 1);
//error_reporting(E_ALL);
$targetDir = '../assets/uploads/karriere/';
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

if ($_FILES['pdf']['error'] === UPLOAD_ERR_OK) {
  $fileTmpPath = $_FILES['pdf']['tmp_name'];
  $fileName = basename($_FILES['pdf']['name']);
  $targetPath = $targetDir . $fileName;

  if (move_uploaded_file($fileTmpPath, $targetPath)) {
    header("Location: karriereDashboard.php?success=1");
    exit;
  } else {
    echo "Fehler beim Verschieben der Datei.";
  }
} else {
  echo "Fehler beim Hochladen der Datei.";
}
