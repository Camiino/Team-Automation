const stickyElm = document.querySelector(".mini-nav");
let ticking = false;

function updateSticky() {
  // Get the computed top value (if using safe-area adjustments, add that here)
  const computedStyle = window.getComputedStyle(stickyElm);
  const stickyTop = parseFloat(computedStyle.top); // May include safe area if defined via CSS
  const currentTop = stickyElm.getBoundingClientRect().top;
  
  // Use a tolerance of 1px (adjust if needed)
  if (Math.abs(currentTop - stickyTop) < 1) {
    stickyElm.classList.add("isSticky");
  } else {
    stickyElm.classList.remove("isSticky");
  }
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateSticky();
      ticking = false;
    });
    ticking = true;
  }
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
