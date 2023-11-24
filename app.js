// API Key - http://www.omdbapi.com/?apikey=f14031a0&i=tt3896198

// Target elements

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn')
const movieDisplaySection = document.querySelector('.movie-section')
const defaultDisplaySection = document.querySelector('.default-section')
const errorSection = document.querySelector('.error-section')


// Initialisations

let inputValue = ''

// Event Listeners

searchInput.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        e.preventDefault()
        searchButton.click()
    }
})

searchButton.addEventListener('click', fetchMovie)



// Functions

// Fetch Movies Based on Search
function fetchMovie() {
    movieDisplaySection.innerHTML = ``
    if(!searchInput.value) {
        errorMessage()
    } else {
        inputValue = formatTitle(searchInput.value)

        fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=f14031a0`)
            .then(response => response.json())
            .then(data => {
                // Extract an array based on search input
                let searchArray = data.Search
                let movieTitlesArray = []
                searchArray.forEach(eachMovie => {
                    // Push the title into movieTitlesArray
                    movieTitlesArray.push(eachMovie.Title)
                });
                // Extract unique values
                let uniqueTitles = new Set(movieTitlesArray.sort())
                fetchEachMovie(uniqueTitles)
            })
            .catch(() => errorMessage())

        searchInput.value =''
    }
}

// Fetch Movies based on exact title
function fetchEachMovie(movieTitlesArray) {
    movieTitlesArray.forEach(function(eachMovieTitle) {
        // fetch based on exact title
        fetch(`https://www.omdbapi.com/?t=${eachMovieTitle}&apikey=f14031a0`)
            .then(response => response.json())
            .then(data => {
                renderMovieCard(data)
            })
            .catch(() => errorMessage())
    })
}

// Render the movies' stack
function renderMovieCard(data) {
    defaultDisplaySection.style.display = 'none'
    errorSection.style.display = 'none'

    // Object destructuring
    const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = data
    movieDisplaySection.innerHTML += `
        <article class="movie-article" data-movie-id ="${imdbID}">
            <img src="${Poster}" alt="movie poster" class="movie-poster">
            <div class="movie-info">
                <div class="movie-details first-row">
                    <h2 class="title">${Title}</h2>
                    <img src="./assets/star-icon.svg" alt="" id="star-icon">
                    <h4 class="rating">${imdbRating}</h4>
                </div>
                <div class="movie-details second-row">
                    <h4 class="duration">${Runtime}</h4>
                    <h4 class="genre">${Genre}</h4>
                </div>
                <p class="description">${Plot}</p>
            </div>
        </article>`
}

// Format the movie title to inject in fetch request
function formatTitle(movieTitle) {
    // TODO: check for special characters
    return movieTitle.split(' ').join('+')
}

// Render error Message
function errorMessage() {
    errorSection.style.display = 'block'
    errorSection.innerHTML = `<p> Unable to find what you’re looking for. Please try another search. </p>`
}