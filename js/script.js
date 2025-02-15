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


