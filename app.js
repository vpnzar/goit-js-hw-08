const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const imageGallery = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalBigImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const backdrop = document.querySelector('.lightbox__overlay');
let current = undefined;

closeModalBtn.addEventListener('click', closeModalAction);

imageGallery.addEventListener('click', openModalWindow);
backdrop.addEventListener('click', onBackdropClose);

imageGallery.insertAdjacentHTML(
  'beforeend',
  createImagesGalleryMarkup(galleryItems)
);

function createImagesGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}

function openModalWindow(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyClose);
  window.addEventListener('keydown', modalImageSlider);

  console.log(e.target.dataset.source);
  modalWindow.classList.add('is-open');
  modalBigImage.src = `${e.target.dataset.source}`;
  current = e.target.src;
}

function closeModalAction() {
  window.removeEventListener('keydown', onEscKeyClose);
  modalWindow.classList.remove('is-open');
  modalBigImage.src = '';
}

function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    closeModalAction();
  }
}

function onEscKeyClose(e) {
  if (e.code === 'Escape') {
    closeModalAction();
  }
}

function modalImageSlider(e) {
  const elements = imageGallery.querySelectorAll('.gallery__image');
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute('id', i + 1);
  }

  const array = Array.prototype.slice.call(elements);
  const currentElem = array.filter(elem => elem.src === current);
  const intId = parseInt(currentElem[0].id);
  let nextId = intId;
  if (e.code === 'ArrowLeft') {
    if (intId > 1) {
      nextId = intId - 1;
    } else {
      nextId = elements.length;
    }
  } else if (e.code === 'ArrowRight') {
    if (intId < elements.length) {
      nextId = nextId + 1;
    } else {
      nextId = 1;
    }
  }
  const nextElem = array.filter(elem => elem.id === `${nextId}`);
  modalBigImage.src = nextElem[0].dataset.source;
  current = nextElem[0].src;
}
