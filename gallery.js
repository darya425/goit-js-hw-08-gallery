import itemsGallery from "./gallery-items.js";

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay');
const btnModal = document.querySelector('[data-action="close-lightbox"]');

const itemsMarkup = createGalleryItemsMarkup(itemsGallery); //дала разметке имя

gallery.insertAdjacentHTML('beforeend', itemsMarkup); // запарсила строку в картинки
gallery.addEventListener('click', onItenContainerClick); // слушатель для открытия модалки
btnModal.addEventListener('click', removeActiveClass); // слушатель для закрытия модалки
backdrop.addEventListener('click', removeActiveClass);


//создала разметку
function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
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
  }).join('');
}

// мероприятие при открытии модалки
function onItenContainerClick(evt) {
  evt.preventDefault();
  const isItemClick = evt.target.classList.contains('gallery__image');
  
  if (!isItemClick) {
    return;
  }

  const galleryItem = evt.target;
  const imgLink = galleryItem.dataset.source;
  const imgDescr = galleryItem.alt;

  addActiveClass(modal);
  setItemLink(imgLink, imgDescr);
}

// добавила класс
function addActiveClass(item) {
  window.addEventListener('keydown', onEscCloseModal); // повесила событие клавиши только при открытой модалке
  backRef.addEventListener('click', onClickLeftBtn); // слушатель для перемотки влево
  window.addEventListener('keydown', onLeftKeyClick); 
  nextRef.addEventListener('click', onClickRightBtn); // слушатель для перемотки вправо
  window.addEventListener('keydown', onRightKeyClick);

  item.classList.add('is-open');
}

//подмена линка
function setItemLink(link, descr) {
  modalImg.src = link;
  modalImg.alt = descr;
}

// удалила класс и очистила ссылки
function removeActiveClass() {
    window.removeEventListener('keydown', onEscCloseModal); // сняла событие клавиши после закрытия модалки
    backRef.removeEventListener('click', onClickLeftBtn); // слушатель для перемотки влево
    window.removeEventListener('keydown', onLeftKeyClick); 
    nextRef.removeEventListener('click', onClickRightBtn); // слушатель для перемотки вправо
    window.removeEventListener('keydown', onRightKeyClick);

    const currentActiveModal = document.querySelector('.js-lightbox.is-open'); // нашла ситуацию, когда класс нужно убирать
    
    if (currentActiveModal) {
      currentActiveModal.classList.remove('is-open'); // в этом случае и удалила
      modalImg.src = "";
      modalImg.alt = "";
    }
}

function onEscCloseModal(evt) { // повесила событие только на ESC
    
    if (evt.code === 'Escape') {
      removeActiveClass(); 
    }
}


// Карусель

modal.insertAdjacentHTML('beforeend',
  `<button type="button" class="lightbox__button left" data-action="next-lightbox"></button> 
  <button type="button" class="lightbox__button right" data-action="next-lightbox"></button> 
`);


const backRef = document.querySelector('.lightbox__button.left'); // кнопка влево
const nextRef = document.querySelector('.lightbox__button.right'); // кнопка вправо
const imagesRef = document.querySelectorAll('.gallery__image'); // все фотки

let currentImg = 0;

// стучим по кнопке вправо
function onRightKeyClick(evt) {
  if (evt.code === "ArrowRight") {
    onClickRightBtn()
  }
}

// стучим по кнопке влево
function onLeftKeyClick(evt) {
  if (evt.code === "ArrowLeft") {
    onClickLeftBtn()
  }
}


// правая стрелка
function onClickRightBtn() {
  
  if (currentImg === imagesRef.length - 1) {
    currentImg = 0;
  } else {
    currentImg += 1;
  }

  modalImg.src = imagesRef[currentImg].dataset.source;
}

// левая стрелка
function onClickLeftBtn() {
  
  if (currentImg === 0) {
    currentImg = imagesRef.length - 1;
  } else {
    currentImg -= 1;
  }

  modalImg.src = imagesRef[currentImg].dataset.source;
}

// В ЧЕМ ПРОБЛЕМА ЭТОГО КОДА?

// // правая кнопка
// function onClickRightBtn() {
//   currentImg += 1;
//   if (currentImg === (imagesRef.length - 1)) {
//     nextRef.disabled = true;
//   }
//   modalImg.src = imagesRef[currentImg].dataset.source;
// }

// // левая кнопка
// function onClickLeftBtn() {
//   currentImg -= 1;
//   if (currentImg === 0) {
//     backRef.disabled = true;
//   }
//   modalImg.src = imagesRef[currentImg].dataset.source;
// }