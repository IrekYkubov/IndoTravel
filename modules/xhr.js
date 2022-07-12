const reservationForm = document.querySelector('.reservation__form');
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


reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
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
      reservationForm.textContent = `
        Заявка отправлена, номер заказа ${data.id}
      `;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
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
