class Movie {
  constructor(data) {
    Object.assign(this, data)
  }

  getMovieHtml(data) {
    const { movieID, title, rating, runtime, genre, plot, poster } = this
    return `
      <div class="movie">
        <img class="movie-image" src="${poster}"
            alt="blade-runner">
        <div class="movie-body">
            <div class="movie-body-first-section">
                <h2 class="movie-body-title">${title}</h2>
                <p class="movie-body-score"><i class="fa-solid fa-star"></i> ${rating}</p>
            </div>
            <div class="movie-content-second-section">
                <p>${runtime}</p>
                <p>${genre}</p>
                <p class="movie-user-action" data-movie-id="${movieID}"><i class="fa-solid fa-circle-plus"></i> ${data.userActionText}</p>
            </div>
            <p>${plot}</p>
        </div>
      </div>
    `
  }
}

export default Movie