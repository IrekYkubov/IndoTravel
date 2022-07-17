import showModal from './modal.js';
const body = document.querySelector('body');
const reservationForm = document.querySelector('.reservation__form');
const reservationName = reservationForm.querySelector('#reservation__name');
const reservationPhone = reservationForm.querySelector('#reservation__phone');
const dataSelect = reservationForm.querySelector('#reservation__date');
const reservationPeople = reservationForm.querySelector('#reservation__people');
const reservationButton = reservationForm.querySelector('.reservation__button');
const reservationPrice = reservationForm.querySelector('.reservation__price');
const reservationData = reservationForm.querySelector('.reservation__data');
const footerForm = document.querySelector('.footer__form');
const URL = 'https://jsonplaceholder.typicode.com/posts';

const httpRequest = (url, {
  method = 'GET',
  callback,
  body = {},
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }
    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        callback(new Error(xhr.status), xhr.response);
        return;
      }
      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    });
    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.response);
    });

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
  }
};

reservationButton.addEventListener('click', async (e) => {
  const inform = {
    date: reservationForm.dates.value,
    price: reservationPrice.textContent,
    people: reservationForm.people.value,
    phone: reservationForm.phone.value,
  };
  e.preventDefault();
  if (inform.date && inform.price && inform.people && inform.phone) {
    showModal('', inform);
  } else {
    reservationData.textContent = 'Заполните поля';
  }
});
body.addEventListener('click', (e) => {
  if (e.target.closest('.modal__btn_confirm')) {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 2000);
    reservationName.disabled = true;
    reservationPhone.disabled = true;
    dataSelect.disabled = true;
    reservationPeople.disabled = true;

    httpRequest(URL, {
      method: 'POST',
      body: {
        title: reservationForm.name.value,
        body: `
          Дата: ${reservationForm.dates.value} 
          Количество человек ${reservationForm.people.value}
          Номер телефона ${reservationForm.phone.value}
        `,
      },
      callback(err, data) {
        if (err) {
          const h2 = document.createElement('h2');
          h2.style.color = 'red';
          h2.textContent = err;
          reservationForm.append(h2);
        }
        modal.textContent = `
          Заявка отправлена, номер заказа ${data.id}
        `;
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  httpRequest(URL, {
    method: 'POST',
    body: {
      title: 'Заявка через email',
      body: `email клиента: ${footerForm.email.value}`,
    },
    callback(err, data) {
      if (err) {
        const p = document.createElement('p');
        p.style.color = 'red';
        p.textContent = `Ошибка отправки, попробуйте позже`;
        footerForm.append(p);
      }
      footerForm.textContent = `
        Заявка на обратную связь, отправлена!
      `;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
