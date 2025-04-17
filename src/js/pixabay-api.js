import axios from 'axios';

const API_KEY = '32675885-ded1f22898004e0649ebaa6fc';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getImagesByQuery(query, page) {
  return axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${page}`
  );
}