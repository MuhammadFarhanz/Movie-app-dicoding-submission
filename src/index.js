import './style.css';
import axios from 'axios';

class ImageFigure extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const imageUrl = this.getAttribute('image-url');
    const imageAlt = this.getAttribute('image-alt');
    const title = this.getAttribute('title');
    const releasedate = this.getAttribute('release-date');

    this.innerHTML = `
    
      <div class='flex justify-center items-center  flex-col cursor-pointer '>
          <img class="rounded-lg shadow-lg bg-contain max-[600px]:h-36 h-80 w-60 " src="${imageUrl}" alt="${imageAlt}">
      </div>
     
        <div class=' h-16 '>
        <div class='m-2 ml-0 font-semibold truncate hover:text-[#E50914] cursor-pointer text-white'>${title}</div>
        <div class='text-[#7c7979] font-semibold'>${releasedate.substring(0, 4)}</div>
    </div>
    
    `;
  }
}

customElements.define('image-figure', ImageFigure);

async function getTrendingMovies() {
  try {
    const { data: { results } } = await axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=5d80e7b9d2bf9ada1894ca7c1f6d4c57');
    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    alert('Failed to load trending movies. Please try again later.');
    return [];
  }
}

async function searchMovies(query) {
  const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5d80e7b9d2bf9ada1894ca7c1f6d4c57&query=${query}`);
  return results;
}

function renderResults(results) {
  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = '';

  for (const result of results) {
    const { poster_path, title, release_date, first_air_date, name } = result;
    const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const imageAlt = title;
    const releasedate = release_date == undefined ? first_air_date : release_date ;
    const tittle = title == undefined ? name : title
 
    const imageFigureElement = new ImageFigure();
    imageFigureElement.setAttribute('image-url', imageUrl);
    imageFigureElement.setAttribute('image-alt', imageAlt);
    imageFigureElement.setAttribute('title', tittle);
    imageFigureElement.setAttribute('release-date', releasedate);

    wrapper.appendChild(imageFigureElement);
  }
}

async function loadTrendingMovies() {
  const results = await getTrendingMovies();
  renderResults(results);
}

loadTrendingMovies();

const form = document.querySelector('form');
const input = form.querySelector('#default-search');

input.addEventListener('input', async (event) => {
  event.preventDefault();
  const value = input.value;
  const results = value ? await searchMovies(value) : await getTrendingMovies();
  renderResults(results);
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value;
    const results = await searchMovies(value);
    renderResults(results);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const top = document.getElementById('top');

  top.addEventListener('click', function (){
    scrollToTop()
  });

