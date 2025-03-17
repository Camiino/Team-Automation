document.addEventListener('commonSectionsLoaded', function () {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 0);
    hamburger.classList.toggle("scrolled", window.scrollY > 0);
  });
});