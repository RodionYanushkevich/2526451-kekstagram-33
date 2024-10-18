const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');

// const windowCloseEvent = function(evt) {
// };

uploadFile.onclick = function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  // document.addEventListener('keydown', windowCloseEvent);
  document.addEventListener('keydown', (e)=> {
    if (e.keyCode === 27) {
      uploadOverlay.classList.add('hidden');
      // return;
    }
  });
};
overlayCloseButton.onclick = function (evt) {
  uploadOverlay.classList.add('hidden');
};


// };
/*

1. Загрузка нового изображения на сайт и заполнение информации о нём
1.1. Загрузка нового изображения:

выбор файла с изображением для загрузки;
изменение масштаба изображения;
применение одного из заранее заготовленных эффектов;
выбор глубины эффекта с помощью ползунка;
добавление текстового комментария;
добавление хэштегов.
1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла .img-upload__input, который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля .img-upload__input), показывается форма редактирования изображения. У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

После выбора изображения пользователем с помощью стандартного контрола загрузки файла .img-upload__input, нужно подставить его в форму редактирования вместо тестового изображения в блок предварительного просмотра и в превью эффектов.

1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку .img-upload__cancel, либо нажатием клавиши Esc. Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open.*/
