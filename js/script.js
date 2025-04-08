document.addEventListener('commonSectionsLoaded', function () {
    const hamburger = document.getElementById("hamburger");

    window.addEventListener("scroll", function () {
    closeDropdown();
    });

    /* ------------- Menu ------------- */

    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");

    (function() {
        const keys = {37: 1, 38: 1, 39: 1, 40: 1};
      
        function preventDefault(e) {
          if (e.preventDefault) e.preventDefault();
          e.returnValue = false;
        }
        
        function preventDefaultForScrollKeys(e) {
          if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
          }
        }
        
        let supportsPassive = false;
        try {
          window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function () { supportsPassive = true; }
          }));
        } catch (e) {}
        
        const wheelOpt = supportsPassive ? { passive: false } : false;
        const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
        
        window.disableScroll = function() {
          window.addEventListener("DOMMouseScroll", preventDefault, false); // older Firefox
          window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
          window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
          window.addEventListener("keydown", preventDefaultForScrollKeys, false);
        };
        
        window.enableScroll = function() {
          window.removeEventListener("DOMMouseScroll", preventDefault, false);
          window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
          window.removeEventListener("touchmove", preventDefault, wheelOpt);
          window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
        };
      })();

    burger.addEventListener("change", () => {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            enableScroll(); // Enable scrolling
        } else {
            menu.classList.add("open");
            disableScroll(); // Disable scrolling
        
        if (searchContainer.classList.contains("active")) {
            searchContainer.classList.remove("active");
        }
        }      
    closeDropdown();
    });

    burger.addEventListener("change", () => {
    if (burger.checked) {
        hamburger.classList.add("checked");
    } else {
        hamburger.classList.remove("checked");
    }
    });

    function resetMenuState() {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");

    if (burger.checked) {
        burger.checked = false; // Uncheck the burger checkbox
        menu.classList.remove("open");
        document.body.style.overflow = "auto";
    }
    }

    // Run when the page loads (including after navigating back)
    window.addEventListener("pageshow", resetMenuState);


    /* ------------- Search ------------- */

    const searchBox = document.querySelectorAll(".search-box");
    const searchContainer = document.querySelector(".search-container");

    searchBox.forEach((box) => {
    box.addEventListener("click", () => {
        if (searchContainer.classList.contains("active")) {
            searchContainer.classList.remove("active");
            enableScroll(); // Enable scrolling
        } else {
            searchContainer.classList.add("active");
            disableScroll(); // Disable scrolling
            if (menu.classList.contains("open")) {
            burger.click();
            }
        }   
    });
    });

    searchContainer.addEventListener("mousedown", (e) => {
        if (e.target === searchContainer) {
        searchContainer.classList.remove("active");
        enableScroll(); // Enable scrolling again
        }
    });  
    

    /* ------------- Language ------------- */

    const language = document.querySelectorAll(".language");
    const languageDropdown = document.querySelectorAll(".language-dropdown");

    language.forEach((lang) => {
    lang.addEventListener("click", () => {
        languageDropdown.forEach((dropdown) => {
        if (dropdown !== lang.nextElementSibling) {
            dropdown.classList.remove("active");
        }
        });
        lang.nextElementSibling.classList.toggle("active");
    });
    });

    function closeDropdown() {
    languageDropdown.forEach((dropdown) => {
        dropdown.classList.remove("active");
    });
    }
});


    /* ------------- Zoom ------------- */
    /*window.onload = function () {
    document.body.style.zoom = "100%";
    }*/

    let smallScreenWarningShown = false;

    function checkScreenSize() {
        if (window.innerWidth < 340) {
            if (!smallScreenWarningShown) {
                document.body.innerHTML = "<p id='warning-message'>Diese Bildschirmgröße wird leider nicht unterstützt. Bitte nutzen Sie ein größeres Gerät, um die Seite weiterhin zu verwenden.</p>";
                document.body.style.cssText = `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                    padding: 1rem;
                    background-color: #f8f8f8;
                    color: #333;
                `;
                smallScreenWarningShown = true;
            }
        } else {
            if (smallScreenWarningShown) {
                location.reload(); // Reload only once when moving back to a larger screen
            }
        }
    }

    // Initial check when the page loads
    checkScreenSize();

    // Listen for window resize events
    window.addEventListener("resize", checkScreenSize);


    /*-----------Scroll Animations------------*/

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    function checkVisibility() {
        const elements = document.querySelectorAll('.animated-item');
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                // Force a reflow to ensure Safari registers the style change
                void el.offsetWidth;
                el.classList.add('flyIn');
            }
        });
    
        lastScrollY = currentScrollY;
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Run an initial visibility check immediately
        checkVisibility();
        // Listen to scroll events
        window.addEventListener('scroll', checkVisibility);
    });


    /*---------------Search----------*/

    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.querySelector(".search-container input");
        const searchContainer = document.querySelector(".search-container");
        const searchTrigger = document.querySelector(".search-box"); // The button/icon that opens search

        // 1) Detect language: if the current URL includes "/html_pl/", we assume Polish; otherwise German.
        const isPolish = window.location.href.includes("/html_pl/");

        // 2) Base URLs for each language version
        const baseUrlGerman = "https://bee-its.de/html/";
        const baseUrlPolish = "https://bee-its.de/html_pl/";

        // 3) Full set of German suggestions
        const searchSuggestionsDe = [
            // Main pages
            { name: "Aktuelles", url: baseUrlGerman + "neuigkeit.html" },
            { name: "Karriere", url: baseUrlGerman + "karriere.html" },
            { name: "Downloads", url: baseUrlGerman + "downloads.html" },
            { name: "Kontakt", url: baseUrlGerman + "kontakt.html" },
            { name: "Leistungsportfolio", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Anlagen", url: baseUrlGerman + "anlagen.html" },
            { name: "Prozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Branchen", url: baseUrlGerman + "branchen.html" },
            { name: "Partner", url: baseUrlGerman + "partner.html" },
            { name: "Unternehmen", url: baseUrlGerman + "unternehmen.html" },
            { name: "Impressum", url: baseUrlGerman + "impressum.html" },
            // Additional
            { name: "Beispiele", url: baseUrlGerman + "anlagen/halbautomatisch.html" },

            // Branchen
            { name: "Automobilindustrie", url: baseUrlGerman + "branchen/automobilindustrie.html" },
            { name: "Chemie", url: baseUrlGerman + "branchen/chemie.html" },
            { name: "Elektronik", url: baseUrlGerman + "branchen/elektronik.html" },
            { name: "Nutzfahrzeug", url: baseUrlGerman + "branchen/nutzfahrzeug.html" },
            { name: "Sicherheitstechnik", url: baseUrlGerman + "branchen/sicherheitstechnik.html" },

            // Anlagen
            { name: "Manuelle Arbeitsplätze", url: baseUrlGerman + "anlagen/manuell.html" },
            { name: "Halbautomatische Anlagen", url: baseUrlGerman + "anlagen/halbautomatisch.html" },
            { name: "Vollautomatische Anlagen", url: baseUrlGerman + "anlagen/vollautomatisch.html" },

            // Leistungsportfolio
            { name: "After-Sales", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Konzeption", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Projektrealisierung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "MTM-Analysen", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Prozessoptimierungen", url: baseUrlGerman + "leistungsportfolio.html" },

            { name: "Konzeption & Planung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Machbarkeitsanalysen", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Taktzeit- und Verfügbarkeitsanalysen", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Prozess- und Fertigungskonzeptionen", url: baseUrlGerman + "leistungsportfolio.html" },

            { name: "Projektrealisierung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Mechanische Konstruktion", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Elektrische und pneumatische Planung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Schaltschrankbau und Verkabelung/Verschlauchung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Programmierung und Inbetriebnahme", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Montage, Auslieferung und Aufstellung", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Roboter-Programmierung", url: baseUrlGerman + "leistungsportfolio.html" },

            { name: "After-Sales", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Dokumentation", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Anlagen und Typenerweiterungen", url: baseUrlGerman + "leistungsportfolio.html" },
            { name: "Service und Wartung", url: baseUrlGerman + "leistungsportfolio.html" },

            // Prozesse
            { name: "Bearbeitungsprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Bördeltechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Spulenwickeltechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Dosier- und Vergießtechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Plasmareinigung und -beschichtung", url: baseUrlGerman + "prozesse.html" },
            { name: "Markier- und Beschriftungstechnik", url: baseUrlGerman + "prozesse.html" },

            { name: "Lötprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Induktives Löten", url: baseUrlGerman + "prozesse.html" },
            { name: "Lichtlöten", url: baseUrlGerman + "prozesse.html" },
            { name: "Widerstandslöten", url: baseUrlGerman + "prozesse.html" },
            { name: "Laserlöten", url: baseUrlGerman + "prozesse.html" },

            { name: "Montageprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Fügevorgänge mit Kraft-Weg-Überwachung", url: baseUrlGerman + "prozesse.html" },
            { name: "Koordinaten-Servo-Schraubtechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Nietprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Manuelle Montageprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Verpackungssysteme", url: baseUrlGerman + "prozesse.html" },

            { name: "Prüfprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Funktionsprüfung", url: baseUrlGerman + "prozesse.html" },
            { name: "Komplette Testvorrichtungen und Endprüfstände", url: baseUrlGerman + "prozesse.html" },
            { name: "Mechanische Prüfverfahren", url: baseUrlGerman + "prozesse.html" },
            { name: "Optische Prüfverfahren", url: baseUrlGerman + "prozesse.html" },
            { name: "Durchfluss- und Dichtheitsprüfungen", url: baseUrlGerman + "prozesse.html" },

            { name: "Schweißprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Laserschweißtechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Ultraschallschweißen", url: baseUrlGerman + "prozesse.html" },
            { name: "Widerstandsschweißen", url: baseUrlGerman + "prozesse.html" },
            { name: "Reibschweißen", url: baseUrlGerman + "prozesse.html" },
            { name: "Thermokompressionsschweißen", url: baseUrlGerman + "prozesse.html" },

            { name: "Zuführprozesse", url: baseUrlGerman + "prozesse.html" },
            { name: "Transportbandsysteme", url: baseUrlGerman + "prozesse.html" },
            { name: "Palettier-Systeme", url: baseUrlGerman + "prozesse.html" },
            { name: "Robotertechnik", url: baseUrlGerman + "prozesse.html" },
            { name: "Linear- und Radialzuführsysteme", url: baseUrlGerman + "prozesse.html" },

            // Subanlagen > Pumpen
            { name: "Pumpen", url: baseUrlGerman + "anlagen/halbautomatisch.html" },
            { name: "Hydraulische Flügelpumpen", url: baseUrlGerman + "anlagen/halbautomatisch.html" },
            { name: "Ölpumpen", url: baseUrlGerman + "anlagen/halbautomatisch.html" },

            // Subanlagen > Ventile
            { name: "Elektrische Umschaltventile", url: baseUrlGerman + "anlagen/vollautomatisch.html" },
            { name: "Ölschaltventile", url: baseUrlGerman + "anlagen/vollautomatisch.html" },
            { name: "Schubumluftventile", url: baseUrlGerman + "anlagen/vollautomatisch.html" },
            { name: "Abgasregelsysteme", url: baseUrlGerman + "anlagen/vollautomatisch.html" },
            { name: "Ventile", url: baseUrlGerman + "anlagen/vollautomatisch.html" },
            { name: "Rauchmelder", url: baseUrlGerman + "anlagen/subanlagen/rauchmelder.html" },
        ];

        // 4) Full set of Polish suggestions
        const searchSuggestionsPl = [
            // Główne strony
            { name: "Aktualności", url: baseUrlPolish + "neuigkeit.html" },
            { name: "Kariera", url: baseUrlPolish + "karriere.html" },
            { name: "Do pobrania", url: baseUrlPolish + "downloads.html" },
            { name: "Kontakt", url: baseUrlPolish + "kontakt.html" },
            { name: "Usługi", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Instalacje", url: baseUrlPolish + "anlagen.html" },
            { name: "Procesy", url: baseUrlPolish + "prozesse.html" },
            { name: "Branże", url: baseUrlPolish + "branchen.html" },
            { name: "Partnerzy", url: baseUrlPolish + "partner.html" },
            { name: "Firma", url: baseUrlPolish + "unternehmen.html" },
            { name: "Impressum", url: baseUrlPolish + "impressum.html" },
            // Dodatkowe
            { name: "Przykłady", url: baseUrlPolish + "anlagen/halbautomatisch.html" },

            // Branże
            { name: "Przemysł motoryzacyjny", url: baseUrlPolish + "branchen/automobilindustrie.html" },
            { name: "Branża chemiczna", url: baseUrlPolish + "branchen/chemie.html" },
            { name: "Elektronika", url: baseUrlPolish + "branchen/elektronik.html" },
            { name: "Pojazdy użytkowe", url: baseUrlPolish + "branchen/nutzfahrzeug.html" },
            { name: "Technika bezpieczeństwa", url: baseUrlPolish + "branchen/sicherheitstechnik.html" },

            // Instalacje
            { name: "Stanowiska manualne", url: baseUrlPolish + "anlagen/manuell.html" },
            { name: "Instalacje półautomatyczne", url: baseUrlPolish + "anlagen/halbautomatisch.html" },
            { name: "Instalacje w pełni automatyczne", url: baseUrlPolish + "anlagen/vollautomatisch.html" },

            // Usługi (Leistungsportfolio)
            { name: "After-Sales", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Koncepcja i planowanie", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Projektrealisierung", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "MTM-Analizy", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Optymalizacje procesów", url: baseUrlPolish + "leistungsportfolio.html" },

            { name: "Machbarkeitsanalizy", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Taktzeit- i analizy dostępności", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Projekty i koncepcje produkcji", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Konstrukcja mechaniczna", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Planowanie elektryczne i pneumatyczne", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Budowa szaf sterowniczych i okablowanie", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Programowanie i uruchomienie", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Montaż, dostawa i ustawienie", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Programowanie robotów", url: baseUrlPolish + "leistungsportfolio.html" },

            { name: "Dokumentacja", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Rozbudowy instalacji i typów", url: baseUrlPolish + "leistungsportfolio.html" },
            { name: "Serwis i konserwacja", url: baseUrlPolish + "leistungsportfolio.html" },

            // Procesy
            { name: "Bördeltechnik (Zaciskanie)", url: baseUrlPolish + "prozesse.html" },
            { name: "Technika nawijania cewek", url: baseUrlPolish + "prozesse.html" },
            { name: "Techniki dozowania i zalewania", url: baseUrlPolish + "prozesse.html" },
            { name: "Czyszczenie i powlekanie plazmowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Techniki znakowania i opisywania", url: baseUrlPolish + "prozesse.html" },

            { name: "Lutowanie indukcyjne", url: baseUrlPolish + "prozesse.html" },
            { name: "Lutowanie światłem", url: baseUrlPolish + "prozesse.html" },
            { name: "Lutowanie oporowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Lutowanie laserowe", url: baseUrlPolish + "prozesse.html" },

            { name: "Procesy montażowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Złącza z kontrolą siły i drogi", url: baseUrlPolish + "prozesse.html" },
            { name: "Serwo-technika wkręcania", url: baseUrlPolish + "prozesse.html" },
            { name: "Nitowanie", url: baseUrlPolish + "prozesse.html" },
            { name: "Manualne procesy montażowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Systemy pakowania", url: baseUrlPolish + "prozesse.html" },

            { name: "Procesy testowe i kontrolne", url: baseUrlPolish + "prozesse.html" },
            { name: "Test funkcjonalny", url: baseUrlPolish + "prozesse.html" },
            { name: "Kompletne stanowiska testowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Mechaniczne metody testowania", url: baseUrlPolish + "prozesse.html" },
            { name: "Optyczne metody testowania", url: baseUrlPolish + "prozesse.html" },
            { name: "Testy przepływu i szczelności", url: baseUrlPolish + "prozesse.html" },

            { name: "Procesy spawalnicze", url: baseUrlPolish + "prozesse.html" },
            { name: "Spawanie laserowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Spawanie ultradźwiękowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Spawanie oporowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Spawanie tarciowe", url: baseUrlPolish + "prozesse.html" },
            { name: "Spawanie termokompresyjne", url: baseUrlPolish + "prozesse.html" },

            { name: "Procesy podawcze", url: baseUrlPolish + "prozesse.html" },
            { name: "Systemy taśm transportujących", url: baseUrlPolish + "prozesse.html" },
            { name: "Systemy paletyzujące", url: baseUrlPolish + "prozesse.html" },
            { name: "Technika robotów", url: baseUrlPolish + "prozesse.html" },
            { name: "Systemy podawania liniowego i promieniowego", url: baseUrlPolish + "prozesse.html" },

            // Pod-instalacje > Pompy
            { name: "Pompy", url: baseUrlPolish + "anlagen/halbautomatisch.html" },
            { name: "Hydrauliczne pompy skrzydełkowe", url: baseUrlPolish + "anlagen/halbautomatisch.html" },
            { name: "Pompy olejowe", url: baseUrlPolish + "anlagen/halbautomatisch.html" },

            // Pod-instalacje > Zawory
            { name: "Elektryczne zawory przełączające", url: baseUrlPolish + "anlagen/vollautomatisch.html" },
            { name: "Zawory olejowe", url: baseUrlPolish + "anlagen/vollautomatisch.html" },
            { name: "Zawory spalinowe", url: baseUrlPolish + "anlagen/vollautomatisch.html" },
            { name: "Systemy regulacji spalin", url: baseUrlPolish + "anlagen/vollautomatisch.html" },
            { name: "Zawory", url: baseUrlPolish + "anlagen/vollautomatisch.html" },
            { name: "Czujniki dymu (Rauchmelder)", url: baseUrlPolish + "anlagen/subanlagen/rauchmelder.html" },
        ];

        // 5) Choose the correct array based on language detection
        const searchSuggestions = isPolish ? searchSuggestionsPl : searchSuggestionsDe;

        // Create a suggestions container dynamically
        const suggestionsBox = document.createElement("ul");
        suggestionsBox.classList.add("search-suggestions");
        searchContainer.appendChild(suggestionsBox);

        // Basic styling for the suggestions box
        suggestionsBox.style.background = "transparent";
        suggestionsBox.style.color = "white";
        suggestionsBox.style.width = searchInput.offsetWidth + "px";
        suggestionsBox.style.maxHeight = "80%";
        suggestionsBox.style.overflowY = "auto";
        suggestionsBox.style.listStyle = "none";
        suggestionsBox.style.padding = "5px";
        suggestionsBox.style.margin = "3rem auto";
        suggestionsBox.style.display = "none";
        suggestionsBox.style.zIndex = "10000";

        // Filter suggestions by the user query
        function filterSuggestions(query) {
            return searchSuggestions.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Update the suggestions list
        function updateSuggestions() {
            const query = searchInput.value.trim();
            suggestionsBox.innerHTML = "";

            if (query.length === 0) {
                suggestionsBox.style.display = "none";
                return;
            }

            const filtered = filterSuggestions(query).slice(0, 7); // Limit to 7 results

            filtered.forEach(suggestion => {
                const li = document.createElement("li");
                li.textContent = suggestion.name;
                li.style.padding = "8px";
                li.style.cursor = "pointer";
                li.style.borderBottom = "1px solid #888";
                li.style.color = "#444444";
                li.style.fontSize = "1.5rem";
                li.style.listStyle = "none";

                li.addEventListener("mouseover", () => {
                    li.style.background = "#2a7af3";
                    li.style.color = "white";
                });
                li.addEventListener("mouseout", () => {
                    li.style.background = "transparent";
                    li.style.color = "#444444";
                });
                li.addEventListener("click", () => {
                    window.location.href = suggestion.url;
                });

                suggestionsBox.appendChild(li);
            });

            suggestionsBox.style.display = filtered.length > 0 ? "block" : "none";
        }

        // Listen to user input
        searchInput.addEventListener("input", updateSuggestions);

        // Hide suggestions when clicking outside the search container
        document.addEventListener("click", (e) => {
            if (!searchContainer.contains(e.target)) {
                suggestionsBox.style.display = "none";
            }
        });

        // Open the search field on trigger (e.g., magnifying glass click)
        searchTrigger.addEventListener("click", openSearch);
        function openSearch() {
            searchContainer.classList.add("active"); // Show the search overlay/container
            searchInput.focus(); // Auto-focus the input
        }
    });




    /*------------Cookies-------------*/

    document.addEventListener("DOMContentLoaded", async function () {
        // 1) Detect language
        const isPolish = window.location.href.includes("/html_pl/") || window.location.href.includes("index_pl.html");
    
        // 2) Prepare text for each language
        const texts = {
          de: {
            heading: "Essenzielle & Optionale Cookies",
            message: `Auf dieser Website nutzen wir Cookies zur Verarbeitung von Endgeräteinformationen. Die Verarbeitung dient der Gewährleistung grundlegender Funktionen und der Einbindung externer Inhalte und Dienste Dritter (z. B. Google Fonts, YouTube, Google Maps). Je nach Funktion können dabei Daten an Dritte weitergegeben und dort verarbeitet werden. Mehr Informationen hierzu finden Sie im <a href="https://bee-its.de/TeamCopy/html/impressum.html" style="color: #e5e5e5;">Impressum</a>.<br><br>Sie können Ihre Zustimmung jederzeit ändern oder widerrufen.`,
            essentialLabel: "Essenziell",
            marketingLabel: "Marketing",
            marketingTooltip: "YouTube, Google Maps",
            analyticsLabel: "Analytics (Google Analytics)",
            acceptAllBtn: "Alle Akzeptieren",
            rejectAllBtn: "Optionale Ablehnen",
            saveSettingsBtn: "Einstellungen Speichern",
            cookieSvgColor: "#e5e5e5"
          },
          pl: {
            heading: "Niezbędne i opcjonalne pliki cookie",
            message: `Na tej stronie używamy plików cookie do przetwarzania informacji na temat urządzeń końcowych. Przetwarzanie służy zapewnieniu podstawowych funkcji oraz integracji zewnętrznych treści i usług firm trzecich (np. Google Fonts, YouTube, Google Maps). W zależności od funkcji, dane mogą być przekazywane osobom trzecim i tam przetwarzane. Więcej informacji znajdziesz w <a href="https://bee-its.de/TeamCopy/html/impressum.html" style="color: #e5e5e5;">Impressum</a>.<br><br>Możesz w każdej chwili zmienić lub wycofać swoją zgodę.`,
            essentialLabel: "Niezbędne",
            marketingLabel: "Marketing",
            marketingTooltip: "YouTube, Google Maps",
            analyticsLabel: "Analityka (Google Analytics)",
            acceptAllBtn: "Zaakceptuj wszystkie",
            rejectAllBtn: "Odrzuć opcjonalne",
            saveSettingsBtn: "Zapisz ustawienia",
            cookieSvgColor: "#e5e5e5"
          }
        };
    
        // 3) Pick the current language text
        const langText = isPolish ? texts.pl : texts.de;
    
        // 4) Insert the banner HTML with placeholders replaced
        document.body.insertAdjacentHTML("beforeend", `
          <div id="cookie-banner" class="cookie-banner border">
            <div id="cookie-bubble" class="cookie-bubble">
              <!-- cookie icon with the language color, if needed -->
              <svg fill="${langText.cookieSvgColor}" width="40px" height="40px" viewBox="0 0 24 24" id="cookie" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color">
                <line x1="9.05" y1="9.5" x2="8.95" y2="9.5" style="fill: none; stroke: ${langText.cookieSvgColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                <line x1="9.55" y1="15" x2="9.45" y2="15" style="fill: none; stroke: ${langText.cookieSvgColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                <line x1="14.55" y1="14" x2="14.45" y2="14" style="fill: none; stroke: ${langText.cookieSvgColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                <path d="M18.12,9.78a3,3,0,0,1-3.9-3.9A3,3,0,0,1,12,3a9,9,0,1,0,9,9A3,3,0,0,1,18.12,9.78Z" style="fill: none; stroke: ${langText.cookieSvgColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
              </svg>
            </div>
            <div id="cookie-content" class="cookie-content">
                <p>${langText.message}</p>
    
                <div id="cookie-settings">
                    <label>
                      <input type="checkbox" id="essential" disabled checked> ${langText.essentialLabel}
                    </label>
                    <br>
                    
                    <label class="tooltip">
                        <input type="checkbox" id="marketing" checked> 
                        <span class="tooltip-title">${langText.marketingLabel}</span>
                        <span class="tooltip-text">${langText.marketingTooltip}</span>
                    </label>
                    
                    <!-- For analytics, if you want it visible: -->
                    <label style="display:none;">
                      <input type="checkbox" id="analytics" checked> ${langText.analyticsLabel}
                    </label>
                    <br>
                </div>
    
                <div class="buttons-grid">
                    <button id="accept-all" class="cookie-btn accept">${langText.acceptAllBtn}</button>
                    <button id="reject-all" class="cookie-btn reject">${langText.rejectAllBtn}</button>
                    <button id="save-settings" class="cookie-btn save">${langText.saveSettingsBtn}</button>
                </div>
            </div>
          </div>
        `);
    
        // ---------- REMAINING LOGIC IS THE SAME (STORAGE, EVENT LISTENERS, ETC.) ----------
        // The rest of your code for storing preferences and toggling iframes is unchanged.
    
        const storedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
        // ...
        // EXACTLY the same code from your snippet after injecting the HTML.
        
        const cookieBanner = document.getElementById("cookie-banner");
        const cookieBubble = document.getElementById("cookie-bubble");
        const consent = storedConsent;
    
        if (!consent) {
            cookieBanner.classList.remove("border");
            cookieBanner.classList.add("expanded");
            await new Promise(resolve => setTimeout(resolve, 300));
            cookieBanner.classList.add("delayed");
        }
    
        function closeCookieBanner() {
            cookieBanner.classList.remove("delayed");
            setTimeout(() => {
                cookieBanner.classList.remove("expanded");
                setTimeout(() => {
                    cookieBanner.classList.add("border");
                }, 300);
            }, 300);
        }
    
        cookieBubble.addEventListener("click", async function () {
            if (!cookieBanner.classList.contains("expanded")) {
                cookieBanner.classList.remove("border");
                cookieBanner.classList.add("expanded");
                await new Promise(resolve => setTimeout(resolve, 300));
                cookieBanner.classList.add("delayed");
            } else {
                closeCookieBanner();
            }
        });
    
        document.getElementById("accept-all").addEventListener("click", function () {
            document.getElementById("marketing").checked = true;
            if (document.getElementById("analytics")) {
                document.getElementById("analytics").checked = true;
            }
            localStorage.setItem("cookieConsent", JSON.stringify({ analytics: true, marketing: true }));
            applyCookieSettings();
            closeCookieBanner();
        });
    
        document.getElementById("reject-all").addEventListener("click", function () {
            document.getElementById("marketing").checked = false;
            if (document.getElementById("analytics")) {
                document.getElementById("analytics").checked = false;
            }
            localStorage.setItem("cookieConsent", JSON.stringify({ analytics: false, marketing: false }));
            applyCookieSettings();
            closeCookieBanner();
        });
    
        document.getElementById("save-settings").addEventListener("click", function () {
            const analytics = document.getElementById("analytics").checked;
            const marketing = document.getElementById("marketing").checked;
            localStorage.setItem("cookieConsent", JSON.stringify({ analytics, marketing }));
            applyCookieSettings();
            closeCookieBanner();
        });
    
        function applyCookieSettings() {
            const consent = JSON.parse(localStorage.getItem("cookieConsent"));
            if (consent) {
                if (consent.marketing) {
                    enableMarketingContent();
                    // Show all iframes
                    document.querySelectorAll("iframe").forEach(iframe => {
                        iframe.style.display = "block";
                    });
                    // Hide placeholders
                    document.querySelectorAll(".cookie-rejected").forEach(el => {
                        el.style.display = "none";
                    });
                } else {
                    // Hide iframes
                    document.querySelectorAll("iframe").forEach(iframe => {
                        iframe.style.display = "none";
                    });
                    // Show placeholders
                    document.querySelectorAll(".cookie-rejected").forEach(el => {
                        el.style.display = "flex";
                    });
                }
            } else {
                // Default: hide iframes, show placeholders
                document.querySelectorAll("iframe").forEach(iframe => {
                    iframe.style.display = "none";
                });
                document.querySelectorAll(".cookie-rejected").forEach(el => {
                    el.style.display = "flex";
                });
            }
        }
    
        function enableMarketingContent() {
            // e.g. load data-src
            document.querySelectorAll("iframe[data-src]").forEach(iframe => {
                iframe.src = iframe.getAttribute("data-src");
            });
        }
    
        applyCookieSettings();
    });


    /*--------Fade--------*/
    (function () {
        // Get the current page filename
        const currentPage = window.location.pathname.split("/").pop();
    
        // Create the overlay
        const overlay = document.createElement("div");
        overlay.id = "page-loader";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "#fff"; // Change color if needed
        // On index pages, start hidden; on others, start visible.
        overlay.style.opacity = (currentPage === "index.html" ||currentPage === "index_pl.html" || currentPage === "") ? "0" : "1";
        overlay.style.zIndex = "999999"; // Ensure it's above everything
        overlay.style.transition = "opacity 0.5s ease-in-out";
        overlay.style.pointerEvents = "none"; // Prevent interference with clicks
    
        // Append overlay to the document (before the body)
        document.documentElement.insertBefore(overlay, document.body);
    
        // On non-index pages, fade out the overlay after load but DO NOT remove it.
        if (!(currentPage === "index.html" || currentPage === "")) {
            window.addEventListener("load", () => {
                setTimeout(() => {
                    overlay.style.opacity = "0";
                }, 10); // Small delay to ensure transition applies
            });
        }
    
        // Function to fade in the overlay before navigation
        function showOverlayBeforeNavigation() {
            overlay.style.opacity = "1"; // Fade in (opacity 0 → 1)
        }
    
        // Listen for clicks on all internal links
        document.addEventListener("DOMContentLoaded", () => {
            document.body.addEventListener("click", function (event) {
                const target = event.target.closest("a");
                if (
                    target &&
                    target.href &&
                    target.target !== "_blank" &&
                    !target.href.startsWith("#") &&
                    !target.download &&
                    !target.href.startsWith("mailto:")
                ) {
                    // Extract the current URL and the target URL (ignoring hash parts)
                    const currentUrl = window.location.href.split("#")[0];
                    const targetUrl = target.href.split("#")[0];
    
                    // Only trigger the fade if navigating to a new URL
                    if (targetUrl !== currentUrl) {
                        event.preventDefault(); // Prevent instant navigation
                        showOverlayBeforeNavigation(); // Fade in the overlay
                        setTimeout(() => {
                            window.location.href = target.href; // Navigate after transition
                        }, 500); // Match transition time
                    }
                }
            });
        });
    
        // Handle bfcache restores (e.g. swipe-back on iPhone)
        window.addEventListener("pageshow", (event) => {
            if (event.persisted) {
                const overlay = document.getElementById("page-loader");
                if (overlay) {
                    // Instantly hide the overlay without transition flash
                    overlay.style.transition = "none";
                    overlay.style.opacity = "0";
    
                    // Re-enable transitions after one animation frame
                    requestAnimationFrame(() => {
                        overlay.style.transition = "opacity 0.5s ease-in-out";
                    });
                }
            }
        });
    })();
    
    



    document.addEventListener("DOMContentLoaded", () => {
        const languageLinks = document.querySelectorAll(".language-dropdown a, .footer-languages a");
      
        languageLinks.forEach(link => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
      
            const selectedLang = this.textContent.trim().match(/\((\w+)\)/)[1].toLowerCase(); // e.g., "de", "en", "pl", "ru"
            const currentUrl = new URL(window.location.href);
            const currentPath = currentUrl.pathname;
      
            let newPath;
      
            // Handle index files (e.g., index.html → index_pl.html)
            if (/index(_\w+)?\.html$/.test(currentPath)) {
              newPath = `/index${selectedLang === 'de' ? '' : '_' + selectedLang}.html`;
            } else {
              // Replace language part in the path
              if (currentPath.includes("/html_pl/") || currentPath.includes("/html_en/") || currentPath.includes("/html_ru/")) {
                newPath = currentPath.replace(/\/html_\w+\//, selectedLang === 'de' ? "/html/" : `/html_${selectedLang}/`);
              } else {
                newPath = selectedLang === 'de'
                  ? currentPath.replace("/html/", "/html/") // stays the same
                  : currentPath.replace("/html/", `/html_${selectedLang}/`);
              }
            }
      
            // Redirect to the new URL
            window.location.href = newPath;
          });
        });
      });