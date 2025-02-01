var swiper = new Swiper(".swiper-about", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

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
  autoplay: false,
  delay: 2000,
  freeMode: true,
  momentum: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    dragSize: 100,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },

    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});
