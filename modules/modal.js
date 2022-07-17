import loadStyle from './loadStyle.js';
const showModal = async (err, data) => {
  await loadStyle('css/modal.css');
  const overlay = document.createElement('div');
  const modalWindow = document.createElement('div');
  const title = document.createElement('h2');
  const textTur = document.createElement('p');
  const dataTur = document.createElement('p');
  const priceTur = document.createElement('p');
  const btnContainer = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnEdit = document.createElement('button');
  overlay.classList.add('overlay', 'overlay_confirm');
  modalWindow.classList.add('modal');
  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';
  textTur.classList.add('modal__text');
  textTur.textContent = `
    Бронирование путешествия в Индонезию на ${data.people} человек
  `;
  dataTur.classList.add('modal__text');
  dataTur.textContent = `В даты: ${data.date}`;
  priceTur.classList.add('modal__text');
  priceTur.textContent = `Стоимость тура ${data.price}`;
  btnContainer.classList.add('modal__button');
  btnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  btnConfirm.textContent = 'Подтверждаю';
  btnEdit.classList.add('modal__btn', 'modal__btn_edit');
  btnEdit.textContent = 'Изменить данные';
  btnContainer.append(btnConfirm, btnEdit);
  overlay.append(modalWindow);
  modalWindow.append(title, textTur, dataTur, priceTur, btnContainer);
  btnEdit.addEventListener('click', () => {
    overlay.remove();
  });
  document.body.append(overlay);
};
export default showModal;
