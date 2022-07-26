const inputTel = document.querySelector('#reservation__phone');
const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(inputTel);
const inputValid = new JustValidate('.reservation__form');
inputValid
    .addField('#reservation__date', [
      {
        rule: 'required',
        errorMessage: 'Укажите дату',
      },
    ])
    .addField('#reservation__people', [
      {
        rule: 'required',
        errorMessage: 'Укажите количество человек!',
      },
    ])
    .addField('#reservation__name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше ФИО',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Не короче 3 символов',
      },
      {
        rule: 'maxLength',
        value: 40,
        errorMessage: 'Слишком длинное',
      },
    ])
    .addField('#reservation__phone', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш номер',
      },
    ]);
