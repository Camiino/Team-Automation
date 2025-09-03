<?php
  require_once 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>News Dashboard</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <link rel="shortcut icon" href="../assets/icons/logoAlt.ico" type="image/x-icon" />

    <!-- CSS links -->
    <link rel="stylesheet" href="../css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="../css/subpage.css" />
    <link rel="stylesheet" href="../css/dashboard.css" />
    <link rel="stylesheet" href="../css/downloads.css" />
    <link rel="stylesheet" href="../css/kontakt.css" />

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
        font-family: "Mukta Mahee";
        letter-spacing: 1.5px;
      }

      /* Standardmäßig wird nur der aktive Block angezeigt */
      .lang-title,
      .lang-text {
        display: none;
      }
      .lang-title.active,
      .lang-text.active {
        display: block;
      }

      /* Visuelle Hervorhebung der aktiven Tabs */
      .lang-tabs .tab {
        transition: background-color 0.2s ease;
        cursor: pointer;
      }
      .lang-tabs .tab.active {
        background-color: #ccc;
      }

      /* TABS NAVIGATION (new) */
      .dashboard-tabs {
        display: flex;
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 1.5rem 0;
      }
      .dashboard-tabs .tab {
        cursor: pointer;
        padding: 0.5rem 1rem;
        background: #eee;
        border-radius: 4px;
        transition: background-color 0.2s;
      }
      .dashboard-tabs .tab.active {
        background: #ccc;
        font-weight: bold;
      }
      .tab-content {
        display: none; /* hide by default */
        margin-top: 2rem;
      }
      .tab-content.active {
        display: block; /* show active */
      }

      /* Layout-Anpassungen für die Spalten (Spalte 2: lang-wrapper und Spalte 3: text-wrapper) */
      .lang-wrapper,
      .text-wrapper {
        flex: 1;
      }
    </style>
  </head>
  <body>
    <div class="container-full bg-grey">
      <div class="container text-section">
        <div class="breadcrumb">
          <a href="../index.html">Home</a> > <a href="#">Dashboard</a>
        </div>
        <div class="sub-content">
          <div class="title">
            <h2>Dashboard</h2>
          </div>

          <!-- TABS NAV -->
          <ul class="dashboard-tabs">
            <li class="tab active" data-target="#newsTab">Neuigkeiten</li>
            <li class="tab" data-target="#karriereTab">Karriere</li>
            <li class="tab" data-target="#downloadsTab">Downloads</li>
          </ul>

          <!-- TAB 1: Original News Dashboard (unchanged) -->
          <div id="newsTab" class="tab-content active">
            <div class="content-grid" style="grid-template-columns: initial!important;">
              <!-- FORM: Submit new multi-language news -->
              <div class="form-container">
                <form class="contact-form" action="submitNews.php" method="POST" enctype="multipart/form-data">
                  <div class="row">
                    <div>
                      <label for="date">Datum:</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder="TT.MM.JJJJ"
                        pattern="\d{2}\.\d{2}\.\d{4}"
                        required
                      />
                      <small style="color: gray;">Format: TT.MM.JJJJ</small>
                    </div>
                    <div>
                      <label for="image">Bild Hochladen:</label>
                      <input type="file" id="image" name="image" required />
                    </div>
                  </div>
                  <!-- Language fields: DE, EN, PL, RU -->
                  <div class="lang-fields">
                    <!-- German -->
                    <div class="lang-column" style="margin-top: 1rem;">
                      <label for="title_de">Titel (DE):</label>
                      <input type="text" id="title_de" name="title_de" required />
                      <label for="content_de">Inhalt (DE):</label>
                      <textarea id="content_de" name="content_de" required></textarea>
                    </div>
                    <!-- English -->
                    <div class="lang-column">
                      <label for="title_en">Title (EN):</label>
                      <input type="text" id="title_en" name="title_en" required />
                      <label for="content_en">Content (EN):</label>
                      <textarea id="content_en" name="content_en" required></textarea>
                    </div>
                    <!-- Polish -->
                    <div class="lang-column">
                      <label for="title_pl">Tytuł (PL):</label>
                      <input type="text" id="title_pl" name="title_pl" required />
                      <label for="content_pl">Treść (PL):</label>
                      <textarea id="content_pl" name="content_pl" required></textarea>
                    </div>
                    <!-- Russian -->
                    <div class="lang-column">
                      <label for="title_ru">Заголовок (RU):</label>
                      <input type="text" id="title_ru" name="title_ru" required />
                      <label for="content_ru">Содержание (RU):</label>
                      <textarea id="content_ru" name="content_ru" required></textarea>
                    </div>
                  </div>
                  <button type="submit" style="margin-top:1rem;">Neuigkeit Hochladen</button>
                </form>
              </div>
              <!-- NEWS LIST: Existing News Items -->
              <div class="news-list-section" style="margin-top: 2rem;">
                <h3>Bestehende Neuigkeiten</h3>
                <div id="newsContainer" class="neuigkeiten" style="margin-top: 2rem;"></div>
              </div>
            </div>
          </div> <!-- end #newsTab -->

          <!-- TAB 2: Karriere -->
          <div id="karriereTab" class="tab-content">
            <div class="content-grid" style="grid-template-columns: initial!important;">

              <!-- 1) Karriere PDF Upload Form -->
              <div class="form-container" style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; margin: 0 auto;">
                <form class="contact-form" id="karriereForm" enctype="multipart/form-data" method="POST" action="submitKarrierePDF.php" style="width: 100%; max-width: 600px;">
                  <div style="width: 100%;">
                    <div style="width: 100%;">
                      <label for="pdf">PDF Hochladen (Stellenausschreibung):</label>
                      <input
                        type="file"
                        id="pdf"
                        name="pdf"
                        accept="application/pdf"
                        required
                        style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style="margin-top: 1rem; width: 100%; max-width: 100%; padding: 1rem; font-weight: bold; background-color: #0055aa; color: white; border: none; border-radius: 6px;">
                    Stellenausschreibung Hochladen
                  </button>
                </form>
              </div>

              <!-- 2) List of existing Stellenausschreibungen in "downloads-grid" style -->
              <h3>Bestehende Stellenausschreibungen</h3>
              <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
                <?php
                // 1) Path to PDF folder
                $dirPath = __DIR__ . '/../assets/uploads/karriere/';

                // 2) Check if folder exists
                if (!is_dir($dirPath)) {
                  echo "<p>Kein Ordner für Stellenausschreibungen gefunden.</p>";
                } else {
                  // 3) Get files
                  $files = scandir($dirPath);
                  // 4) Remove '.' and '..'
                  $files = array_diff($files, array('.', '..'));
                  // 5) Filter only PDF
                  $pdfFiles = array();
                  foreach ($files as $file) {
                    if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                      $pdfFiles[] = $file;
                    }
                  }

                  // 6) Check if no PDFs
                  if (empty($pdfFiles)) {
                    echo "<p>Derzeit keine Stellenausschreibungen vorhanden.</p>";
                  } else {
                    // 7) Display each file
                    foreach ($pdfFiles as $file) {
                      $filenameOnly = pathinfo($file, PATHINFO_FILENAME);
                      $displayName  = str_replace('_', ' ', $filenameOnly);
                      $pdfRelPath   = "../assets/uploads/karriere/$file";
                      echo "
                      <div class='row'>
                        <span>" . htmlspecialchars($displayName) . "</span>
                        <div class='icons-cont'>
                          <a href='{$pdfRelPath}' target='_blank'>
                            <img src='../assets/icons/eye-icon.svg' alt='Anzeigen' title='Anzeigen'>
                          </a>
                          <a style='margin-left: 1rem' href='javascript:void(0);' onclick='deletePDF(\"" . htmlspecialchars($file) . "\")'>
                               Löschen
                          </a>
                        </div>
                      </div>";
                    }
                  }
                }
                ?>
              </div>
              <!-- end .downloads-grid -->

            </div><!-- end .content-grid -->
          </div><!-- end #karriereTab -->

          <!-- TAB 3: Downloads -->
          <div id="downloadsTab" class="tab-content">
            <div class="content-grid" style="grid-template-columns: initial!important;">

              <!-- Upload form for general Downloads PDFs -->
              <div class="form-container" style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; margin: 0 auto;">
                <form class="contact-form" id="downloadsForm" enctype="multipart/form-data" method="POST" action="submitDownloadsPDF.php" style="width: 100%; max-width: 600px;">
                  <div style="width: 100%;">
                    <div style="width: 100%;">
                      <label for="download_pdf">PDF Hochladen (Downloads):</label>
                      <input
                        type="file"
                        id="download_pdf"
                        name="pdf"
                        accept="application/pdf"
                        required
                        style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style="margin-top: 1rem; width: 100%; max-width: 100%; padding: 1rem; font-weight: bold; background-color: #0055aa; color: white; border: none; border-radius: 6px;">
                    Download-PDF hochladen
                  </button>
                </form>
              </div>

              <h3>Bestehende Downloads</h3>
              <div class="container downloads-grid" style="padding: 0 !important; grid-template-rows: 1fr; margin: 0 auto; margin-bottom: 2rem; width:80%;">
                <?php
                $dlDirPath = __DIR__ . '/../assets/uploads/downloads/';
                if (!is_dir($dlDirPath)) {
                  echo "<p>Kein Ordner für Downloads gefunden.</p>";
                } else {
                  $files = scandir($dlDirPath);
                  $files = array_diff($files, array('.', '..'));
                  $pdfFiles = array();
                  foreach ($files as $file) {
                    if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'pdf') {
                      $pdfFiles[] = $file;
                    }
                  }
                  if (empty($pdfFiles)) {
                    echo "<p>Derzeit keine Downloads vorhanden.</p>";
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
                            <img src='../assets/icons/eye-icon.svg' alt='Anzeigen' title='Anzeigen'>
                          </a>
                          <a style='margin-left: 1rem' href='javascript:void(0);' onclick='deleteDownload(\"" . htmlspecialchars($file) . "\")'>
                               Löschen
                          </a>
                        </div>
                      </div>";
                    }
                  }
                }
                ?>
              </div>

            </div><!-- end .content-grid -->
          </div><!-- end #downloadsTab -->

        </div><!-- end .sub-content -->
      </div><!-- end container text-section -->
    </div><!-- end container-full bg-grey -->
    
    <script>
      async function deletePDF(filename) {
        if (!confirm("Möchten Sie diese Stellenausschreibung wirklich löschen?")) return;
        try {
          const response = await fetch('deletePDF.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'file=' + encodeURIComponent(filename)
          });
          const result = await response.text();
          alert(result);
          // Reload the page or update the UI accordingly
          location.reload();
        } catch (error) {
          console.error("Fehler beim Löschen der PDF:", error);
        }
      }
    </script>


    <script>
      async function deleteDownload(filename) {
        if (!confirm("Möchten Sie diesen Download wirklich löschen?")) return;
        try {
          const response = await fetch('deleteDownload.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'file=' + encodeURIComponent(filename)
          });
          const result = await response.text();
          alert(result);
          location.reload();
        } catch (error) {
          console.error("Fehler beim Löschen der PDF:", error);
        }
      }

      // Datumseingabe validieren (TT.MM.JJJJ)
      document.querySelector('form').addEventListener('submit', function(e) {
        const dateInput = document.getElementById('date');
        const dateValue = dateInput.value.trim();
        const regex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!regex.test(dateValue)) {
          e.preventDefault();
          alert("Bitte gib das Datum im Format TT.MM.JJJJ ein.");
          dateInput.focus();
        }
      });
      
      // Hilfsfunktion zum Escapen von HTML
      function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
      }
      
      async function loadNews() {
        try {
          // Erwartet werden Felder: title_de, content_de, title_en, content_en, title_pl, content_pl, title_ru, content_ru, date, image_path, id
          const response = await fetch('../getNews.php');
          const news = await response.json();
          const container = document.getElementById('newsContainer');
          container.innerHTML = '';

          if (!news || news.length === 0) {
            container.innerHTML = '<p>Keine Neuigkeiten vorhanden.</p>';
            return;
          }

          news.forEach(item => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.style = "border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem; border-radius: 8px;";

            // Optionales Bild
            let imageHTML = '';
            if (item.image_path) {
              imageHTML = `
                <img
                  src="${item.image_path}"
                  alt="${escapeHTML(item.title_de || 'News-Image')}"
                  style="width: 30%; display:block; height: auto; border-radius: 8px; object-fit: fill;"
                />
              `;
            }

            // News-Card in 3 Spalten
            card.innerHTML = `
              <div class="content" style="display: flex; flex-direction: row; gap: 2rem;">
                
                ${imageHTML}
                
                <!-- Spalte 2: Datum, Titel, Tab-Navigation, Buttons -->
                <div class="content-wrapper">
                  <div class="lang-wrapper">
                    <div style="display:flex;flex-direction:column;align-items:start;">
                      <h4>Datum: ${escapeHTML(item.date)}</h4>
                      <div class="lang-title de active">
                        <h4 style="text-align:left;margin-top:1rem;">Titel (DE): <span class="news-title">${escapeHTML(item.title_de)}</span></h4>
                      </div>
                      <div class="lang-title en">
                        <h4 style="text-align:left;margin-top:1rem;">Title (EN): <span class="news-title">${escapeHTML(item.title_en)}</span></h4>
                      </div>
                      <div class="lang-title pl">
                        <h4 style="text-align:left;margin-top:1rem;">Tytuł (PL): <span class="news-title">${escapeHTML(item.title_pl)}</span></h4>
                      </div>
                      <div class="lang-title ru">
                        <h4 style="text-align:left;margin-top:1rem;">Заголовок (RU): <span class="news-title">${escapeHTML(item.title_ru)}</span></h4>
                      </div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:start;">
                      <!-- Tab-Navigation -->
                      <ul class="lang-tabs" style="display: flex; list-style: none; padding: 0; gap: 10px; margin: 1rem 0;">
                        <li class="tab active" data-lang="de" style="padding: 5px 10px; border: 1px solid #ccc; border-radius: 4px;">DE</li>
                        <li class="tab" data-lang="en" style="padding: 5px 10px; border: 1px solid #ccc; border-radius: 4px;">EN</li>
                        <li class="tab" data-lang="pl" style="padding: 5px 10px; border: 1px solid #ccc; border-radius: 4px;">PL</li>
                        <li class="tab" data-lang="ru" style="padding: 5px 10px; border: 1px solid #ccc; border-radius: 4px;">RU</li>
                      </ul>
                      
                      <div class="button-group" style="margin-top: 10px;">
                        <button class="edit-btn" onclick="toggleEdit(this, ${item.id})" style="background: #2980b9; color: white; border: none; padding: 8px 12px; border-radius: 4px; margin-right: 10px;">Bearbeiten</button>
                        <button onclick="deleteNews(${item.id})" style="background: #c0392b; color: white; border: none; padding: 8px 12px; border-radius: 4px;">Löschen</button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Spalte 3: Inhalt -->
                  <div class="text-wrapper">
                    <div class="lang-text de active">
                      <p class="content-header" style="text-align:left;font-weight: bold;">Inhalt:</p>
                      <p class="neuigkeit-text" style="text-align:left;">${escapeHTML(item.content_de)}</p>
                    </div>
                    <div class="lang-text en">
                      <p class="content-header" style="text-align:left;font-weight: bold;">Content:</p>
                      <p class="neuigkeit-text"style="text-align:left;">${escapeHTML(item.content_en)}</p>
                    </div>
                    <div class="lang-text pl">
                      <p class="content-header" style="text-align:left;font-weight: bold;">Treść:</p>
                      <p class="neuigkeit-text"style="text-align:left;">${escapeHTML(item.content_pl)}</p>
                    </div>
                    <div class="lang-text ru">
                      <p class="content-header" style="text-align:left;font-weight: bold;">Содержание:</p>
                      <p class="neuigkeit-text"style="text-align:left;">${escapeHTML(item.content_ru)}</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
            container.appendChild(card);
          });

          // language tab switching
          document.querySelectorAll('.lang-tabs .tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
              const card = this.closest('.news-card');
              if (card.querySelector('.edit-title-input, .edit-content-textarea')) {
                alert("Bitte speichern oder brechen Sie Ihre Änderungen ab, bevor Sie den Tab wechseln.");
                e.preventDefault();
                return;
              }
              const selectedLang = this.getAttribute("data-lang");
              card.querySelectorAll('.lang-tabs .tab').forEach(t => t.classList.remove('active'));
              this.classList.add('active');

              card.querySelectorAll('.lang-title').forEach(titleEl => {
                titleEl.classList.remove('active');
                if (titleEl.classList.contains(selectedLang)) {
                  titleEl.classList.add('active');
                }
              });
              card.querySelectorAll('.lang-text').forEach(textEl => {
                textEl.classList.remove('active');
                if (textEl.classList.contains(selectedLang)) {
                  textEl.classList.add('active');
                }
              });
            });
          });
        } catch (err) {
          console.error("Fehler beim Laden der Neuigkeiten:", err);
        }
      }
      
      function toggleEdit(btn, newsId) {
        const card = btn.closest('.news-card');
        const activeTab = card.querySelector('.lang-tabs .tab.active');
        if (!activeTab) {
          alert("Kein aktiver Sprachtab gefunden.");
          return;
        }
        const lang = activeTab.getAttribute("data-lang");

        const activeTitleDiv = card.querySelector('.lang-wrapper .lang-title.active');
        const activeTextDiv = card.querySelector('.text-wrapper .lang-text.active');

        // Prüfen, ob schon Eingabefelder existieren
        const titleInput = activeTitleDiv.querySelector('.edit-title-input');
        const contentTextarea = activeTextDiv.querySelector('.edit-content-textarea');

        if (!titleInput && !contentTextarea) {
          // Noch nicht im Bearbeitungsmodus: Eingabefelder einfügen
          const currentTitle = activeTitleDiv.querySelector('.news-title').textContent;
          const currentContent = activeTextDiv.querySelector('.neuigkeit-text').textContent;

          const inputTitle = document.createElement('input');
          inputTitle.type = 'text';
          inputTitle.className = 'edit-title-input';
          inputTitle.value = currentTitle;
          inputTitle.style.padding = '4px';
          inputTitle.style.fontSize = '1em';
          inputTitle.style.display = 'inline-block';
          inputTitle.style.whiteSpace = 'nowrap';
          inputTitle.style.overflow = 'hidden';
          inputTitle.style.textOverflow = 'ellipsis';
          inputTitle.style.boxSizing = 'border-box';

          const textareaContent = document.createElement('textarea');
          textareaContent.className = 'edit-content-textarea';
          textareaContent.value = currentContent;
          textareaContent.style.width = '100%';
          textareaContent.style.boxSizing = 'border-box';

          // Ersetze Texte mit Inputfeldern
          activeTitleDiv.querySelector('.news-title').replaceWith(inputTitle);
          activeTextDiv.querySelector('.neuigkeit-text').replaceWith(textareaContent);

          btn.textContent = 'Speichern';
          inputTitle.focus();
        } else {
          // Bearbeitungsmodus aktiv: Neue Werte übernehmen und speichern
          const inputTitle = activeTitleDiv.querySelector('.edit-title-input');
          const textareaContent = activeTextDiv.querySelector('.edit-content-textarea');

          if (!inputTitle || !textareaContent) {
            alert("Bearbeitungsfelder nicht gefunden.");
            return;
          }

          const newTitle = inputTitle.value;
          const newContent = textareaContent.value;

          updateNewsData(newsId, lang, newTitle, newContent)
            .then(() => {
              // Zurück zu statischem Text
              const spanTitle = document.createElement('span');
              spanTitle.className = 'news-title';
              spanTitle.textContent = newTitle;
              inputTitle.replaceWith(spanTitle);

              const pContent = document.createElement('p');
              pContent.className = 'neuigkeit-text';
              pContent.style.textAlign = 'left';
              pContent.textContent = newContent;
              textareaContent.replaceWith(pContent);

              btn.textContent = 'Bearbeiten';
            })
            .catch(err => {
              console.error("Fehler beim Aktualisieren der News:", err);
              alert("Aktualisierung fehlgeschlagen.");
            });
        }
      }

      
      async function updateNewsData(newsId, lang, newTitle, newContent) {
        const response = await fetch('updateNews.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `id=${encodeURIComponent(newsId)}&lang=${encodeURIComponent(lang)}&title=${encodeURIComponent(newTitle)}&content=${encodeURIComponent(newContent)}`
        });
        return await response.text();
      }
      
      async function deleteNews(id) {
        if (!confirm("Willst du diese Neuigkeit wirklich löschen?")) return;
        try {
          const response = await fetch('deleteNews.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${encodeURIComponent(id)}`
          });
          const result = await response.text();
          alert(result);
          loadNews();
        } catch (err) {
          console.error("Fehler beim Löschen:", err);
        }
      }
      
      document.addEventListener("DOMContentLoaded", loadNews);
    </script>
    
    <!-- Externe JS-Skripte -->
    <script src="../js/script.js?v=1.1"></script>
    <!-- Falls du dynamic_insert_all.js nicht mehr brauchst, kannst du diesen Tag entfernen -->
    <!-- <script src="../js/dynamic_insert_all.js"></script> -->
    <script src="../js/swiper-bundle.min.js?v=1.1"></script>
    <script>
      var swiper = new Swiper(".imgSwiper", {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    </script>

    <div id="success-popup" class="popup hidden">
      <div class="popup-inner">
        <p>Ihre Angaben wurden gespeichert!</p>
        <button onclick="hidePopup()">Schließen</button>
      </div>
    </div>

    <script>
      const form = document.querySelector("form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const response = await fetch("./submitNews.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          form.reset();
          showPopup();
        } else {
          alert(await response.text()); // Optional: show error
        }
      });

      function showPopup() {
        const popup = document.getElementById("success-popup");
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 5000);
      }

      function hidePopup() {
        document.getElementById("success-popup").classList.add("hidden");
      }

      // Tab switching logic (new)
      const tabBtns = document.querySelectorAll('.dashboard-tabs .tab');
      const tabContents = document.querySelectorAll('.tab-content');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          tabContents.forEach(tc => tc.classList.remove('active'));
          const sel = btn.getAttribute('data-target');
          document.querySelector(sel).classList.add('active');
        });
      });
    </script>
  </body>
</html>
