import axios from 'axios';

const API_KEY = '32675885-ded1f22898004e0649ebaa6fc';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`
  );
  return response;
}