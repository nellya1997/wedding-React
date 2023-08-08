//      header's text spiner
const headerSpiner = () => {
  const text = document.querySelector('.spin__text');
  text.innerHTML = text.textContent.replace(/\S/g, '<span>$&</span>');
  const letters = document.querySelectorAll('p.spin__text span');

  for (let i = 0; i < letters.length; i += 1) {
    letters[i].style.transform = `rotate(${i * 15}deg)`;
  }

  /*
    //очень интересно почему не получается преследование курсора
    document.addEventListener('mousemove', function (e) {
        text.style.left = e.clientX + 'px';
        text.style.top = e.clientY + 'px';

        console.log(e.clientX);
        console.log(e.clientY);
    });
    */
};

headerSpiner();

//   TIMER

const weddingDay = 'September 30 2023 11:00:00 GMT+04:00';

function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days,
    hours,
    minutes,
    seconds,
  };
}

//      let;s try to optimize code
function initializetimer(selector, endtime) {
  const timer = document.querySelector(selector);

  const daysSpan = timer.querySelector('.days');
  const hoursSpan = timer.querySelector('.hours');
  const minutesSpan = timer.querySelector('.minutes');

  const updatetimer = () => {
    const t = getTimeRemaining(endtime);
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = t.hours;
    minutesSpan.innerHTML = t.minutes;

    const timeInterval = setInterval(updatetimer, 1000);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  };

  updatetimer();
}

initializetimer('.second__timer', weddingDay);
