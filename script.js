/* ============== DOM ELEMENTS ============= */
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieGrid = document.getElementById('movieGrid');

const movieModal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');


searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);;
});

// Fetch Movies
async function fetchMovies(query) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=c4f96b36&s=${query}`);
  const data = await res.json();
  displayMovies(data.Search);
}

//Display movie cards
function displayMovies(movies) {
  movieGrid.innerHTML = '';
  if (!movies) {
    movieGrid.innerHTML = '<p>No results found</p>';
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    card.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div class="detail">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>          
        </div>
    `;

    card.addEventListener('click', () => fetchMovieDetails(movie.imdbID));
    movieGrid.appendChild(card);
  });
}

//Fetch movie details
async function fetchMovieDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=c4f96b36&i=${id}`);
  const movie = await res.json();

  document.getElementById('modalPoster').src = movie.Poster;
  document.getElementById('modalTitle').textContent = movie.Title;
  document.getElementById('modalYear').textContent = movie.Year;
  document.getElementById('modalGenre').textContent = movie.Genre;
  document.getElementById('modalPlot').textContent = movie.Plot;

  movieModal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
  movieModal.style.display = 'none';
});