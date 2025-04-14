<?php
// По желанию: включить отображение ошибок (для отладки)
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Карьера</title>
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

    <!-- Существующие стили CSS -->
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
  </head>
  <body>

    <div class="container-full bg-grey">
      <div class="container text-section">
        <!-- Хлебные крошки (Breadcrumb) -->
        <div class="breadcrumb">
          <a href="../index.html">Главная страница</a> > <a href="">Карьера</a>
        </div>

        <!-- Основной контент -->
        <div class="sub-content">
          <div class="title">
            <h2>Карьера</h2>
          </div>
          <h2 class="subtitle">
            ПРИСОЕДИНЯЙТЕСЬ К НАШЕЙ КОМАНДЕ
          </h2>
          <div class="text">
            <p>
              Заинтересованные кандидаты могут присылать полные и подробные резюме, включая копии свидетельств и желаемую заработную плату, 
              на адрес 
              <a href="mailto:job@team-automation-berlin.de">
                <span class="email">job@team-automation-berlin.de</span>
              </a> 
              или «по-старинке» по почте. Ваш контактное лицо —
              <span style="font-weight: bold;">г-н Райнер В. Шульц.</span>
              <br><br>
            </p>

            <!-- Динамически генерируемый раздел PDF (вакансии) -->
            <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
              <?php
              // 1) Путь к папке PDF (kariera)
              $dirPath = __DIR__ . '/../assets/uploads/karriere/';

              // 2) Проверяем, существует ли папка
              if (!is_dir($dirPath)) {
                echo "<p>Папка с вакансиями не найдена.</p>";
              } else {
                // 3) Получаем файлы из папки
                $files = scandir($dirPath);
                // 4) Удаляем '.' и '..'
                $files = array_diff($files, ['.', '..']);

                // 5) Фильтруем только PDF-файлы
                $pdfFiles = [];
                foreach ($files as $file) {
                  if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                    $pdfFiles[] = $file;
                  }
                }

                // 6) Проверяем, есть ли PDF-файлы
                if (empty($pdfFiles)) {
                  echo "<p>В настоящий момент доступных вакансий нет.</p>";
                } else {
                  // 7) Выводим каждую вакансию в стиле «Downloads»
                  foreach ($pdfFiles as $file) {
                    // Имя файла без расширения (используется как заголовок)
                    $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                    // Опционально: Заменяем подчёркивания на пробелы
                    $displayName  = str_replace('_', ' ', $filenameOnly);

                    // Относительный путь к PDF (для ссылок в HTML)
                    $pdfRelPath = "../assets/uploads/karriere/$file";

                    echo "
                    <div class='row'>
                      <span>" . htmlspecialchars($displayName) . "</span>
                      <div class='icons-cont'>
                        <!-- Просмотр -->
                        <a href='{$pdfRelPath}' target='_blank'>
                          <img src='../assets/icons/eye-icon.svg' alt='Просмотр' title='Просмотр'>
                        </a>
                        <!-- Скачивание -->
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
            <!-- Конец динамического раздела PDF -->

            <p>
              <span style="font-style: italic; font-size: 1rem; line-height: 0.75rem;">
                По техническим причинам мы не всегда можем ответить на Ваши электронные письма незамедлительно. Благодарим за понимание.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Скрипты -->
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
