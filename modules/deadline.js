const deadlineElem = document.querySelector('.timer').dataset.timerDeadline;
const timer = (deadline) => {
  const heroText = document.querySelector('.hero__text ');
  const heroTimer = document.querySelector('.hero__timer ');
  const countDays = document.querySelector('.timer__count_days');
  const countHours = document.querySelector('.timer__count_hours');
  const countMinutes = document.querySelector('.timer__count_minutes');
  const unitsDays = document.querySelector('.timer__units_days');
  const unitsHours = document.querySelector('.timer__units_hours');
  const unitsMinutes = document.querySelector('.timer__units_minutes');

  /**
 * @param {int} number The first number.
 * @param {array} titles The second array.
 * @return {str} string.
 */
  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ?
        number % 10 : 5]
    ];
  }
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const moscTime = new Date().toLocaleString('en-US',
        {timeZone: 'Europe/Moscow'});
    const nowMosc = Date.parse(moscTime);
    const timeRemaining = dateStop - dateNow;
    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days};
  };
  const start = () => {
    const timer = getTimeRemaining();
    if (timer.days !== 0) {
      countDays.textContent = timer.days;
      countHours.textContent = timer.hours;
      countMinutes.textContent = timer.minutes;
      unitsMinutes.textContent = declOfNum(timer.minutes,
          ['минута', 'минуты', 'минут']);
      unitsDays.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);
      unitsHours.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
    } else {
      countDays.textContent = timer.hours;
      countHours.textContent = timer.minutes;
      countMinutes.textContent = timer.seconds;
      unitsMinutes.textContent = declOfNum(timer.seconds,
          ['секунда', 'секунды', 'секунд']);
      unitsDays.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
      unitsHours.textContent = declOfNum(timer.minutes,
          ['минута', 'минуты', 'минут']);
    }

    const interbald = setTimeout(start, 1000);
    if (timer.timeRemaining <= 0) {
      clearTimeout(interbald);
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      heroText.style.display = 'none';
      heroTimer.style.display = 'none';
    }
  };
  start();
};
window.timerHero = timer;
export default {
  deadlineElem,
};
