<?php
// Opcjonalnie: włącz wyświetlanie błędów (do debugowania)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kariera</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
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

    <!-- Istniejące CSS -->
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
  </head>
  <body>

    <div class="container-full bg-grey">
      <div class="container text-section">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="../index.html">Strona główna</a> > <a href="">Kariera</a>
        </div>

        <!-- Treść główna -->
        <div class="sub-content">
          <div class="title">
            <h2>Kariera</h2>
          </div>
          <h2 class="subtitle">
            DOŁĄCZ DO ZESPOŁU
          </h2>
          <div class="text">
            <p>
              Osoby zainteresowane prosimy o przesłanie kompletnych, wyczerpujących dokumentów aplikacyjnych – w tym świadectw i oczekiwań finansowych – na adres 
              <a href="mailto:job@team-automation-berlin.de">
                <span class="email">job@team-automation-berlin.de</span>
              </a>
              lub tradycyjną pocztą. Osobą kontaktową jest
              <span style="font-weight: bold;">pan Reiner W. Schulz.</span>
              <br><br>
            </p>
            
            <!-- Dynamiczny obszar z ofertami pracy (PDF) -->
            <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
              <?php
              // 1) Ścieżka do folderu z PDF (kariera)
              $dirPath = __DIR__ . '/../assets/uploads/karriere/';

              // 2) Sprawdzenie, czy katalog istnieje
              if (!is_dir($dirPath)) {
                echo "<p>Nie znaleziono folderu z ofertami pracy.</p>";
              } else {
                // 3) Pobierz pliki z katalogu
                $files = scandir($dirPath);
                // 4) Usuń '.' i '..'
                $files = array_diff($files, ['.', '..']);

                // 5) Filtruj tylko pliki PDF
                $pdfFiles = [];
                foreach ($files as $file) {
                  if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                    $pdfFiles[] = $file;
                  }
                }

                // 6) Sprawdź, czy istnieją pliki PDF
                if (empty($pdfFiles)) {
                  echo "<p>Obecnie brak dostępnych ofert pracy.</p>";
                } else {
                  // 7) Wyświetl każdą ofertę w układzie „Downloads”
                  foreach ($pdfFiles as $file) {
                    // Nazwa pliku bez rozszerzenia (tytuł)
                    $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                    // Zamiana podkreśleń na spacje (opcjonalnie)
                    $displayName  = str_replace('_', ' ', $filenameOnly);

                    // Ścieżka względna dla linków w HTML
                    $pdfRelPath = "../assets/uploads/karriere/$file";

                    echo "
                    <div class='row'>
                      <span>" . htmlspecialchars($displayName) . "</span>
                      <div class='icons-cont'>
                        <!-- Otwórz -->
                        <a href='{$pdfRelPath}' target='_blank'>
                          <img src='../assets/icons/eye-icon.svg' alt='Otwórz' title='Otwórz'>
                        </a>
                        <!-- Pobierz -->
                        <a href='{$pdfRelPath}' download='" . htmlspecialchars($file) . "'>
                          <img src='../assets/icons/download-icon.svg' alt='Pobierz' title='Pobierz'>
                        </a>
                      </div>
                    </div>";
                  }
                }
              }
              ?>
            </div>
            <!-- Koniec: dynamiczny obszar PDF -->

            <p>
              <span style="font-style: italic; font-size: 1rem; line-height: 0.75rem;">
                Z przyczyn technicznych nie zawsze możemy odpowiedzieć na Państwa e-maile natychmiast. Prosimy o wyrozumiałość.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Skrypty -->
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
