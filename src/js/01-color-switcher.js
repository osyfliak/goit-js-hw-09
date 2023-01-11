const refs = {
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

refs.buttonStop.disabled = true;
refs.buttonStart.addEventListener('click', onTabButtonStart);
refs.buttonStop.addEventListener('click', onTabButtonStop);

function onTabButtonStart() {
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;

    timerIdd = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000); 
}

function onTabButtonStop() {
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;

    clearInterval(timerIdd);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}