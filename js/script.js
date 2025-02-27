const hamburger = document.getElementById("hamburger");

window.addEventListener("scroll", function () {
  closeDropdown();
});

/* ------------- Menu ------------- */

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("change", () => {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    document.body.style.overflow = "auto";
  } else {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";

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
      document.body.style.overflow = "auto";
    } else {
      searchContainer.classList.add("active");
      document.body.style.overflow = "hidden";
      if (menu.classList.contains("open")) {
        burger.click();
      }
    }
  });
});

searchContainer.addEventListener("mousedown", (e) => {
  if (e.target === searchContainer) {
    searchContainer.classList.remove("active");
    document.body.style.overflow = "auto";
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


/* ------------- Zoom ------------- */
/*window.onload = function () {
  document.body.style.zoom = "100%";
}*/

let smallScreenWarningShown = false;

function checkScreenSize() {
    if (window.innerWidth < 320) {
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


let lastScrollY = window.scrollY;

function checkVisibility() {
    const elements = document.querySelectorAll('.animated-item');
    const scrollY = window.scrollY;
  
    if (scrollY > lastScrollY) { // User scrollt nach unten
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) { // Element betritt den sichtbaren Bereich
                el.classList.add('flyIn');
            }
        });
    }

    lastScrollY = scrollY;
}

// Scroll-Event erst starten, nachdem der Preloader fertig ist
window.addEventListener('load', () => {
    setTimeout(() => {
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
    }, 5000); // Wartet, bis der Preloader durchgelaufen ist
});




document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-container input");
  const searchContainer = document.querySelector(".search-container");

  // Base URL for absolute links
  const baseUrl = "https://webeesign.com/sandbox/TeamAuto/";

  // Predefined search suggestions with absolute URLs
  const searchSuggestions = [
      { name: "Aktuelles", url: baseUrl + "html/neuigkeit.html" },
      { name: "Karriere", url: baseUrl + "html/karriere.html" },
      { name: "Downloads", url: baseUrl + "html/downloads.html" },
      { name: "Kontakt", url: baseUrl + "html/kontakt.html" },
      { name: "Leistungsportfolio", url: baseUrl + "html/leistungsportfolio.html" },
      { name: "Anlagen", url: baseUrl + "html/anlagen.html" },
      { name: "Prozesse", url: baseUrl + "html/prozesse.html" },
      { name: "Branchen", url: baseUrl + "html/branchen.html" },
      { name: "Partner", url: baseUrl + "html/partner.html" },
      { name: "Unternehmen", url: baseUrl + "html/unternehmen.html" },
      { name: "Impressum", url: baseUrl + "html/impressum.html" },

      // Additional Pages from your directory
      { name: "Beispiele", url: baseUrl + "html/anlagen/halbautomatisch.html" },

      // Branchen
      { name: "Automobilindustrie", url: baseUrl + "html/branchen/automobilindustrie.html" },
      { name: "Chemie", url: baseUrl + "html/branchen/chemie.html" },
      { name: "Elektronik", url: baseUrl + "html/branchen/elektronik.html" },
      { name: "Nutzfahrzeug", url: baseUrl + "html/branchen/nutzfahrzeug.html" },
      { name: "Sicherheitstechnik", url: baseUrl + "html/branchen/sicherheitstechnik.html" },

      // Anlagen
      { name: "Manuelle Arbeitsplätze", url: baseUrl + "html/anlagen/manuell.html" },
      { name: "Halbautomatische Anlagen", url: baseUrl + "html/anlagen/halbautomatisch.html" },
      { name: "Vollautomatische Anlagen", url: baseUrl + "html/branchen/vollautomatisch.html" },


      // Leistungsportfolio
      { name: "After-Sales", url: baseUrl + "html/leistungsportfolio/after-sales.html" },
      { name: "Konzeption", url: baseUrl + "html/leistungsportfolio/konzeption.html" },
      { name: "Projektrealisierung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "MTM-Analysen", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Prozessoptimierungen", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },

      // Alternative headers for Konzeption
      { name: "Konzeption & Planung", url: baseUrl + "html/leistungsportfolio/konzeption.html" },
      { name: "Machbarkeitsanalysen", url: baseUrl + "html/leistungsportfolio/konzeption.html" },
      { name: "Taktzeit- und Verfügbarkeitsanalysen", url: baseUrl + "html/leistungsportfolio/konzeption.html" },
      { name: "Prozess- und Fertigungskonzeptionen", url: baseUrl + "html/leistungsportfolio/konzeption.html" },

      // Alternative headers for Projektrealisierung
      { name: "Projektrealisierung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Mechanische Konstruktion", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Elektrische und pneumatische Planung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Schaltschrankbau und Verkabelung/Verschlauchung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Programmierung und Inbetriebnahme", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Montage, Auslieferung und Aufstellung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },
      { name: "Roboter-Programmierung", url: baseUrl + "html/leistungsportfolio/projektrealisierung.html" },

      // Alternative headers for After-Sales
      { name: "After-Sales", url: baseUrl + "html/leistungsportfolio/after-sales.html" },
      { name: "Dokumentation", url: baseUrl + "html/leistungsportfolio/after-sales.html" },
      { name: "Anlagen und Typenerweiterungen", url: baseUrl + "html/leistungsportfolio/after-sales.html" },
      { name: "Service und Wartung", url: baseUrl + "html/leistungsportfolio/after-sales.html" },


      // Prozesse
      { name: "Bearbeitungsprozesse", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },
      { name: "Bördeltechnik", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },
      { name: "Spulenwickeltechnik", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },
      { name: "Dosier- und Vergießtechnik", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },
      { name: "Plasmareinigung und -beschichtung", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },
      { name: "Markier- und Beschriftungstechnik", url: baseUrl + "html/prozesse/bearbeitungsprozesse.html" },


      { name: "Lötprozesse", url: baseUrl + "html/prozesse/loetprozesse.html" },
      { name: "Induktives Löten", url: baseUrl + "html/prozesse/loetprozesse.html" },
      { name: "Lichtlöten", url: baseUrl + "html/prozesse/loetprozesse.html" },
      { name: "Widerstandslöten", url: baseUrl + "html/prozesse/loetprozesse.html" },
      { name: "Laserlöten", url: baseUrl + "html/prozesse/loetprozesse.html" },


      { name: "Montageprozesse", url: baseUrl + "html/prozesse/montageprozesse.html" },
      { name: "Fügevorgänge mit Kraft-Weg-Überwachung", url: baseUrl + "html/prozesse/montageprozesse.html" },
      { name: "Koordinaten-Servo-Schraubtechnik", url: baseUrl + "html/prozesse/montageprozesse.html" },
      { name: "Nietprozesse", url: baseUrl + "html/prozesse/montageprozesse.html" },
      { name: "Manuelle Montageprozesse", url: baseUrl + "html/prozesse/montageprozesse.html" },
      { name: "Verpackungssysteme", url: baseUrl + "html/prozesse/montageprozesse.html" },


      { name: "Prüfprozesse", url: baseUrl + "html/prozesse/pruefprozesse.html" },
      { name: "Funktionsprüfung", url: baseUrl + "html/prozesse/pruefprozesse.html" },
      { name: "Komplette Testvorrichtungen und Endprüfstände", url: baseUrl + "html/prozesse/pruefprozesse.html" },
      { name: "Mechanische Prüfverfahren", url: baseUrl + "html/prozesse/pruefprozesse.html" },
      { name: "Optische Prüfverfahren", url: baseUrl + "html/prozesse/pruefprozesse.html" },
      { name: "Durchfluss- und Dichtheitsprüfungen", url: baseUrl + "html/prozesse/pruefprozesse.html" },


      { name: "Schweißprozesse", url: baseUrl + "html/prozesse/schweissprozesse.html" },
      { name: "Laserschweißtechnik", url: baseUrl + "html/prozesse/schweissprozesse.html" },
      { name: "Ultraschallschweißen", url: baseUrl + "html/prozesse/schweissprozesse.html" },
      { name: "Widerstandsschweißen", url: baseUrl + "html/prozesse/schweissprozesse.html" },
      { name: "Reibschweißen", url: baseUrl + "html/prozesse/schweissprozesse.html" },
      { name: "Thermokompressionsschweißen", url: baseUrl + "html/prozesse/schweissprozesse.html" },


      { name: "Zuführprozesse", url: baseUrl + "html/prozesse/zufuehrprozesse.html" },
      { name: "Transportbandsysteme", url: baseUrl + "html/prozesse/zufuehrprozesse.html" },
      { name: "Palettier-Systeme", url: baseUrl + "html/prozesse/zufuehrprozesse.html" },
      { name: "Robotertechnik", url: baseUrl + "html/prozesse/zufuehrprozesse.html" },
      { name: "Linear- und Radialzuführsysteme", url: baseUrl + "html/prozesse/zufuehrprozesse.html" },

      // Subanlagen > Pumpen
      { name: "Nutzfahrzeug", url: baseUrl + "html/anlagen/subanlagen/pumpen.html" },
      { name: "Hydraulische Flügelpumpen", url: baseUrl + "html/anlagen/subanlagen/pumpen/hydraulischefluegelpumpen.html" },
      { name: "Ölpumpen", url: baseUrl + "html/anlagen/subanlagen/pumpen/oelpumpen.html" },

      // Subanlagen > Ventile
      { name: "Elektrische Umschaltventile", url: baseUrl + "html/anlagen/subanlagen/ventile/elektrischeumschaltventile.html" },
      { name: "Ölschaltventile", url: baseUrl + "html/anlagen/subanlagen/ventile/oelschaltventile.html" },
      { name: "Schubumluftventile", url: baseUrl + "html/anlagen/subanlagen/ventile/schubumluftventile.html" },
      { name: "Abgasregelsysteme", url: baseUrl + "html/anlagen/subanlagen/abgasregelsysteme.html" },
      { name: "Ventile", url: baseUrl + "html/anlagen/subanlagen/ventile.html" },
      { name: "Rauchmelder", url: baseUrl + "html/anlagen/subanlagen/rauchmelder.html" },
  ];

  // Create a suggestions container dynamically
  const suggestionsBox = document.createElement("ul");
  suggestionsBox.classList.add("search-suggestions");
  searchContainer.appendChild(suggestionsBox);

  // Style the suggestions box
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

  // Function to filter search suggestions
  function filterSuggestions(query) {
      return searchSuggestions.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
      );
  }

  // Function to update suggestions list
  function updateSuggestions() {
      const query = searchInput.value.trim();
      suggestionsBox.innerHTML = "";

      if (query.length === 0) {
          suggestionsBox.style.display = "none";
          return;
      }

      const filtered = filterSuggestions(query);

      filtered.forEach(suggestion => {
          const li = document.createElement("li");
          li.textContent = suggestion.name;
          li.style.padding = "8px";
          li.style.cursor = "pointer";
          li.style.borderBottom = "1px solid #888";
          li.style.color = "white";
          li.style.fontSize = "1.5rem";
          li.style.listStyle = "none";

          li.addEventListener("mouseover", () => {
              li.style.background = "#555";
          });

          li.addEventListener("mouseout", () => {
              li.style.background = "transparent";
          });

          li.addEventListener("click", () => {
              window.location.href = suggestion.url;
          });

          suggestionsBox.appendChild(li);
      });

      suggestionsBox.style.display = filtered.length > 0 ? "block" : "none";
  }

  // Event listener for input field
  searchInput.addEventListener("input", updateSuggestions);

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
      if (!searchContainer.contains(e.target)) {
          suggestionsBox.style.display = "none";
      }
  });
});



