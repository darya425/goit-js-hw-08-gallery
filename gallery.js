import itemsGallery from "./gallery-items.js";

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');
const btnModal = document.querySelector('[data-action="close-lightbox"]');

const itemsMarkup = createGalleryItemsMarkup(itemsGallery); //дала разметке имя

//создала разметку
function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
                  <a
                    class="gallery__link"
                    href="${original}"
                  >
                    <img
                      class="gallery__image"
                      src="${preview}"
                      data-source="${original}"
                      alt="${description}"
                    />
                  </a>
                </li>`
      })
    .join('');
}

modal.insertAdjacentHTML('beforeend',
  `<button type="button" class="lightbox__button left" data-action="next-lightbox"></button> 
  <button type="button" class="lightbox__button right" data-action="next-lightbox"></button> 
`);

const backRef = document.querySelector('.lightbox__button.left'); // кнопка влево
const nextRef = document.querySelector('.lightbox__button.right'); // кнопка вправо

gallery.insertAdjacentHTML('beforeend', itemsMarkup); // запарсила строку в картинки
gallery.addEventListener('click', openModal); // слушатель для открытия модалки
btnModal.addEventListener('click', onCloseModal); // слушатель для закрытия модалки
backdrop.addEventListener('click', onBackdropClick); // слушатель закрытия модалки по клику в бэкдроп

// мероприятие при открытии модалки
function openModal(evt) {
    evt.preventDefault(); // убрала поведение по умолчанию
    window.addEventListener('keydown', onPressEsc); // закрытие модалки на ESC работает только при открытой модалке
    window.addEventListener('keydown', onArrowRight); // при открытой модалке клик по правой стрелке на клаве
    window.addEventListener('keydown', onArrowLeft);
    backRef.addEventListener('click', onLeftNext); // слушатель для перемотки влево
    nextRef.addEventListener('click', onRightNext); // слушатель для перемотки вправо

    if (evt.target === evt.currentTarget) { // если таргет не таргет, то не работает
        return;
    }

    modal.classList.add('is-open'); // добавила класс модалки
    modalImg.src = evt.target.getAttribute('data-source');
    modalImg.alt = evt.target.alt;
}

// закрытие модалки
function onCloseModal() {
    window.removeEventListener('keydown', onPressEsc); // сняла событие клавиши после закрытия модалки
    window.removeEventListener('keydown', onArrowRight); // при закрытой модалке клик по правой стрелке на клавене работает
    window.removeEventListener('keydown', onArrowLeft);
    backRef.removeEventListener('click', onLeftNext); // слушатель для перемотки влево
    nextRef.removeEventListener('click', onRightNext); // слушатель для перемотки вправо

    modal.classList.remove('is-open'); // удалила класс модалки
    modalImg.src = "";
    modalImg.alt = "";  
}

// Закрытие по клавише ESC
function onPressEsc(evt) { // повесила событие только на ESC
    if (evt.code === 'Escape') {
      onCloseModal(); 
    }
}

// Закрытие по клику на бекдроп
function onBackdropClick(evt) {
    if (evt.target === evt.currentTarget) {
            onCloseModal();
    }
}

// Карусель



// стучим по кнопке вправо
function onArrowRight(evt) {
  if (evt.code === "ArrowRight") {
    onRightNext()
  }
}

// стучим по кнопке влево
function onArrowLeft(evt) {
  if (evt.code === "ArrowLeft") {
    onLeftNext()
  }
}


// правая стрелка
function onRightNext() {
    const items = itemsGallery;
    const activeImage = items.find(img => img.original === modalImg.src);
    let index = activeImage ? items.indexOf(activeImage) : 0;
    if (index < items.length - 1) {
        index += 1;
    } else {
        index = 0;
    }
    modalImg.src = items[index].original;
    modalImg.alt = items[index].alt;
}

// левая стрелка
function onLeftNext() {
    const items = itemsGallery;
    const activeImage = items.find(img => img.original === modalImg.src);
    let index = activeImage ? items.indexOf(activeImage) : items.length - 1;
    if (index === 0) {
        index = items.length - 1;
    } else {
        index -= 1;
    }
    modalImg.src = items[index].original;
    modalImg.alt = items[index].alt;
}

