/* ------------- Header ------------- */

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

/* ------------- Menu ------------- */

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const close = document.getElementById("close");

hamburger.addEventListener("click", () => {
  menu.classList.add("open");
});

close.addEventListener("click", () => {
  menu.classList.remove("open");
});

/* ------------- Search ------------- */

const searchBox = document.querySelector(".search-box");
const searchContainer = document.querySelector(".search-container");
searchBox.addEventListener("click", () => {
  if (searchContainer.classList.contains("active")) {
    searchContainer.classList.remove("active");
  } else {
    searchContainer.classList.add("active");
  }
});

searchContainer.addEventListener("mousedown", (e) => {
  if (e.target === searchContainer) {
    searchContainer.classList.remove("active");
  }
});

/* ------------- Language ------------- */

const language = document.querySelector(".language");
const languageDropdown = document.querySelector(".language-dropdown");

language.addEventListener("click", () => {
  languageDropdown.classList.toggle("active");
});
