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
  const result = data.filter(item => item.date === strDate);
  if (optItem[1]) {
    if (optItem[1].value != result[0]['min-people'] ||
    optItem[optItem.length - 1].value != result[0]['max-people']) {
      console.log(`${optItem[1].value} ${result[0]['min-people']}`);
      optItem.forEach(item => {
        item.remove();
      });
      tourPeople.insertAdjacentHTML('beforeend', `
        <option value="" selected class="tour__option">
          Количество человек
        </option>
      `);
    }
  }
  if (result) {
    result.forEach(element => {
      for (let i = element['min-people']; i <= element['max-people']; i++) {
        const opt = document.createElement('option');
        opt.classList.add('tour__option');
        opt.value = `${i}`;
        opt.textContent = `
          ${i}
        `;
        tourPeople.append(opt);
      }
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
  const result = data.filter(item => item.date === strDate);
  if (optItem[1]) {
    if (optItem[1].value != result[0]['min-people'] ||
    optItem[optItem.length - 1].value != result[0]['max-people']) {
      console.log(`${optItem[1].value} ${result[0]['min-people']}`);
      optItem.forEach(item => {
        item.remove();
      });
      reservationPeople.insertAdjacentHTML('beforeend', `
        <option value="" selected class="tour__option reservation__option">
          Количество человек
        </option>
      `);
    }
  }
  if (result) {
    result.forEach(element => {
      for (let i = element['min-people']; i <= element['max-people']; i++) {
        const opt = document.createElement('option');
        opt.classList.add('tour__option', 'reservation__option');
        opt.value = `${i}`;
        opt.textContent = `
          ${i}
        `;
        reservationPeople.append(opt);
      }
    });
    const objItem = result[0];
    if (reservationPeople.value) {
      reservationPrice.textContent = `
        ${objItem.price * reservationPeople.value}₽
        `;
    }
    if (reservationPeople.value) {
      dataBottom.textContent = `
      ${objItem.date},
      ${reservationPeople.value} человек
    `;
    }
  }
});
