const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');
let opacity = 0;

const showOpacity = () => {
  opacity += 0.1;
  headerMenu.style.opacity = opacity;
  headerMenu.style.zIndex = 1;
  if (opacity < 1) {
    requestAnimationFrame(showOpacity);
  } else {
    return;
  }
};
const hideOpacity = () => {
  opacity -= 0.1;
  headerMenu.style.opacity = opacity;
  if (opacity > 0) {
    requestAnimationFrame(hideOpacity);
  } else {
    headerMenu.style.zIndex = -1;
  }
};


body.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.header__menu-button')) {
    if (headerMenu.style.opacity >= 1) {
      hideOpacity();
    } else {
      showOpacity();
    }
  }
  if (target.closest('.header__link')) {
    if (headerMenu.style.opacity >= 1) {
      hideOpacity();
    }
  }
  if (target.closest('main')) {
    if (headerMenu.style.opacity >= 1) {
      hideOpacity();
    }
  }
});
