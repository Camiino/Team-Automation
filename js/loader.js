// Scroll disabling functions (from StackOverflow)
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

// Main preloader script
document.addEventListener("DOMContentLoaded", function () {
    // Check navigation type to see if the page was loaded via back/forward.
    let navType = null;
    if (performance.getEntriesByType("navigation").length > 0) {
      navType = performance.getEntriesByType("navigation")[0].type;
    } else if (performance.navigation) {
      navType = performance.navigation.type;
    }
    
    // If the navigation type indicates a back/forward load, skip the preloader.
    if (navType === "back_forward" || navType === 2) {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.display = "none";
        }
        enableScroll();
        startAnimations();
        return;
    }
    
    // Otherwise, proceed with the preloader.
    // Force the viewport to scroll to the very top.
    window.scrollTo(0, 0);
    
    // Disable scrolling using our custom function.
    disableScroll();
    
    // Ensure the preloader covers the full viewport at the top.
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.position = "fixed";
        preloader.style.top = "0";
        preloader.style.left = "0";
        preloader.style.width = "100%";
        preloader.style.height = "100%";
        preloader.style.zIndex = "9999";
    }
    
    // Start the preloader exit sequence.
    setTimeout(() => {
        preloader.classList.remove("active");
        setTimeout(() => {
            preloader.style.display = "none"; // Hide the preloader after its exit animation.
            // Re-enable scrolling.
            enableScroll();
            // Start any additional animations.
            startAnimations();
            // Force the scroll position to remain at the top.
            window.scrollTo(0, 0);
        }, 1200); // Adjust this value to match your exit animation duration.
    }, 2400); // Adjust this delay as needed.
});
    
// Function to start animations after the preloader is removed.
function startAnimations() {
    document.querySelectorAll(".initial-animated-item").forEach(item => {
        item.classList.add("loaded");
    });
    // Optionally, add any other visibility or animation checks here.
}
