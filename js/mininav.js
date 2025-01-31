const stickyElm = document.querySelector(".mini-nav");

window.addEventListener("scroll", () => {
  const stickyTop = parseInt(window.getComputedStyle(stickyElm).top);
  const currentTop = stickyElm.getBoundingClientRect().top;
  stickyElm.classList.toggle("isSticky", currentTop === stickyTop);
});

const miniNavArrow = document.querySelector(".mini-nav img");

miniNavArrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const miniNavMenu = document.querySelector(".mini-nav-menu");

miniNavMenu.addEventListener("click", () => {
  document.querySelector(".mini-nav").classList.toggle("open");
});
