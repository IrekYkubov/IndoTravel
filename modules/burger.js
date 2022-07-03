const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

body.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.header__menu-button')) {
    headerMenu.classList.toggle('header__menu_active');
  }
  if (target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
  }
  if (target.closest('main')) {
    headerMenu.classList.remove('header__menu_active');
  }
});
