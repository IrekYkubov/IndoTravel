const tourDate = document.querySelector('#tour__date');
const tourPeople = document.querySelector('#tour__people');
const tourForm = document.querySelector('.tour__form');
const reservationForm = document.querySelector('.reservation__form');
const reservationDate = reservationForm.querySelector('#reservation__date');
const reservationPeople = reservationForm.querySelector('#reservation__people');
const dataBottom = reservationForm.querySelector('.reservation__data');
const reservationPrice = reservationForm.querySelector('.reservation__price');

const loadGoods = async () => {
  const result = await fetch('db.json');
  const data = await result.json();
  return data;
};

const renderGoods = async () => {
  const data = await loadGoods();
  const dateItem = data.map(item => {
    const opt = document.createElement('option');
    opt.classList.add('tour__option');
    opt.value = item.date;
    opt.textContent = `${item.date}`;
    return opt;
  });

  const dateRes = data.map(item => {
    const opt = document.createElement('option');
    opt.classList.add('tour__option', 'reservation__option');
    opt.value = `${item.date}`;
    opt.textContent = `${item.date}`;
    return opt;
  });
  tourDate.append(...dateItem);
  reservationDate.append(...dateRes);
};
renderGoods();

tourForm.addEventListener('change', async () => {
  const strDate = tourDate.value;
  const data = await loadGoods();
  const optItem = tourPeople.querySelectorAll('.tour__option');
  if (optItem[1]) {
    optItem[1].remove();
  }
  const result = data.filter(item => item.date === strDate);
  if (result) {
    result.forEach(element => {
      const opt = document.createElement('option');
      opt.classList.add('tour__option');
      opt.value = `${element['min-people']} - ${element['max-people']}`;
      opt.textContent = `
        от ${element['min-people']} до ${element['max-people']}
      `;
      opt.selected = true;
      tourPeople.append(opt);
    });
  }
});

reservationForm.addEventListener('change', async () => {
  const strDate = reservationDate.value;
  if (strDate === '') {
    reservationPrice.textContent = ``;
    dataBottom.textContent = ``;
  }
  const data = await loadGoods();
  const optItem = reservationPeople.querySelectorAll('.tour__option');
  if (optItem[1]) {
    optItem[1].remove();
  }
  const result = data.filter(item => item.date === strDate);
  if (result) {
    result.forEach(element => {
      const opt = document.createElement('option');
      opt.classList.add('tour__option', 'reservation__option');
      opt.value = `${element['min-people']} - ${element['max-people']}`;
      opt.textContent = `
        от ${element['min-people']} до ${element['max-people']}
      `;
      opt.selected = true;
      reservationPeople.append(opt);
    });
    const objItem = result[0];
    reservationPrice.textContent = `${objItem.price}₽`;
    dataBottom.textContent = `
      ${objItem.date},
      от ${objItem['min-people']} до ${objItem['max-people']} человек
    `;
  }
});
