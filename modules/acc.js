const travelItem = document.querySelectorAll('.travel__item ');
const travelItemTitle = document.querySelectorAll('.travel__item-title');

let heightWrapper = 0;
travelItem.forEach(elem => {
  if (heightWrapper < elem.scrollHeight) {
    heightWrapper = elem.scrollHeight;
  }
});

travelItemTitle.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    for (let i = 0; i < travelItem.length; i++) {
      if (index === i) {
        travelItem[i].style.height =
          travelItem[i].classList.contains('travel__item_active') ? '' :
          `${heightWrapper}px`;
        travelItem[i].classList.toggle('travel__item_active');
      } else {
        travelItem[i].classList.remove('travel__item_active');
        travelItem[i].style.height = '';
      }
    }
  });
});
