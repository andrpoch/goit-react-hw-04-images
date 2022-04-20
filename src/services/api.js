const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '25752976-c432b2b3d55e7cabed38c70ac';

const fetchImages = (searchQuery, page) => {
  const fetchUrl = `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then((res) => res.json());
};
export default fetchImages;