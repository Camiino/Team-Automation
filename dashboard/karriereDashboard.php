<?php require_once 'auth_check.php'; ?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Karriere Dashboard</title>
  <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/dashboard.css" />
    <link rel="stylesheet" href="../css/kontakt.css" />
  <style>
    body {
      font-family: sans-serif;
      padding: 2rem;
    }
    .pdf-list a {
      display: block;
      margin-bottom: 0.5rem;
    }
  </style>
</head>
<body>
  <h2>Karriere Dashboard</h2>

  <form id="pdfUploadForm" enctype="multipart/form-data" method="POST" action="submitKarrierePDF.php">
    <label for="pdf">PDF Hochladen (Stellenausschreibung):</label><br>
    <input type="file" id="pdf" name="pdf" accept="application/pdf" required />
    <button type="submit">Hochladen</button>
  </form>

  <hr>

  <h3>Hochgeladene PDF-Dateien</h3>
  <div class="pdf-list">
    <?php
      $dir = '../assets/uploads/karriere/';
      if (!is_dir($dir)) mkdir($dir, 0777, true);
      $files = array_diff(scandir($dir), ['.', '..']);
      if (empty($files)) {
        echo "<p>Keine Dateien gefunden.</p>";
      } else {
        foreach ($files as $file) {
          echo "<a href='$dir$file' target='_blank'>" . htmlspecialchars($file) . "</a>";
        }
      }
    ?>
  </div>
</body>
</html>
