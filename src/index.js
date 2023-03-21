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
      <div class="  ">
      <div class='flex justify-center items-center  flex-col '>
          <img class="rounded-lg shadow-lg bg-contain max-[600px]:h-36 h-80 w-60 " src="${imageUrl}" alt="${imageAlt}">
      </div>
     
        <div class=' h-16 text-white'>
        <div class='m-2 ml-0 font-semibold truncate'>${title}</div>
        <div class=''>${releasedate.substring(0, 4)}</div>
    </div>
      
      </div>
    `;
  }
}

customElements.define('image-figure', ImageFigure);

async function getTrendingMovies() {
  const { data: { results } } = await axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=5d80e7b9d2bf9ada1894ca7c1f6d4c57');
  console.log(results)
  return results;
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













// import './style.css';
// import axios from 'axios';

// class ImageFigure extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     const imageUrl = this.getAttribute('image-url');
//     const imageAlt = this.getAttribute('image-alt');
//     const caption = this.getAttribute('caption');
//     const releasedate = this.getAttribute('release-date');

//     this.innerHTML = `
//       <div class="  ">
//       <div class='flex justify-center items-center  flex-col '>
//           <img class="rounded-lg shadow-lg bg-contain h-80 w-60" src="${imageUrl}" alt="${imageAlt}">
//       </div>
     
       
//         <div class=' h-16 text-white'>
//         <div class='m-2 ml-0 font-semibold truncate'>${caption}</div>
//         <div class=''>${releasedate}</div>
//     </div>
      
//       </div>
//     `;
//   }
// }

// customElements.define('image-figure', ImageFigure);

// axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=5d80e7b9d2bf9ada1894ca7c1f6d4c57')
//   .then(({ data: { results } }) => {
//     for (const result of results) {
//         // console.log(result);
//       const { poster_path, title , release_date} = result;
//       const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//       const imageAlt = title;
//       const releasedate = release_date;

//       const imageFigureElement = new ImageFigure();
//       imageFigureElement.setAttribute('image-url', imageUrl);
//       imageFigureElement.setAttribute('image-alt', imageAlt);
//       imageFigureElement.setAttribute('caption', title);
//       imageFigureElement.setAttribute('release-date', releasedate);

//       const wrapper = document.getElementById('wrapper')
//       wrapper.appendChild(imageFigureElement);
//     }
//   });

  

//   const form = document.querySelector('form');
//   const input = form.querySelector('#default-search');
  
//   form.addEventListener('submit', (event) => {
//     event.preventDefault(); // prevent the default form submission
//     const value = input.value;
//     console.log(value);
   
//     getmovies(value)

//   });


//   async function getmovies(value) {
//      await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5d80e7b9d2bf9ada1894ca7c1f6d4c57&query=${value}`)
//     .then(({ data: { results } }) => {
//         console.log(results);
//         for (const result of results) {
//             // console.log(result);
//           const { poster_path, title , release_date} = result;
//           const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//           const imageAlt = title;
//           const releasedate = release_date;
    
//           const imageFigureElement = new ImageFigure();
//           imageFigureElement.setAttribute('image-url', imageUrl);
//           imageFigureElement.setAttribute('image-alt', imageAlt);
//           imageFigureElement.setAttribute('caption', title);
//           imageFigureElement.setAttribute('release-date', releasedate);
    
//           const wrapper = document.getElementById('wrapper')
//           wrapper.appendChild(imageFigureElement);
//         }

//     })
//   }



