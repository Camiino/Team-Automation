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
    } else {
      searchContainer.classList.add("active");
      if (menu.classList.contains("open")) {
        burger.click();
      }
    }
  });
});

searchContainer.addEventListener("mousedown", (e) => {
  if (e.target === searchContainer) {
    searchContainer.classList.remove("active");
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
  
  if (scrollY > lastScrollY) { // User is scrolling down
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) { // Element enters the viewport
        el.classList.add('flyIn');
      }
    });
  }

  lastScrollY = scrollY;
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

window.addEventListener("load", () => {
    document.querySelector(".initial-animated-item").classList.add("loaded");
});


