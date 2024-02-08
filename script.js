let searchBar = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-btn");


let endpoint = "https://striveschool-api.herokuapp.com/books";
searchBtn.addEventListener("click", () => {
    loadData(searchBar.value)
})


function loadData(inputValue) {
    fetch(`${endpoint}?q=${inputValue}`)
        .then((res) => res.json())
        .then((json) => cycleRes(json))
        .catch((err) => console.log(err))
}

function cycleRes(json) {
    json.forEach(books => {
        createHtml(books)
    });
}

function createHtml(books) {
    let container = document.getElementById("search-output");
    let booksCards = document.createElement("div");

}