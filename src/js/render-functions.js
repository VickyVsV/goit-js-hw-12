import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

export function renderPhotoList(images) {
  const photoListTemplate = createGallery(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', photoListTemplate);
  lightbox.refresh();
}

export function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

function createGallery(images) {
  return images
    .map(
      image => `
        <li class="gallery-item">
          <div class="image-container">
            <a class="gallery-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" /></a>
          </div>
          <div class="info-container">
            <ul class="img-desc">
              <li><strong>Likes:</strong> ${image.likes}</li>
              <li><strong>Views:</strong> ${image.views}</li>
              <li><strong>Comments:</strong> ${image.comments}</li>
              <li><strong>Downloads:</strong> ${image.downloads}</li>
            </ul>
          </div>
        </li>
      `
    )
    .join('');
}

let lightbox;

lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250,
});