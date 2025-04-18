import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { renderPhotoList, clearGallery } from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
  inputEl: document.querySelector('.input-value'),
  loadingEl: document.querySelector('.loading'),
  loadMoreEl: document.querySelector('.btn-load-more'),
};

let query = '';
let page = 1;
let totalPages = 0;

function showLoader() {
  refs.loadingEl.style.display = 'block';
}

function hideLoader() {
  refs.loadingEl.style.display = 'none';
}

function showLoadMoreButton() {
  refs.loadMoreEl.classList.remove('btn-load-more-hidden');
}

function hideLoadMoreButton() {
  refs.loadMoreEl.classList.add('btn-load-more-hidden');
}

refs.formEl.addEventListener('submit', async evt => {
  evt.preventDefault();
  page = 1;
  query = refs.inputEl.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: '❌ Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const responseGetImages = await getImagesByQuery(query, page);
    hideLoader();
    totalPages = Math.ceil(responseGetImages.data.totalHits / 15); //округление в большую сторону
    if (responseGetImages.data.hits.length === 0 && refs.inputEl.value !== '') {
      // Если нет изображений, показываем сообщение
      iziToast.error({
        title: 'Error',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    } else {
      // Если есть изображения, скрываем сообщение
      renderPhotoList(responseGetImages.data.hits);
      if(totalPages > 1){
        showLoadMoreButton();
      }
    }
  } catch (error) {
    hideLoadMoreButton();
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `❌ Something went wrong!`,
      position: 'topRight',
    });
  }
});

refs.loadMoreEl.addEventListener('click', async () => {
  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.error({
      title: 'Error',
      message: `❌ We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    });
    return;
  }

  showLoader();
  hideLoadMoreButton();

  page++;

  try {
    const responseGetImages = await getImagesByQuery(query, page);
    hideLoader();

    renderPhotoList(responseGetImages.data.hits);

    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.error({
        title: 'Error',
        message: `❌ We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }
  
  } catch (error) {
    hideLoadMoreButton();
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: `❌ Something went wrong!`,
      position: 'topRight',
    });
  }
});
