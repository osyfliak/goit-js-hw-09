import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
}
refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);


  for (let i = 1; i <= amount; i += 1){
    console.log("doing");
   
    const newDelay = delay + step * (i - 1);

    createPromise(i, newDelay)
      .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
 
  })
      .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  
  });
  }

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 

  return new Promise((resolve, reject) => {
    setTimeout(() => {
  if (shouldResolve) {
     resolve({ position, delay })
  } else {
    reject({ position, delay })
  }
 }, delay)
  })
  
}
