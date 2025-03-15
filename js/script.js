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
          li.style.color = "#444444";
          li.style.fontSize = "1.5rem";
          li.style.listStyle = "none";

          li.addEventListener("mouseover", () => {
              li.style.background = "#";
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

  searchTrigger.addEventListener("click", openSearch);

  function openSearch() {
      searchContainer.classList.add("active"); // Show search container
      searchInput.focus(); // Auto-focus input
  }
});



/*------------Cookies-------------*/

document.addEventListener("DOMContentLoaded", async function () {
    document.body.insertAdjacentHTML("beforeend", `
        <div id="cookie-banner" class="cookie-banner border">
            <div id="cookie-bubble" class="cookie-bubble">
                <svg fill="#e5e5e5" width="40px" height="40px" viewBox="0 0 24 24" id="cookie" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color">
                    <line x1="9.05" y1="9.5" x2="8.95" y2="9.5" style="fill: none; stroke: #e5e5e5; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <line x1="9.55" y1="15" x2="9.45" y2="15" style="fill: none; stroke: #e5e5e5; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <line x1="14.55" y1="14" x2="14.45" y2="14" style="fill: none; stroke: #e5e5e5; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <path d="M18.12,9.78a3,3,0,0,1-3.9-3.9A3,3,0,0,1,12,3a9,9,0,1,0,9,9A3,3,0,0,1,18.12,9.78Z" style="fill: none; stroke: #e5e5e5; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                </svg>
            </div>
            <div id="cookie-content" class="cookie-content">
                <p>Auf dieser Website nutzen wir Cookies zur Verarbeitung von Endgeräteinformationen. Die Verarbeitung dient der Gewährleistung grundlegender Funktionen und der Einbindung externer Inhalte und Dienste Dritter (z. B. Google Fonts, YouTube, Google Maps). Je nach Funktion können dabei Daten an Dritte weitergegeben und dort verarbeitet werden. Mehr Informationen hierzu finden Sie im <a href="https://webeesign.com/sandbox/TeamAuto/html/impressum.html" style="color: #e5e5e5;">Impressum</a>.

                    <br><br>Sie können Ihre Zustimmung jederzeit ändern oder widerrufen.
                </p>
                <div id="cookie-settings">
                    <label><input type="checkbox" id="essential" disabled checked> Essenziell</label><br>
                    <label class="tooltip">
                        <input type="checkbox" id="marketing" checked> 
                        <span class="tooltip-title">Marketing</span>
                        <span class="tooltip-text">YouTube, Google Maps</span>
                    </label>
                    <label style="display:none;"><input type="checkbox" id="analytics" checked> Analytics (Google Analytics)</label><br>
                </div>
                <div class="buttons-grid">
                    <button id="accept-all" class="cookie-btn accept">Alle Akzeptieren</button>
                    <button id="reject-all" class="cookie-btn reject">Optionale Ablehnen</button>
                    <button id="save-settings" class="cookie-btn save">Einstellungen Speichern</button>
                </div>
            </div>
        </div>
    `);

    // Check for stored consent and update the checkbox state accordingly.
    const storedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (storedConsent) {
        // Update the marketing & analytics checkboxes to reflect stored state.
        document.getElementById("marketing").checked = storedConsent.marketing;
        if (document.getElementById("analytics")) {
            document.getElementById("analytics").checked = storedConsent.analytics;
        }
    }

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
        // Check the boxes so they reflect "all accepted."
        document.getElementById("marketing").checked = true;
        if (document.getElementById("analytics")) {
            document.getElementById("analytics").checked = true;
        }

        // Save that to localStorage
        localStorage.setItem("cookieConsent", JSON.stringify({ analytics: true, marketing: true }));
        applyCookieSettings();
        closeCookieBanner();
    });

    document.getElementById("reject-all").addEventListener("click", function () {
        // Uncheck the marketing box (and analytics if needed).
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
            if (consent.analytics) {
                loadGoogleAnalytics();
            }

            if (consent.marketing) {
                enableMarketingContent();
                
                // Show all iframes
                document.querySelectorAll("iframe").forEach(iframe => {
                    iframe.style.display = "block";
                });

                // Hide all .cookie-rejected elements
                document.querySelectorAll(".cookie-rejected").forEach(el => {
                    el.style.display = "none";
                });

            } else {
                // Hide all iframes
                document.querySelectorAll("iframe").forEach(iframe => {
                    iframe.style.display = "none";
                });

                // Show all .cookie-rejected elements
                document.querySelectorAll(".cookie-rejected").forEach(el => {
                    el.style.display = "flex"; // Ensure flex/grid works
                });
            }
        } else {
            // Default state: Hide all iframes and show all .cookie-rejected elements
            document.querySelectorAll("iframe").forEach(iframe => {
                iframe.style.display = "none";
            });

            document.querySelectorAll(".cookie-rejected").forEach(el => {
                el.style.display = "flex"; // Ensures visibility
            });
        }
    }

    function loadGoogleAnalytics() {
        let script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X";
        document.head.appendChild(script);
        script.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'UA-XXXXXXX-X');
        };
    }

    function enableMarketingContent() {
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
    overlay.style.opacity = (currentPage === "index.html" || currentPage === "") ? "0" : "1";
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
            let target = event.target.closest("a");

            if (target && target.href && target.target !== "_blank" &&
                !target.href.startsWith("#") && !target.download) {
                event.preventDefault(); // Prevent instant navigation
                showOverlayBeforeNavigation(); // Fade in the overlay
                setTimeout(() => {
                    window.location.href = target.href; // Navigate after transition
                }, 500); // Match transition time
            }
        });
    });
})();








