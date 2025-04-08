<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Новости</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
    <script src="../js/dynamic_insert_ru.js"></script>

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
    <link rel="stylesheet" href="../css/subpage.css" />
  </head>
  <body>

    <div class="container-full subpage-top">
      <div class="container">
        <div class="breadcrumb">
          <a href="../index_ru.html">Главная</a> > <a href=""> Новости </a>
        </div>

        <img
          class="subpage-top-img"
          src="../assets/images/news.webp"
          alt=""
        />
      </div>
    </div>

    <div class="mini-nav">
      <a href="#top" onclick="goPageOne(event)">Новости</a>
      <a href="#neuesP">Ваш новый проект</a>
      <img class="mini-nav-scroll" src="../assets/icons/arrow-top.svg" alt="" />
      <img class="mini-nav-menu" src="../assets/icons/arrow-top.svg" alt="" />
    </div>

    <script></script>

    <div class="container-full" id="project-container">
      <div class="container">
        <div class="project-page project-page-active" id="project-page-1">

          <!-- DYNAMIC NEWS STARTS HERE -->
          <?php
            // === CONFIG ===
            $host = "db";
            $user = "newsadmin";
            $pass = "YourPassword123!";
            $db   = "newsdb";
            $projectsPerPage = 3;

            // === CONNECT ===
            $conn = new mysqli($host, $user, $pass, $db);
            if ($conn->connect_error) {
              die("DB connection failed: " . $conn->connect_error);
            }

            // === GET CURRENT PAGE ===
            $page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;

            // === TOTAL COUNT ===
            $totalResult = $conn->query("SELECT COUNT(*) AS total FROM news");
            $totalRow = $totalResult->fetch_assoc();
            $totalProjects = (int)$totalRow['total'];
            $totalPages = max(1, ceil($totalProjects / $projectsPerPage));
            $page = max(1, min($page, $totalPages));

            // === OFFSET ===
            $offset = ($page - 1) * $projectsPerPage;

            // === FETCH RUSSIAN COLUMNS ONLY ===
            $query = "
              SELECT
                id,
                title_ru AS title,
                content_ru AS content,
                image_path,
                date
              FROM news
              ORDER BY date DESC
              LIMIT $offset, $projectsPerPage
            ";
            $result = $conn->query($query);

            $projectIndex = $offset + 1;

            if ($result && $result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                echo '<div class="project-separator">\n                        <p>Проект ' . $projectIndex . '</p>\n                        <hr />\n                      </div>';

                // project styling
                $cssClass = ($projectIndex % 2 === 0) ? "project project-reverse" : "project";

                // date formatting
                $dateObj = DateTime::createFromFormat('Y-m-d', $row["date"]);
                $dateFormatted = $dateObj ? $dateObj->format('d. F Y') : htmlspecialchars($row["date"]);

                // sanitize
                $title = htmlspecialchars($row["title"]);
                $content = nl2br(htmlspecialchars($row["content"]));
                $imagePath = htmlspecialchars($row["image_path"]);

                echo '<div class="' . $cssClass . '" id="projekt-' . $projectIndex . '">\n                        <img src="' . $imagePath . '" alt="" class="project-img"/>\n                        <div class="project-text">\n                          <h4>' . $dateFormatted . '</h4>\n                          <h3>' . $title . '</h3>\n                          <p>' . $content . '</p>\n                        </div>\n                      </div>';

                $projectIndex++;
              }
            } else {
              echo "<p>Новостей не найдено.</p>";
            }

            // === PAGINATION ===
            echo '<div class="project-pagination"><hr /><div class="project-pagination-pages">';
            for ($i = 1; $i <= $totalPages; $i++) {
              $active = $i === $page ? 'project-pagination-pages-current' : '';
              echo '<a href="?page=' . $i . '" class="' . $active . '">' . $i . '</a>';
            }
            echo '</div><hr /></div>';
          ?>
          <!-- DYNAMIC NEWS ENDS HERE -->
        </div>

        <div class="project project-reverse">
          <img
            src="../assets/images/create.webp"
            alt=""
            class="project-img"
          />
          <div class="project-text" id="neuesP">
            <h4>Сегодня</h4>
            <h3>Ваш новый проект</h3>
            <p>
              Представьте, что ваш следующий проект станет частью нашей истории успеха. Вместе мы
              автоматизируем ваши процессы и создадим инновационные решения для ваших
              производственных линий и цепочек. Давайте вместе воплотим вашу идею в реальность!
            </p>
            <a href="./kontakt.html" class="btn"> Начнём прямо сейчас </a>
          </div>
        </div>
      </div>
    </div>

    <script src="../js/script.js?v=1.1"></script>
    <script src="../js/mininav.js?v=1.1"></script>

    <script>
      const projectPages = document.querySelectorAll(".project-page");
      function changePage(event, page) {
        projectPages.forEach((projectPage) => {
          projectPage.classList.remove("project-page-active");
        });

        document.getElementById(page).classList.add("project-page-active");
        document.getElementById("project-container").scrollIntoView();

        const paginationPages = document.querySelectorAll(".project-pagination-pages a");
        paginationPages.forEach((paginationPage) => {
          paginationPage.classList.remove("project-pagination-pages-current");
        });
        event.target.classList.add("project-pagination-pages-current");
      }

      function goPageOne(event) {
        document.getElementById("first").click();
      }
    </script>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get("page");
        const sectionParam = urlParams.get("section");

        if (pageParam) {
          const pageId = `project-page-${pageParam}`;
          const targetPage = document.getElementById(pageId);

          if (targetPage) {
            document.querySelectorAll(".project-page").forEach((el) => el.classList.remove("project-page-active"));
            targetPage.classList.add("project-page-active");

            document.querySelectorAll(".project-pagination-pages a").forEach((el) => el.classList.remove("project-pagination-pages-current"));

            const activePageIndicator = document.querySelector(`.project-pagination-pages a:nth-child(${pageParam})`);
            if (activePageIndicator) {
              activePageIndicator.classList.add("project-pagination-pages-current");
            }

            document.getElementById("project-container").scrollIntoView();

            if (sectionParam) {
              setTimeout(() => {
                const sectionElement = document.getElementById(sectionParam);
                if (sectionElement) {
                  const offset = 10 * window.innerHeight / 100;
                  const elementPosition = sectionElement.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top: elementPosition, behavior: "smooth" });
                }
              }, 500);
            }
          }
        }
      });
    </script>
  </body>
</html>
