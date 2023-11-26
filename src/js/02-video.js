// Імпорт бібліотек та класу Player
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Отримання посилання на iframe
const iframe = document.getElementById('vimeo-player');

// Створення екземпляру плеєра
const player = new Player(iframe);

// Оголошення функції для оновлення локального сховища з використанням throttle
const updateLocalStorage = throttle(() => {
    player.getCurrentTime().then((currentTime) => {
        localStorage.setItem('videoplayer-current-time', currentTime);
    });
}, 1000);

// Встановлення відстеження події timeupdate
player.on('timeupdate', updateLocalStorage);

// Відновлення часу відтворення під час перезавантаження сторінки
const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
    player.setCurrentTime(storedTime);
}

