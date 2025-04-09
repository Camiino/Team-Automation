<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aktualności</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />
    <script src="../js/dynamic_insert_pl.js"></script>

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
          <a href="../index_pl.html">Start</a> > <a href="#">Aktualności</a>
        </div>

        <img
          class="subpage-top-img"
          src="../assets/images/news.webp"
          alt=""
        />
      </div>
    </div>

    <div class="mini-nav">
      <a href="#top" onclick="goPageOne(event)">Aktualności</a>
      <a href="#neuesP">Twój nowy projekt</a>
      <img class="mini-nav-scroll" src="../assets/icons/arrow-top.svg" alt="" />
      <img class="mini-nav-menu" src="../assets/icons/arrow-top.svg" alt="" />
    </div>

    <div class="container-full" id="project-container">
      <div class="container">
        <div class="project-page project-page-active" id="project-page-1">

          <!-- DYNAMIC NEWS STARTS HERE -->
          <?php
            // =======================
            // 1) CONFIG
            // =======================
            $host = "db";
            $user = "newsadmin";
            $pass = "YourPassword123!";
            $db   = "newsdb";
            $projectsPerPage = 3;

            // =======================
            // 2) CONNECT
            // =======================
            $conn = new mysqli($host, $user, $pass, $db);
            if ($conn->connect_error) {
              die("Błąd połączenia z bazą danych: " . $conn->connect_error);
            }

            // =======================
            // 3) GET CURRENT PAGE
            // =======================
            $page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;

            // =======================
            // 4) TOTAL COUNT
            // =======================
            $totalResult = $conn->query("SELECT COUNT(*) AS total FROM news");
            $totalRow = $totalResult->fetch_assoc();
            $totalProjects = (int)$totalRow['total'];
            $totalPages = max(1, ceil($totalProjects / $projectsPerPage));
            $page = max(1, min($page, $totalPages));

            // =======================
            // 5) OFFSET
            // =======================
            $offset = ($page - 1) * $projectsPerPage;

            // =======================
            // 6) FETCH POLISH COLUMNS
            // =======================
            $query = "
              SELECT
                id,
                title_pl AS title,
                content_pl AS content,
                image_path,
                date
              FROM news
              ORDER BY date DESC
              LIMIT $offset, $projectsPerPage
            ";
            $result = $conn->query($query);

            $projectIndex = $offset + 1;

            // =======================
            // 7) Manual Polish Date
            // =======================
            function formatPolishDate($dateString) {
              $months = [
                '01' => 'stycznia',
                '02' => 'lutego',
                '03' => 'marca',
                '04' => 'kwietnia',
                '05' => 'maja',
                '06' => 'czerwca',
                '07' => 'lipca',
                '08' => 'sierpnia',
                '09' => 'września',
                '10' => 'października',
                '11' => 'listopada',
                '12' => 'grudnia'
              ];

              $dateObj = DateTime::createFromFormat('Y-m-d', $dateString);
              if (!$dateObj) {
                // If parsing fails, just show raw
                return htmlspecialchars($dateString);
              }

              $day = $dateObj->format('d');
              $month = $dateObj->format('m');
              $year = $dateObj->format('Y');

              // Return something like: "08 kwietnia 2025"
              return "$day {$months[$month]} $year";
            }

            // =======================
            // 8) DISPLAY RESULTS
            // =======================
            if ($result && $result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {
                // Output project separator
                echo '<div class="project-separator">
                        <p>Projekt ' . $projectIndex . '</p>
                        <hr />
                      </div>';

                // Decide layout
                $cssClass = ($projectIndex % 2 === 0) ? "project project-reverse" : "project";

                // Format date (Polish)
                $dateFormatted = formatPolishDate($row["date"]);

                // sanitize
                $title = htmlspecialchars($row["title"]);
                $content = nl2br(htmlspecialchars($row["content"]));
                $imagePath = htmlspecialchars($row["image_path"]);

                // Output
                echo '<div class="' . $cssClass . '" id="projekt-' . $projectIndex . '">
                        <img src="' . $imagePath . '" alt="" class="project-img"/>
                        <div class="project-text">
                          <h4>' . $dateFormatted . '</h4>
                          <h3>' . $title . '</h3>
                          <p>' . $content . '</p>
                        </div>
                      </div>';

                $projectIndex++;
              }
            } else {
              echo "<p>Brak aktualności.</p>";
            }

            // =======================
            // 9) PAGINATION
            // =======================
            echo '<div class="project-pagination"><hr /><div class="project-pagination-pages">';
            for ($i = 1; $i <= $totalPages; $i++) {
              $active = $i === $page ? 'project-pagination-pages-current' : '';
              echo '<a href="?page=' . $i . '" class="' . $active . '">' . $i . '</a>';
            }
            echo '</div><hr /></div>';
          ?>
          <!-- DYNAMIC NEWS ENDS HERE -->
        </div>

        <!-- "Twój nowy projekt" section -->
        <div class="project project-reverse">
          <img
            src="../assets/images/create.webp"
            alt=""
            class="project-img"
          />
          <div class="project-text" id="neuesP">
            <h4>Dzisiaj</h4>
            <h3>Twój nowy projekt</h3>
            <p>
              Wyobraź sobie, że Twój następny projekt staje się częścią naszej
              historii sukcesu. Razem zautomatyzujemy Twoje procesy i
              stworzymy innowacyjne rozwiązania dla Twoich linii produkcyjnych.
              Pozwól nam urzeczywistnić Twoją wizję!
            </p>
            <a href="./kontakt.html" class="btn">Zacznij teraz</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Scripts -->
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
        // Called when user clicks "Aktualności" if you want to reset to page 1
        document.getElementById("first").click();
      }
    </script>

    <script>
      // On page load, set correct page if ?page=X in URL
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

            document.querySelectorAll(".project-pagination-pages a").forEach((el) => {
              el.classList.remove("project-pagination-pages-current");
            });

            // Mark the correct page link as active
            const activePageIndicator = document.querySelector(`.project-pagination-pages a:nth-child(${pageParam})`);
            if (activePageIndicator) {
              activePageIndicator.classList.add("project-pagination-pages-current");
            }

            document.getElementById("project-container").scrollIntoView();

            // If there's a ?section= param, scroll to that section
            if (sectionParam) {
              setTimeout(() => {
                const sectionElement = document.getElementById(sectionParam);
                if (sectionElement) {
                  const offset = (10 * window.innerHeight) / 100;
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
