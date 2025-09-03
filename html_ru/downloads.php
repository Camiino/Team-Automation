<?php
// По желанию: включить отображение ошибок для отладки
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Загрузки</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
    <script src="../js/dynamic_insert_ru.js"></script>

    <style>
      @font-face { font-family: "Lexend Deca"; src: url(../assets/fonts/Lexend_Deca/static/LexendDeca-Regular.ttf); }
      @font-face { font-family: "Lexend LexendDeca-Bold"; src: url(../assets/fonts/Lexend_Deca/static/LexendDeca-Bold.ttf); }
      @font-face { font-family: "Mukta_Mahee"; src: url(../assets/fonts/Mukta_Mahee/MuktaMahee-Regular.ttf); }
      body { font-family: "Lexend Deca"; }
      .neuigkeiten .neuigkeit-text { font-family: "Mukta_Mahee"; letter-spacing: 1.5px; }
    </style>
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
  </head>
  <body>

    <div class="container-full bg-grey">
      <div class="container text-section">
        <div class="breadcrumb">
          <a href="../index_ru.html">Главная</a> > <a href=""> Загрузки </a>
        </div>
        <div class="sub-content">
          <div class="title">
            <h2>Файлы для загрузки</h2>
          </div>

          <div class="text">
            <p>
              В этом разделе вы найдёте документы и сертификаты для ознакомления, доступные для бесплатной загрузки. 
              Если вы хотите использовать материалы в пресс-релизах или других публикациях, 
              пожалуйста, свяжитесь с нами для получения разрешения по адресу 
              <a href="mailto:marketing@team-automation-berlin.de"><span class="email">marketing@team-automation-berlin.de</span></a>.
            </p>
          </div>

          <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
            <?php
              $dirPath = __DIR__ . '/../assets/uploads/downloads/';
              if (!is_dir($dirPath)) {
                echo "<p>Папка для загрузок не найдена.</p>";
              } else {
                $files = scandir($dirPath);
                $files = array_diff($files, ['.', '..']);
                $pdfFiles = [];
                foreach ($files as $file) {
                  if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                    $pdfFiles[] = $file;
                  }
                }
                if (empty($pdfFiles)) {
                  echo "<p>На данный момент нет доступных файлов.</p>";
                } else {
                  foreach ($pdfFiles as $file) {
                    $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                    $displayName  = str_replace('_', ' ', $filenameOnly);
                    $pdfRelPath   = "../assets/uploads/downloads/$file";
                    echo "
                      <div class='row'>
                        <span>" . htmlspecialchars($displayName) . "</span>
                        <div class='icons-cont'>
                          <a href='{$pdfRelPath}' target='_blank'>
                            <img src='../assets/icons/eye-icon.svg' alt='Открыть' title='Открыть'>
                          </a>
                          <a href='{$pdfRelPath}' download='" . htmlspecialchars($file) . "'>
                            <img src='../assets/icons/download-icon.svg' alt='Скачать' title='Скачать'>
                          </a>
                        </div>
                      </div>";
                  }
                }
              }
            ?>
          </div>
        </div>
      </div>
    </div>

    <script src="../js/script.js?v=1.1"></script>
    <script src="../js/swiper-bundle.min.js?v=1.1"></script>
    <script>
      var swiper = new Swiper(".imgSwiper", {
        loop: true,
        pagination: { el: ".swiper-pagination", type: "fraction" },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      });
    </script>
  </body>
  </html>

