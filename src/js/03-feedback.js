import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageTextarea = form.querySelector('[name="message"]');
const feedbackFormStateKey = 'feedback-form-state';

// Отримати збережені дані з локального сховища
const savedState = JSON.parse(localStorage.getItem(feedbackFormStateKey)) || {};

// Заповнити поля форми зі збереженими даними
emailInput.value = savedState.email || '';
messageTextarea.value = savedState.message || '';

// Відстежувати подію input і оновлювати локальне сховище з використанням throttle
form.addEventListener('input', throttle(updateLocalStorage, 500));

// Відстежувати подію submit і очищати локальне сховище та поля форми
form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearLocalStorageAndForm();
});

// Оновлення локального сховища
function updateLocalStorage() {
  const currentState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Зберегти об'єкт стану в локальному сховищі
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(currentState));
}

// Очистка локального сховища та полів форми
function clearLocalStorageAndForm() {
  // Вивести у консоль об'єкт з полями email та message та їхніми поточними значеннями
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData);

  // Очистити локальне сховище
  localStorage.removeItem(feedbackFormStateKey);

  // Очистити поля форми
  emailInput.value = '';
  messageTextarea.value = '';
}

