"use strict";
//      header's text spiner
const headerSpiner = function () {
    const text = document.querySelector('.spin__text');
    text.innerHTML = text.textContent.replace(/\S/g, '<span>$&</span>');
    const letters = document.querySelectorAll('p.spin__text span');

    for (let i = 0; i < letters.length; i++) {
        letters[i].style.transform = "rotate(" + i * 15 + "deg)"
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

}

headerSpiner();


//   TIMER

const weddingDay = 'September 30 2023 11:00:00 GMT+04:00';

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

//      let;s try to optimize code
function initializetimer(selector, endtime) {
    let timer = document.querySelector(selector);

    const daysSpan = timer.querySelector('.days');
    const hoursSpan = timer.querySelector('.hours');
    const minutesSpan = timer.querySelector('.minutes');

    function updatetimer() {
        let t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = t.hours;
        minutesSpan.innerHTML = t.minutes;

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    updatetimer();
    const timeInterval = setInterval(updatetimer, 1000);
}

initializetimer('.second__timer', weddingDay);