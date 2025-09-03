<?php
// Optional: enable error display for debugging
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Career</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
    <script src="../js/dynamic_insert_en.js"></script>

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

    <!-- Existing CSS -->
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
  </head>
  <body>

    <div class="container-full bg-grey">
      <div class="container text-section">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <a href="../index_en.html">Home</a> > <a href="">Career</a>
        </div>

        <!-- Main Content -->
        <div class="sub-content">
          <div class="title">
            <h2>Career</h2>
          </div>
          <h2 class="subtitle">
            BECOME PART OF THE TEAM
          </h2>
          <div class="text">
            <p>
              Interested applicants, please send your complete and meaningful application documents, including certificates and salary expectations, to 
              <a href="mailto:job@team-automation-berlin.de">
                <span class="email">job@team-automation-berlin.de</span>
              </a>
              . Your contact person is 
              <span style="font-weight: bold;">Mr. Reiner W. Schulz.</span>
              <br><br>
            </p>

            <!-- Dynamically listed PDF area for job postings -->
            <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
              <?php
              // (1) Path to the PDF folder
              $dirPath = __DIR__ . '/../assets/uploads/karriere/';

              // (2) Check if folder exists
              if (!is_dir($dirPath)) {
                echo "<p>No folder for job postings found.</p>";
              } else {
                // (3) Get files from folder
                $files = scandir($dirPath);
                // (4) Remove '.' and '..'
                $files = array_diff($files, ['.', '..']);
                // (5) Filter for only PDF files
                $pdfFiles = [];
                foreach ($files as $file) {
                  if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                    $pdfFiles[] = $file;
                  }
                }

                // (6) Check if any PDFs found
                if (empty($pdfFiles)) {
                  echo "<p>Currently no job postings available.</p>";
                } else {
                  // (7) Output each PDF file
                  foreach ($pdfFiles as $file) {
                    // Filename without extension (used as title)
                    $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                    // Replace underscores with spaces (optional)
                    $displayName  = str_replace('_', ' ', $filenameOnly);

                    // Relative path to the PDF for links
                    $pdfRelPath = "../assets/uploads/karriere/$file";

                    echo "
                    <div class='row'>
                      <span>" . htmlspecialchars($displayName) . "</span>
                      <div class='icons-cont'>
                        <!-- View -->
                        <a href='{$pdfRelPath}' target='_blank'>
                          <img src='../assets/icons/eye-icon.svg' alt='View' title='View'>
                        </a>
                        <!-- Download -->
                        <a href='{$pdfRelPath}' download='" . htmlspecialchars($file) . "'>
                          <img src='../assets/icons/download-icon.svg' alt='Download' title='Download'>
                        </a>
                      </div>
                    </div>";
                  }
                }
              }
              ?>
            </div>
            <!-- End dynamic PDFs -->

            <p>
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
