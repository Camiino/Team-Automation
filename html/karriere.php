<?php
// Optional: Fehleranzeige aktivieren
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Karriere</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
    <script src="../js/config.js.php"></script>
    <script src="../js/dynamic_insert.js"></script>

    <style>
      @font-face {
        font-family: "Lexend Deca";
        src: url(../assets/fonts/Lexend_Deca/static/LexendDeca-Regular.ttf);
      }
      @font-face {
        font-family: "Lexend LexendDeca-Bold";
        src: url(../assets/fonts/Lexend_Deca/static/LexendDeca-Bold.ttf);
      }
      @font-face {
        font-family: "Mukta_Mahee";
        src: url(../assets/fonts/Mukta_Mahee/MuktaMahee-Regular.ttf);
      }

      body {
        font-family: "Lexend Deca";
      }
      .neuigkeiten .neuigkeit-text {
        font-family: "Mukta_Mahee";
        letter-spacing: 1.5px;
      }
    </style>

    <!-- Bestehende CSS -->
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
  </head>
  <body>

    <div class="container-full bg-grey">
      <div class="container text-section">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="../index.html">Home</a> > <a href="">Karriere</a>
        </div>

        <!-- Content -->
        <div class="sub-content">
          <div class="title">
            <h2>Karriere</h2>
          </div>
          <h2 class="subtitle">
            WERDE TEIL DES TEAMS
          </h2>
          <div class="text">
            <p>
              Interessenten senden bitte ihre kompletten aussagefähigen Unterlagen inklusive Zeugnissen und Gehaltsvorstellung an 
              <a href="mailto:job@team-automation-berlin.de">
                <span class="email">job@team-automation-berlin.de</span>
              </a> 
              oder ganz „old school“ per Post. Ihr Ansprechpartner ist 
              <span style="font-weight: bold;">Herr Reiner W. Schulz.</span>
              <br><br>
            </p>
            <!-- BEGIN: Dynamisch gelisteter PDF-Bereich für Stellenausschreibungen -->
                <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
                  <?php
                  // 1) Pfad zum PDF-Ordner (von karriere.php aus: html -> .. -> assets/uploads/karriere/pdf)
                  $dirPath = __DIR__ . '/../assets/uploads/karriere/';
                  
                  // Optional: Zum Debuggen
                  // echo "<pre>Suche in: " . realpath($dirPath) . "</pre>";

                  // 2) Prüfen, ob Ordner existiert
                  if (!is_dir($dirPath)) {
                    echo "<p>Kein Ordner für Stellenausschreibungen gefunden.</p>";
                  } else {
                    // 3) Dateien aus Ordner holen
                    $files = scandir($dirPath);
                    // 4) '.' und '..' entfernen
                    $files = array_diff($files, ['.', '..']);
                    // 5) Nur PDF-Dateien filtern
                    $pdfFiles = [];
                    foreach ($files as $file) {
                      if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                        $pdfFiles[] = $file;
                      }
                    }

                    // 6) Prüfen, ob PDF-Dateien da sind
                    if (empty($pdfFiles)) {
                      echo "<p>Derzeit keine Stellenausschreibungen vorhanden.</p>";
                    } else {
                      // 7) Ausgabe jeder PDF-Datei im Downloads-Layout
                      foreach ($pdfFiles as $file) {
                        // Dateiname ohne Endung (als Titel genutzt)
                        $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                        // Optional: Unterstriche durch Leerzeichen ersetzen
                        $displayName  = str_replace('_', ' ', $filenameOnly);

                        // Relativer Pfad zur PDF-Datei (von karriere.php aus: html -> .. -> assets/uploads/karriere/pdf)
                        $pdfRelPath = "../assets/uploads/karriere/$file";

                        echo "
                        <div class='row'>
                          <span>" . htmlspecialchars($displayName) . "</span>
                          <div class='icons-cont'>
                            <!-- Anzeigen -->
                            <a href='{$pdfRelPath}' target='_blank'>
                              <img src='../assets/icons/eye-icon.svg' alt='Anzeigen' title='Anzeigen'>
                            </a>
                            <!-- Download -->
                            <a href='{$pdfRelPath}' download='" . htmlspecialchars($file) . "'>
                              <img src='../assets/icons/download-icon.svg' alt='Herunterladen' title='Herunterladen'>
                            </a>
                          </div>
                        </div>";
                      }
                    }
                  }
                  ?>
            </div>
            <!-- END: Dynamisch gelisteter PDF-Bereich -->
             <p>
              <span style="font-style: italic; font-size: 1rem; line-height: 0.75rem;">
                  Aus technischen Gründen kann die Beantwortung Ihrer E-Mails nicht immer sofort erfolgen. Wir bitten dafür um Ihr Verständnis.
                </span>
             </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <script src="../js/script.js?v=1.1"></script>
    <script src="../js/swiper-bundle.min.js?v=1.1"></script>
    <script>
      var swiper = new Swiper(".imgSwiper", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    </script>

  </body>
</html>
