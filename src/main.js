import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { renderPhotoList, clearGallery } from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.form'),
  inputEl: document.querySelector('.input-value'),
  loadingEl: document.querySelector('.loading'),
};

function showLoader() {
  refs.loadingEl.style.display = 'block';
}

function hideLoader() {
  refs.loadingEl.style.display = 'none';
}

refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();

  const query = refs.inputEl.value.trim();

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

  getImagesByQuery(query, page)
    .then(response => {
      hideLoader(); // Скрываем спиннер с задержкой
      if (response.data.hits.length === 0 && refs.inputEl.value !== '') {
        // Если нет изображений, показываем сообщение
        iziToast.error({
          title: 'Error',
          message: `❌ Sorry, there are no images matching your search query. Please try again!`,
          position: 'topRight',
        });
      } else {
        // Если есть изображения, скрываем сообщение
        renderPhotoList(response.data.hits);
      }
    })
    .catch(error => {
      refs.loadingEl.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: `❌ Something went wrong!`,
        position: 'topRight',
      });
    });
});
