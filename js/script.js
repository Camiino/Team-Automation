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
    
        // 1) Detect language by URL
        const isPolish  = window.location.href.includes("/html_pl/") || window.location.href.includes("/index_pl.html");
        const isEnglish = window.location.href.includes("/html_en/") || window.location.href.includes("/index_en.html");
        const isRussian = window.location.href.includes("/html_ru/") || window.location.href.includes("/index_ru.html");
    
        // 2) Base URLs for each language version
        const baseUrlDe = "https://bee-its.de/html/";
        const baseUrlPl = "https://bee-its.de/html_pl/";
        const baseUrlEn = "https://bee-its.de/html_en/";
        const baseUrlRu = "https://bee-its.de/html_ru/";
    
        // -------------------------------------------------------------------------------------
        // 3) GERMAN suggestions (full set)
        // -------------------------------------------------------------------------------------
        const searchSuggestionsDe = [
            // Main pages
            { name: "Aktuelles", url: baseUrlDe + "neuigkeit.php" },
            { name: "Karriere", url: baseUrlDe + "karriere.html" },
            { name: "Downloads", url: baseUrlDe + "downloads.html" },
            { name: "Kontakt", url: baseUrlDe + "kontakt.html" },
            { name: "Leistungsportfolio", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Anlagen", url: baseUrlDe + "anlagen.html" },
            { name: "Prozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Branchen", url: baseUrlDe + "branchen.html" },
            { name: "Partner", url: baseUrlDe + "partner.html" },
            { name: "Unternehmen", url: baseUrlDe + "unternehmen.html" },
            { name: "Impressum", url: baseUrlDe + "impressum.html" },
            // Additional
            { name: "Beispiele", url: baseUrlDe + "anlagen/vollautomatisch.html" },
    
            // Branchen
            { name: "Automobilindustrie", url: baseUrlDe + "branchen/automobilindustrie.html" },
            { name: "Chemie", url: baseUrlDe + "branchen/chemie.html" },
            { name: "Elektronik", url: baseUrlDe + "branchen/elektronik.html" },
            { name: "Nutzfahrzeug", url: baseUrlDe + "branchen/nutzfahrzeug.html" },
            { name: "Sicherheitstechnik", url: baseUrlDe + "branchen/sicherheitstechnik.html" },
    
            // Anlagen
            { name: "Manuelle Arbeitsplätze", url: baseUrlDe + "anlagen/manuell.html" },
            { name: "Halbautomatische Anlagen", url: baseUrlDe + "anlagen/halbautomatisch.html" },
            { name: "Vollautomatische Anlagen", url: baseUrlDe + "anlagen/vollautomatisch.html" },
    
            // Leistungsportfolio
            { name: "After-Sales", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Konzeption", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Projektrealisierung", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "MTM-Analysen", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Prozessoptimierungen", url: baseUrlDe + "leistungsportfolio.html" },
    
            { name: "Konzeption & Planung", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Machbarkeitsanalysen", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Taktzeit- und Verfügbarkeitsanalysen", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Prozess- und Fertigungskonzeptionen", url: baseUrlDe + "leistungsportfolio.html" },
    
            { name: "Mechanische Konstruktion", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Elektrische und pneumatische Planung", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Schaltschrankbau und Verkabelung/Verschlauchung", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Programmierung und Inbetriebnahme", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Montage, Auslieferung und Aufstellung", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Roboter-Programmierung", url: baseUrlDe + "leistungsportfolio.html" },
    
            { name: "Dokumentation", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Anlagen und Typenerweiterungen", url: baseUrlDe + "leistungsportfolio.html" },
            { name: "Service und Wartung", url: baseUrlDe + "leistungsportfolio.html" },
    
            // Prozesse
            { name: "Bearbeitungsprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Bördeltechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Spulenwickeltechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Dosier- und Vergießtechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Plasmareinigung und -beschichtung", url: baseUrlDe + "prozesse.html" },
            { name: "Markier- und Beschriftungstechnik", url: baseUrlDe + "prozesse.html" },
    
            { name: "Lötprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Induktives Löten", url: baseUrlDe + "prozesse.html" },
            { name: "Lichtlöten", url: baseUrlDe + "prozesse.html" },
            { name: "Widerstandslöten", url: baseUrlDe + "prozesse.html" },
            { name: "Laserlöten", url: baseUrlDe + "prozesse.html" },
    
            { name: "Montageprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Fügevorgänge mit Kraft-Weg-Überwachung", url: baseUrlDe + "prozesse.html" },
            { name: "Koordinaten-Servo-Schraubtechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Nietprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Manuelle Montageprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Verpackungssysteme", url: baseUrlDe + "prozesse.html" },
    
            { name: "Prüfprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Funktionsprüfung", url: baseUrlDe + "prozesse.html" },
            { name: "Komplette Testvorrichtungen und Endprüfstände", url: baseUrlDe + "prozesse.html" },
            { name: "Mechanische Prüfverfahren", url: baseUrlDe + "prozesse.html" },
            { name: "Optische Prüfverfahren", url: baseUrlDe + "prozesse.html" },
            { name: "Durchfluss- und Dichtheitsprüfungen", url: baseUrlDe + "prozesse.html" },
    
            { name: "Schweißprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Laserschweißtechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Ultraschallschweißen", url: baseUrlDe + "prozesse.html" },
            { name: "Widerstandsschweißen", url: baseUrlDe + "prozesse.html" },
            { name: "Reibschweißen", url: baseUrlDe + "prozesse.html" },
            { name: "Thermokompressionsschweißen", url: baseUrlDe + "prozesse.html" },
    
            { name: "Zuführprozesse", url: baseUrlDe + "prozesse.html" },
            { name: "Transportbandsysteme", url: baseUrlDe + "prozesse.html" },
            { name: "Palettier-Systeme", url: baseUrlDe + "prozesse.html" },
            { name: "Robotertechnik", url: baseUrlDe + "prozesse.html" },
            { name: "Linear- und Radialzuführsysteme", url: baseUrlDe + "prozesse.html" },
    
            // Subanlagen > Pumpen
            { name: "Pumpen", url: baseUrlDe + "anlagen/halbautomatisch.html" },
            { name: "Hydraulische Flügelpumpen", url: baseUrlDe + "anlagen/halbautomatisch.html" },
            { name: "Ölpumpen", url: baseUrlDe + "anlagen/halbautomatisch.html" },
    
            // Subanlagen > Ventile
            { name: "Elektrische Umschaltventile", url: baseUrlDe + "anlagen/vollautomatisch.html" },
            { name: "Ölschaltventile", url: baseUrlDe + "anlagen/vollautomatisch.html" },
            { name: "Schubumluftventile", url: baseUrlDe + "anlagen/vollautomatisch.html" },
            { name: "Abgasregelsysteme", url: baseUrlDe + "anlagen/vollautomatisch.html" },
            { name: "Ventile", url: baseUrlDe + "anlagen/vollautomatisch.html" },
            { name: "Rauchmelder", url: baseUrlDe + "anlagen/subanlagen/rauchmelder.html" },
        ];
    
        // -------------------------------------------------------------------------------------
        // 4) POLISH suggestions (full set)
        // -------------------------------------------------------------------------------------
        const searchSuggestionsPl = [
            // Główne strony
            { name: "Aktualności", url: baseUrlPl + "neuigkeit.php" },
            { name: "Kariera", url: baseUrlPl + "karriere.html" },
            { name: "Do pobrania", url: baseUrlPl + "downloads.html" },
            { name: "Kontakt", url: baseUrlPl + "kontakt.html" },
            { name: "Usługi", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Instalacje", url: baseUrlPl + "anlagen.html" },
            { name: "Procesy", url: baseUrlPl + "prozesse.html" },
            { name: "Branże", url: baseUrlPl + "branchen.html" },
            { name: "Partnerzy", url: baseUrlPl + "partner.html" },
            { name: "Firma", url: baseUrlPl + "unternehmen.html" },
            { name: "Impressum", url: baseUrlPl + "impressum.html" },
            // Dodatkowe
            { name: "Przykłady", url: baseUrlPl + "anlagen/vollautomatisch.html" },
    
            // Branże
            { name: "Przemysł motoryzacyjny", url: baseUrlPl + "branchen/automobilindustrie.html" },
            { name: "Branża chemiczna", url: baseUrlPl + "branchen/chemie.html" },
            { name: "Elektronika", url: baseUrlPl + "branchen/elektronik.html" },
            { name: "Pojazdy użytkowe", url: baseUrlPl + "branchen/nutzfahrzeug.html" },
            { name: "Technika bezpieczeństwa", url: baseUrlPl + "branchen/sicherheitstechnik.html" },
    
            // Instalacje
            { name: "Stanowiska manualne", url: baseUrlPl + "anlagen/manuell.html" },
            { name: "Instalacje półautomatyczne", url: baseUrlPl + "anlagen/halbautomatisch.html" },
            { name: "Instalacje w pełni automatyczne", url: baseUrlPl + "anlagen/vollautomatisch.html" },
    
            // Usługi (Leistungsportfolio)
            { name: "After-Sales", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Koncepcja i planowanie", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Projektrealisierung", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "MTM-Analizy", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Optymalizacje procesów", url: baseUrlPl + "leistungsportfolio.html" },
    
            { name: "Machbarkeitsanalizy", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Taktzeit- i analizy dostępności", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Projekty i koncepcje produkcji", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Konstrukcja mechaniczna", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Planowanie elektryczne i pneumatyczne", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Budowa szaf sterowniczych i okablowanie", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Programowanie i uruchomienie", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Montaż, dostawa i ustawienie", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Programowanie robotów", url: baseUrlPl + "leistungsportfolio.html" },
    
            { name: "Dokumentacja", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Rozbudowy instalacji i typów", url: baseUrlPl + "leistungsportfolio.html" },
            { name: "Serwis i konserwacja", url: baseUrlPl + "leistungsportfolio.html" },
    
            // Procesy
            { name: "Bördeltechnik (Zaciskanie)", url: baseUrlPl + "prozesse.html" },
            { name: "Technika nawijania cewek", url: baseUrlPl + "prozesse.html" },
            { name: "Techniki dozowania i zalewania", url: baseUrlPl + "prozesse.html" },
            { name: "Czyszczenie i powlekanie plazmowe", url: baseUrlPl + "prozesse.html" },
            { name: "Techniki znakowania i opisywania", url: baseUrlPl + "prozesse.html" },
    
            { name: "Lutowanie indukcyjne", url: baseUrlPl + "prozesse.html" },
            { name: "Lutowanie światłem", url: baseUrlPl + "prozesse.html" },
            { name: "Lutowanie oporowe", url: baseUrlPl + "prozesse.html" },
            { name: "Lutowanie laserowe", url: baseUrlPl + "prozesse.html" },
    
            { name: "Procesy montażowe", url: baseUrlPl + "prozesse.html" },
            { name: "Złącza z kontrolą siły i drogi", url: baseUrlPl + "prozesse.html" },
            { name: "Serwo-technika wkręcania", url: baseUrlPl + "prozesse.html" },
            { name: "Nitowanie", url: baseUrlPl + "prozesse.html" },
            { name: "Manualne procesy montażowe", url: baseUrlPl + "prozesse.html" },
            { name: "Systemy pakowania", url: baseUrlPl + "prozesse.html" },
    
            { name: "Procesy testowe i kontrolne", url: baseUrlPl + "prozesse.html" },
            { name: "Test funkcjonalny", url: baseUrlPl + "prozesse.html" },
            { name: "Kompletne stanowiska testowe", url: baseUrlPl + "prozesse.html" },
            { name: "Mechaniczne metody testowania", url: baseUrlPl + "prozesse.html" },
            { name: "Optyczne metody testowania", url: baseUrlPl + "prozesse.html" },
            { name: "Testy przepływu i szczelności", url: baseUrlPl + "prozesse.html" },
    
            { name: "Procesy spawalnicze", url: baseUrlPl + "prozesse.html" },
            { name: "Spawanie laserowe", url: baseUrlPl + "prozesse.html" },
            { name: "Spawanie ultradźwiękowe", url: baseUrlPl + "prozesse.html" },
            { name: "Spawanie oporowe", url: baseUrlPl + "prozesse.html" },
            { name: "Spawanie tarciowe", url: baseUrlPl + "prozesse.html" },
            { name: "Spawanie termokompresyjne", url: baseUrlPl + "prozesse.html" },
    
            { name: "Procesy podawcze", url: baseUrlPl + "prozesse.html" },
            { name: "Systemy taśm transportujących", url: baseUrlPl + "prozesse.html" },
            { name: "Systemy paletyzujące", url: baseUrlPl + "prozesse.html" },
            { name: "Technika robotów", url: baseUrlPl + "prozesse.html" },
            { name: "Systemy podawania liniowego i promieniowego", url: baseUrlPl + "prozesse.html" },
    
            // Pod-instalacje > Pompy
            { name: "Pompy", url: baseUrlPl + "anlagen/halbautomatisch.html" },
            { name: "Hydrauliczne pompy skrzydełkowe", url: baseUrlPl + "anlagen/halbautomatisch.html" },
            { name: "Pompy olejowe", url: baseUrlPl + "anlagen/halbautomatisch.html" },
    
            // Pod-instalacje > Zawory
            { name: "Elektryczne zawory przełączające", url: baseUrlPl + "anlagen/vollautomatisch.html" },
            { name: "Zawory olejowe", url: baseUrlPl + "anlagen/vollautomatisch.html" },
            { name: "Zawory spalinowe", url: baseUrlPl + "anlagen/vollautomatisch.html" },
            { name: "Systemy regulacji spalin", url: baseUrlPl + "anlagen/vollautomatisch.html" },
            { name: "Zawory", url: baseUrlPl + "anlagen/vollautomatisch.html" },
            { name: "Czujniki dymu (Rauchmelder)", url: baseUrlPl + "anlagen/subanlagen/rauchmelder.html" },
        ];
    
        // -------------------------------------------------------------------------------------
        // 5) ENGLISH suggestions (full set, translated from German)
        // -------------------------------------------------------------------------------------
        const searchSuggestionsEn = [
            // Main pages
            { name: "News", url: baseUrlEn + "neuigkeit.php" },
            { name: "Career", url: baseUrlEn + "karriere.html" },
            { name: "Downloads", url: baseUrlEn + "downloads.html" },
            { name: "Contact", url: baseUrlEn + "kontakt.html" },
            { name: "Service Portfolio", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Systems", url: baseUrlEn + "anlagen.html" },
            { name: "Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Sectors", url: baseUrlEn + "branchen.html" },
            { name: "Partners", url: baseUrlEn + "partner.html" },
            { name: "Company", url: baseUrlEn + "unternehmen.html" },
            { name: "Imprint", url: baseUrlEn + "impressum.html" },
            // Additional
            { name: "Examples", url: baseUrlEn + "anlagen/vollautomatisch.html" },
    
            // Sectors (Branchen)
            { name: "Automotive Industry", url: baseUrlEn + "branchen/automobilindustrie.html" },
            { name: "Chemicals", url: baseUrlEn + "branchen/chemie.html" },
            { name: "Electronics", url: baseUrlEn + "branchen/elektronik.html" },
            { name: "Commercial Vehicles", url: baseUrlEn + "branchen/nutzfahrzeug.html" },
            { name: "Security Technology", url: baseUrlEn + "branchen/sicherheitstechnik.html" },
    
            // Systems (Anlagen)
            { name: "Manual Workstations", url: baseUrlEn + "anlagen/manuell.html" },
            { name: "Semi-Automated Systems", url: baseUrlEn + "anlagen/halbautomatisch.html" },
            { name: "Fully-Automated Systems", url: baseUrlEn + "anlagen/vollautomatisch.html" },
    
            // Service Portfolio (translated)
            { name: "After-Sales", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Concept & Planning", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Project Realization", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "MTM Analyses", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Process Optimizations", url: baseUrlEn + "leistungsportfolio.html" },
    
            { name: "Feasibility Analyses", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Cycle Time & Availability Analyses", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Process & Production Concepts", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Mechanical Design", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Electrical & Pneumatic Planning", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Control Cabinet Construction & Wiring", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Programming & Commissioning", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Assembly, Delivery & Installation", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Robot Programming", url: baseUrlEn + "leistungsportfolio.html" },
    
            { name: "Documentation", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "System & Type Extensions", url: baseUrlEn + "leistungsportfolio.html" },
            { name: "Service & Maintenance", url: baseUrlEn + "leistungsportfolio.html" },
    
            // Processes
            { name: "Machining Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Flanging Technology", url: baseUrlEn + "prozesse.html" },
            { name: "Coil Winding Technology", url: baseUrlEn + "prozesse.html" },
            { name: "Dispensing & Potting Technology", url: baseUrlEn + "prozesse.html" },
            { name: "Plasma Cleaning & Coating", url: baseUrlEn + "prozesse.html" },
            { name: "Marking & Labeling Technology", url: baseUrlEn + "prozesse.html" },
    
            { name: "Soldering Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Inductive Soldering", url: baseUrlEn + "prozesse.html" },
            { name: "Light Soldering", url: baseUrlEn + "prozesse.html" },
            { name: "Resistance Soldering", url: baseUrlEn + "prozesse.html" },
            { name: "Laser Soldering", url: baseUrlEn + "prozesse.html" },
    
            { name: "Assembly Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Joining with Force-Displacement Monitoring", url: baseUrlEn + "prozesse.html" },
            { name: "Coordinate Servo Screw Technology", url: baseUrlEn + "prozesse.html" },
            { name: "Riveting Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Manual Assembly Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Packaging Systems", url: baseUrlEn + "prozesse.html" },
    
            { name: "Testing Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Functional Testing", url: baseUrlEn + "prozesse.html" },
            { name: "Complete Test Fixtures & End-of-Line Stations", url: baseUrlEn + "prozesse.html" },
            { name: "Mechanical Testing Methods", url: baseUrlEn + "prozesse.html" },
            { name: "Optical Testing Methods", url: baseUrlEn + "prozesse.html" },
            { name: "Flow & Leak Tests", url: baseUrlEn + "prozesse.html" },
    
            { name: "Welding Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Laser Welding Technology", url: baseUrlEn + "prozesse.html" },
            { name: "Ultrasonic Welding", url: baseUrlEn + "prozesse.html" },
            { name: "Resistance Welding", url: baseUrlEn + "prozesse.html" },
            { name: "Friction Welding", url: baseUrlEn + "prozesse.html" },
            { name: "Thermocompression Welding", url: baseUrlEn + "prozesse.html" },
    
            { name: "Feeding Processes", url: baseUrlEn + "prozesse.html" },
            { name: "Conveyor Belt Systems", url: baseUrlEn + "prozesse.html" },
            { name: "Palletizing Systems", url: baseUrlEn + "prozesse.html" },
            { name: "Robotics", url: baseUrlEn + "prozesse.html" },
            { name: "Linear & Radial Feeding Systems", url: baseUrlEn + "prozesse.html" },
    
            // Sub-systems > Pumps
            { name: "Pumps", url: baseUrlEn + "anlagen/halbautomatisch.html" },
            { name: "Hydraulic Vane Pumps", url: baseUrlEn + "anlagen/halbautomatisch.html" },
            { name: "Oil Pumps", url: baseUrlEn + "anlagen/halbautomatisch.html" },
    
            // Sub-systems > Valves
            { name: "Electrical Changeover Valves", url: baseUrlEn + "anlagen/vollautomatisch.html" },
            { name: "Oil Switching Valves", url: baseUrlEn + "anlagen/vollautomatisch.html" },
            { name: "Turbo Bypass Valves", url: baseUrlEn + "anlagen/vollautomatisch.html" },
            { name: "Exhaust Control Systems", url: baseUrlEn + "anlagen/vollautomatisch.html" },
            { name: "Valves", url: baseUrlEn + "anlagen/vollautomatisch.html" },
            { name: "Smoke Detectors", url: baseUrlEn + "anlagen/subanlagen/rauchmelder.html" },
        ];
    
        // -------------------------------------------------------------------------------------
        // 6) RUSSIAN suggestions (full set, translated from German)
        // -------------------------------------------------------------------------------------
        const searchSuggestionsRu = [
            // Main pages
            { name: "Новости", url: baseUrlRu + "neuigkeit.php" },
            { name: "Карьера", url: baseUrlRu + "karriere.html" },
            { name: "Загрузки", url: baseUrlRu + "downloads.html" },
            { name: "Контакт", url: baseUrlRu + "kontakt.html" },
            { name: "Портфолио услуг", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Установки", url: baseUrlRu + "anlagen.html" },
            { name: "Процессы", url: baseUrlRu + "prozesse.html" },
            { name: "Отрасли", url: baseUrlRu + "branchen.html" },
            { name: "Партнёры", url: baseUrlRu + "partner.html" },
            { name: "О компании", url: baseUrlRu + "unternehmen.html" },
            { name: "Импрессум", url: baseUrlRu + "impressum.html" },
            // Additional
            { name: "Примеры", url: baseUrlRu + "anlagen/vollautomatisch.html" },
    
            // Отрасли (Branchen)
            { name: "Автомобильная промышленность", url: baseUrlRu + "branchen/automobilindustrie.html" },
            { name: "Химическая промышленность", url: baseUrlRu + "branchen/chemie.html" },
            { name: "Электроника", url: baseUrlRu + "branchen/elektronik.html" },
            { name: "Коммерческий транспорт", url: baseUrlRu + "branchen/nutzfahrzeug.html" },
            { name: "Технологии безопасности", url: baseUrlRu + "branchen/sicherheitstechnik.html" },
    
            // Установки (Anlagen)
            { name: "Ручные рабочие места", url: baseUrlRu + "anlagen/manuell.html" },
            { name: "Полуавтоматические установки", url: baseUrlRu + "anlagen/halbautomatisch.html" },
            { name: "Полностью автоматические установки", url: baseUrlRu + "anlagen/vollautomatisch.html" },
    
            // Портфолио услуг (Leistungsportfolio)
            { name: "Послепродажное обслуживание", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Концепция и планирование", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Реализация проектов", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "MTM-анализы", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Оптимизация процессов", url: baseUrlRu + "leistungsportfolio.html" },
    
            { name: "Технико-экономические анализы", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Анализы тактового времени и доступности", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Концепции процессов и производства", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Механическая конструкция", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Электрическое и пневматическое проектирование", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Производство шкафов управления и монтаж", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Программирование и ввод в эксплуатацию", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Сборка, доставка и установка", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Программирование роботов", url: baseUrlRu + "leistungsportfolio.html" },
    
            { name: "Документация", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Модернизация установок и расширение типов", url: baseUrlRu + "leistungsportfolio.html" },
            { name: "Сервис и обслуживание", url: baseUrlRu + "leistungsportfolio.html" },
    
            // Процессы
            { name: "Процессы обработки", url: baseUrlRu + "prozesse.html" },
            { name: "Завальцовка", url: baseUrlRu + "prozesse.html" },
            { name: "Техника намотки катушек", url: baseUrlRu + "prozesse.html" },
            { name: "Дозирование и заливка", url: baseUrlRu + "prozesse.html" },
            { name: "Плазменная очистка и покрытие", url: baseUrlRu + "prozesse.html" },
            { name: "Маркировка и гравировка", url: baseUrlRu + "prozesse.html" },
    
            { name: "Процессы пайки", url: baseUrlRu + "prozesse.html" },
            { name: "Индукционная пайка", url: baseUrlRu + "prozesse.html" },
            { name: "Пайка светом", url: baseUrlRu + "prozesse.html" },
            { name: "Контактная пайка", url: baseUrlRu + "prozesse.html" },
            { name: "Лазерная пайка", url: baseUrlRu + "prozesse.html" },
    
            { name: "Монтажные процессы", url: baseUrlRu + "prozesse.html" },
            { name: "Соединение с контролем усилия и перемещения", url: baseUrlRu + "prozesse.html" },
            { name: "Координатная серво-шуруповертовая техника", url: baseUrlRu + "prozesse.html" },
            { name: "Заклёпочные процессы", url: baseUrlRu + "prozesse.html" },
            { name: "Ручные сборочные процессы", url: baseUrlRu + "prozesse.html" },
            { name: "Системы упаковки", url: baseUrlRu + "prozesse.html" },
    
            { name: "Испытательные процессы", url: baseUrlRu + "prozesse.html" },
            { name: "Функциональные испытания", url: baseUrlRu + "prozesse.html" },
            { name: "Полные испытательные приспособления и финальные стенды", url: baseUrlRu + "prozesse.html" },
            { name: "Механические методы испытаний", url: baseUrlRu + "prozesse.html" },
            { name: "Оптические методы испытаний", url: baseUrlRu + "prozesse.html" },
            { name: "Тесты расхода и герметичности", url: baseUrlRu + "prozesse.html" },
    
            { name: "Процессы сварки", url: baseUrlRu + "prozesse.html" },
            { name: "Лазерная сварка", url: baseUrlRu + "prozesse.html" },
            { name: "Ультразвуковая сварка", url: baseUrlRu + "prozesse.html" },
            { name: "Сопротивительная сварка", url: baseUrlRu + "prozesse.html" },
            { name: "Сварка трением", url: baseUrlRu + "prozesse.html" },
            { name: "Термокомпрессионная сварка", url: baseUrlRu + "prozesse.html" },
    
            { name: "Процессы подачи", url: baseUrlRu + "prozesse.html" },
            { name: "Конвейерные системы", url: baseUrlRu + "prozesse.html" },
            { name: "Паллетирующие системы", url: baseUrlRu + "prozesse.html" },
            { name: "Робототехника", url: baseUrlRu + "prozesse.html" },
            { name: "Линейные и радиальные системы подачи", url: baseUrlRu + "prozesse.html" },
    
            // Под-системы > Насосы
            { name: "Насосы", url: baseUrlRu + "anlagen/halbautomatisch.html" },
            { name: "Гидравлические лопастные насосы", url: baseUrlRu + "anlagen/halbautomatisch.html" },
            { name: "Масляные насосы", url: baseUrlRu + "anlagen/halbautomatisch.html" },
    
            // Под-системы > Клапаны
            { name: "Электрические переключающие клапаны", url: baseUrlRu + "anlagen/vollautomatisch.html" },
            { name: "Масляные переключающие клапаны", url: baseUrlRu + "anlagen/vollautomatisch.html" },
            { name: "Клапаны рециркуляции выхлопа", url: baseUrlRu + "anlagen/vollautomatisch.html" },
            { name: "Системы управления выхлопом", url: baseUrlRu + "anlagen/vollautomatisch.html" },
            { name: "Клапаны", url: baseUrlRu + "anlagen/vollautomatisch.html" },
            { name: "Датчики дыма", url: baseUrlRu + "anlagen/subanlagen/rauchmelder.html" },
        ];
    
        // -------------------------------------------------------------------------------------
        // 7) CHOOSE which suggestions to use, default to German
        // -------------------------------------------------------------------------------------
        let searchSuggestions = searchSuggestionsDe;
        if (isPolish)  { searchSuggestions = searchSuggestionsPl; }
        else if (isEnglish) { searchSuggestions = searchSuggestionsEn; }
        else if (isRussian) { searchSuggestions = searchSuggestionsRu; }
    
        // Create a suggestions container dynamically
        const suggestionsBox = document.createElement("ul");
        suggestionsBox.classList.add("search-suggestions");
        searchContainer.appendChild(suggestionsBox);
    
        // Basic styling for the suggestions box
        suggestionsBox.style.background   = "transparent";
        suggestionsBox.style.color        = "white";
        suggestionsBox.style.width        = searchInput.offsetWidth + "px";
        suggestionsBox.style.maxHeight    = "80%";
        suggestionsBox.style.overflowY    = "auto";
        suggestionsBox.style.listStyle    = "none";
        suggestionsBox.style.padding      = "5px";
        suggestionsBox.style.margin       = "3rem auto";
        suggestionsBox.style.display      = "none";
        suggestionsBox.style.zIndex       = "10000";
    
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
        // 1) Detect language from URL or by other rules
        const isPolish = window.location.href.includes("/html_pl/") || window.location.href.includes("index_pl.html");
        const isRussian = window.location.href.includes("/html_ru/") || window.location.href.includes("index_ru.html");
        const isEnglish = window.location.href.includes("/html_en/") || window.location.href.includes("index_en.html");
    
        // 2) Prepare text for each language
        const texts = {
          de: {
            message: `Auf dieser Website nutzen wir Cookies zur Verarbeitung von Endgeräteinformationen. Die Verarbeitung dient der Gewährleistung grundlegender Funktionen und der Einbindung externer Inhalte und Dienste Dritter (z. B. Google Fonts, YouTube, Google Maps). Je nach Funktion können dabei Daten an Dritte weitergegeben und dort verarbeitet werden. Mehr Informationen hierzu finden Sie im <a href="https://bee-its.de/html/impressum.html" style="color: #e5e5e5;">Impressum</a>.<br><br>Sie können Ihre Zustimmung jederzeit ändern oder widerrufen.`,
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
            message: `Na tej stronie używamy plików cookie do przetwarzania informacji na temat urządzeń końcowych. Przetwarzanie służy zapewnieniu podstawowych funkcji oraz integracji zewnętrznych treści i usług firm trzecich (np. Google Fonts, YouTube, Google Maps). W zależności od funkcji, dane mogą być przekazywane osobom trzecim i tam przetwarzane. Więcej informacji znajdziesz w <a href="https://bee-its.de/html_pl/impressum.html" style="color: #e5e5e5;">Impressum</a>.<br><br>Możesz w każdej chwili zmienić lub wycofać swoją zgodę.`,
            essentialLabel: "Niezbędne",
            marketingLabel: "Marketing",
            marketingTooltip: "YouTube, Google Maps",
            analyticsLabel: "Analityka (Google Analytics)",
            acceptAllBtn: "Zaakceptuj wszystkie",
            rejectAllBtn: "Odrzuć opcjonalne",
            saveSettingsBtn: "Zapisz ustawienia",
            cookieSvgColor: "#e5e5e5"
          },
          en: {
            message: `We use cookies on this website to process device information. The processing is intended to ensure basic functions and the integration of external content and third-party services (e.g. Google Fonts, YouTube, Google Maps). Depending on the function, data may be passed on to third parties and processed there. You can find more information in our <a href="https://bee-its.de/html_en/impressum.html" style="color: #e5e5e5;">imprint</a>.<br><br>You can change or revoke your consent at any time.`,
            essentialLabel: "Essential",
            marketingLabel: "Marketing",
            marketingTooltip: "YouTube, Google Maps",
            analyticsLabel: "Analytics (Google Analytics)",
            acceptAllBtn: "Accept All",
            rejectAllBtn: "Reject Optional",
            saveSettingsBtn: "Save Settings",
            cookieSvgColor: "#e5e5e5"
          },
          ru: {
            message: `На этом сайте мы используем файлы cookie для обработки информации об устройствах. Это необходимо для обеспечения основных функций, а также для встраивания внешнего контента и сервисов третьих сторон (например, Google Fonts, YouTube, Google Maps). В зависимости от функциональности, данные могут передаваться третьим лицам и обрабатываться ими. Более подробную информацию вы можете найти в <a href="https://bee-its.de/html_ru/impressum.html" style="color: #e5e5e5;">импрессуме</a>.<br><br>Вы можете в любой момент изменить или отозвать свое согласие.`,
            essentialLabel: "Основные",
            marketingLabel: "Маркетинг",
            marketingTooltip: "YouTube, Google Maps",
            analyticsLabel: "Аналитика (Google Analytics)",
            acceptAllBtn: "Принять все",
            rejectAllBtn: "Отклонить дополнительные",
            saveSettingsBtn: "Сохранить настройки",
            cookieSvgColor: "#e5e5e5"
          }
        };
    
        // 3) Decide which language to display
        let langText = texts.de; // default to German
        if (isPolish) {
          langText = texts.pl;
        } else if (isRussian) {
          langText = texts.ru;
        } else if (isEnglish) {
          langText = texts.en;
        }
        // else it remains texts.de by default
    
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
    
        // =========== REMAINING LOGIC (STORING PREFERENCES, TOGGLING IFRAMES, ETC.) ===========
    
        const storedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
        const cookieBanner = document.getElementById("cookie-banner");
        const cookieBubble = document.getElementById("cookie-bubble");
        const consent = storedConsent;
    
        // If no stored consent, show the banner expanded the first time
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
    
        // Apply settings right away on load
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
        overlay.style.opacity = (currentPage === "index.html" || currentPage === "index_pl.html" || currentPage === "index_ru.html" || currentPage === "index_en.html" || currentPage === "") ? "0" : "1";
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
        const languageLinks = document.querySelectorAll(".language-dropdown a, .footer-languages a, .menu-content-box a");
      
        languageLinks.forEach(link => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
      
            const selectedLang = this.textContent.trim().match(/\((\w+)\)/)[1].toLowerCase(); // e.g., "de", "en", "pl", "ru"
            const currentUrl = new URL(window.location.href);
            let currentPath = currentUrl.pathname;
      
            // Normalize root path
            if (currentPath === "/" || currentPath === "") {
              currentPath = "/index.html";
            }
      
            let newPath;
      
            // Handle index files (e.g., index.html → index_pl.html)
            if (/index(_\w+)?\.html$/.test(currentPath)) {
              newPath = `/${selectedLang === 'de' ? 'index' : 'index_' + selectedLang}.html`;
            } else {
              // Handle subdirectory pages like /html/xyz.html or /html_pl/xyz.html
              const langDirsRegex = /\/html(_\w+)?\//;
      
              if (langDirsRegex.test(currentPath)) {
                newPath = currentPath.replace(langDirsRegex, selectedLang === 'de' ? "/html/" : `/html_${selectedLang}/`);
              } else {
                // If somehow not matching anything above, stay defensive
                newPath = currentPath;
              }
            }
      
            window.location.href = newPath;
          });
        });
      });