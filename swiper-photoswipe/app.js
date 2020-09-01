/*SWIPER ################################### */
var mySwiper = new Swiper(".swiper-container", {
    // If swiper loop is true set photoswipe counterEl: false (line 175 her)
    loop: true,
    /* slidesPerView || auto - if you want to set width by css like flickity.js layout - in this case width:80% by CSS */
    slidesPerView: "auto",
    spaceBetween: 7,
    centeredSlides: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });