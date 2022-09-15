import Movie from './Movie.js'
import { trimText } from './utils.js'

const baseImdbAPIUrl = 'https://www.omdbapi.com/?apikey=2597ed64'
const moviesEl = document.getElementById('movies')

const moviesInWatchlist = JSON.parse(localStorage.getItem('movies-watchlist')) || []
let moviesFound = []

document.getElementById('seach-btn').addEventListener('click', searchMovies)
document.getElementById('movies').addEventListener('click', e => {
  if (e.target.classList.contains('movie-user-action')) {
    addToWatchlist(e.target.getAttribute('data-movie-id'))
  }
})

async function searchMovies(e) {
  e.preventDefault()
  moviesFound = await getMovies(document.getElementById('search-input').value)
  if (moviesFound.length) {
    renderMovies()
  } else {
    moviesEl.innerHTML = 
      `
        <div class="empty-movies">
            <p>Unable to find what you’re looking for. Please try another search.</p>
        </div>
      `
  }
}

async function getMovies(searchValue) {
  const result = await fetch(`${baseImdbAPIUrl}&s=${searchValue}`)
  const data = await result.json()
  if (data.Search && data.Search.length) {
    const movies = data.Search.map(async movie => {
      const movieDetails = await getMovieDetails(movie.imdbID)
      return new Movie({
        movieID: movieDetails.imdbID,
        title: movieDetails.Title,
        rating: movieDetails.imdbRating,
        runtime: movieDetails.Runtime,
        genre: movieDetails.Genre,
        plot: trimText(movieDetails.Plot, 130),
        poster: movieDetails.Poster
      })
    })
    return Promise.all(movies)
  }
  return []
}

async function getMovieDetails(movieID) {
  const result = await fetch(`${baseImdbAPIUrl}&i=${movieID}`)
  return await result.json()
}

function renderMovies() {
  const moviesHtml = moviesFound.map(movie => movie.getMovieHtml({ userActionText: 'Watchlist' })).join('')
  moviesEl.innerHTML = moviesHtml
}

function addToWatchlist(movieID) {
  moviesInWatchlist.push(moviesFound.find(movie => movie.movieID === movieID))
  localStorage.setItem('movies-watchlist', JSON.stringify(moviesInWatchlist))
  const addedMsg = document.getElementById('added-msg')
  addedMsg.classList.add('show')
  setTimeout(() => addedMsg.classList.remove('show'), 1500)
}
