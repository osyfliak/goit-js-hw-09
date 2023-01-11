import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentDate = new Date();
      if (selectedDates[0] < currentDate) {
          Notify.failure("Please choose a date in the future");
          refs.buttonStart.disabled = true;
      } else {
          refs.buttonStart.disabled = false;
      }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.buttonStart.addEventListener('click', onButtonStartClick);
 
function onButtonStartClick() {

  intervalId = setInterval(() => {
    const time = new Date(refs.inputDate.value) - new Date();
    if (time >= 0) {
      const timeList = convertMs(time);
      addTime(timeList);

    } else {
      clearInterval(intervalId);
      return Notify.success('Виконано');
    }
    }, 1000)
}

function addTime({days, hours,  minutes, seconds  }) {
refs.days.textContent = addLeadingZero(days);
refs.hours.textContent = addLeadingZero(hours);
refs.minutes.textContent = addLeadingZero(minutes);
refs.seconds.textContent = addLeadingZero(seconds);
}



function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}




