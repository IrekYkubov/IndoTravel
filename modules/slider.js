new Swiper('.album__slider', {
  dloop: true,
  autoPlay: {
    delay: 3000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
});

