// API Key - http://www.omdbapi.com/?apikey=f14031a0&i=tt3896198

// Target elements

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn')
const movieDisplaySection = document.querySelector('.movie-section')

// Initialisations

let inputValue = ''

// Event Listeners

searchButton.addEventListener('click', function() {
    if(!searchInput.value) {
        console.log('please enter something first!')
    } else {
        inputValue = formatTitle(searchInput.value)

        fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=f14031a0`)
            .then(response => response.json())
            .then(data => {
                // let oneSearch = formatTitle(data.Search[0].Title)
                // console.log(data.Search)
                let searchArray = data.Search
                let searchArray2 = []
                searchArray.forEach(eachMovie => {
                    searchArray2.push(eachMovie.Title)
                });
                console.log(searchArray2.sort())
                // return fetch(`http://www.omdbapi.com/?t=${oneSearch}&apikey=f14031a0`)
            })
            // .then(response => response.json())
            // .then(data => renderMovieCard(data))
            // .catch(error => console.log(error))
    }
})


function renderMovieCard(data) {
    const {Title, Poster, imdbRating, Runtime, Genre, Plot} = data
    movieDisplaySection.innerHTML = `
        <article class="movie-article">
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
                    <a class="add-to-watchlist"><img src="./assets/plus-icon.svg" alt="plus button in white"> Watchlist</a>
                </div>
                <p class="description">${Plot}</p>
            </div>
        </article>`
}

function formatTitle(movieTitle) {
    return movieTitle.split(' ').join('+')
}






// OLD CODE
/*
fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=f14031a0`)
    .then(response => response.json())
    .then(data => {
        console.log((data.Search[0].Title).split(' ').join('+'))
        renderMovieCard(data.Search[0])
    }) */