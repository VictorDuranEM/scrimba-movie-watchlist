import Movie from './Movie.js'

const moviesEl = document.getElementById('movies')
let moviesInWatchlist = JSON.parse(localStorage.getItem('movies-watchlist')) || []

document.getElementById('movies').addEventListener('click', e => {
  if (e.target.classList.contains('movie-user-action')) {
    removeFromWatchlist(e.target.getAttribute('data-movie-id'))
  }
})

function removeFromWatchlist(movieID) {
  moviesInWatchlist = moviesInWatchlist.filter(movie => movie.movieID != movieID)
  localStorage.setItem('movies-watchlist', JSON.stringify(moviesInWatchlist))
  renderMovies()
}

function renderMovies() {
  if (moviesInWatchlist.length) {
    const moviesHtml = moviesInWatchlist.map(movie => new Movie(movie)
      .getMovieHtml({ userActionText: 'Remove' })).join('')
    moviesEl.innerHTML = moviesHtml
  } else {
    moviesEl.innerHTML = `
      <div class="empty-movies">
          <p>Your watchlist is looking a little empty...</p>
          <a href="/" class="add-movies">
            <i class="fa-solid fa-circle-plus"></i>
            <p>Let’s add some movies!</p>
          </a>
      </div>
    `
  }
}

renderMovies()
