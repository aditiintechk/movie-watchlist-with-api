// API Key - http://www.omdbapi.com/?apikey=f14031a0&i=tt3896198

// Target elements

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn')

// Initialisations

let inputValue = ''

// Event Listeners

searchButton.addEventListener('click', function() {
    if(!searchInput.value) {
        console.log('please enter something first!')
    } else {
        inputValue = (searchInput.value).split(' ').join('+')
        fetch(`http://www.omdbapi.com/?t=${inputValue}&apikey=f14031a0`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
})


// Fetch Request - GET
// fetch(`http://www.omdbapi.com/?t=${inputValue}&apikey=f14031a0`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.Title)
//     })