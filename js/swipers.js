var swiper2 = new Swiper(".swiper-neuigkeiten", {
  slidesPerView: 3,
  spaceBetween: 60,
  autoplay: false,
  delay: 5000,
  freeMode: true,
  momentum: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragSize: 60,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    640: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

var swiper3 = new Swiper(".swiper-partners", {
  loop: true, 
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false, // Prevents pausing on touch
  },
  speed: 6000,
  slidesPerView: "auto",
  spaceBetween: 30,
  allowTouchMove: false,

  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 10 },
    480: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 30 },
    1024: { slidesPerView: 5, spaceBetween: 30 },
  },
});

