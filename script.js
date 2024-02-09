//* Application plan:
//? 1. Raw structure
// 1. Make an API call to https://striveschool-api.herokuapp.com/books with Postman
// 2. Make an API call to endpoint above with fetch, fill song's details into a proper template, then inject it into results box.
//? 2. Refactored code
// - search fn (async)
// - cycle res fn
// - create template and inject fn


let searchBar = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-btn");

let mySidebar = document.getElementById("mySidebar");

let endpoint = "https://striveschool-api.herokuapp.com/books";
searchBtn.addEventListener("click", () => {
    loadData();
})


function loadData() {
    fetch(`${endpoint}`)
        .then((res) => res.json())
        .then((json) => cycleRes(json))
        .catch((err) => console.log(err))
}


function cycleRes(json) {
    json.forEach(books => {
        console.log(books)
        createHtml(books)
    });
}
function createHtml(books) {
    // <div class="card" style="width: 18rem;">
    //   <img class="card-img-top" src="..." alt="Card image cap">
    //   <div class="card-body">
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //   </div>
    // </div>

    let container = document.getElementById("search-output");
    let booksCards = document.createElement("div");
    booksCards.classList.add("card", "col-md-3", "justify-content-around");
    let booksImg = document.createElement("img");
    booksImg.src = books.img;
    booksImg.style.height = "350px";
    let titleCards = document.createElement("h3");
    titleCards.innerText = books.title;
    titleCards.classList.add("title");
    let priceCards = document.createElement("h5");
    priceCards.innerText = books.price;
    let addToCart = document.createElement("button");
    addToCart.classList.add("btn", "btn-outline-dark");
    addToCart.innerText = "Aggiungi al carrello";

    container.appendChild(booksCards);

    booksCards.appendChild(booksImg);
    booksCards.appendChild(titleCards);
    booksCards.appendChild(priceCards);
    booksCards.appendChild(addToCart);


    addToCart.addEventListener("click", (event) => {
        sideBar(event.target)
    })
}

function sideBar(btn) {
    let cartCard = btn.parentNode;

    // let products = document.createElement("div");

    // let cartImg = cartCard.querySelector("img");
    // cartImg.style.width = "30px";
    // cartImg.style.height = "30px";

    // products.appendChild(cartImg);

    let img = cartCard.querySelector("img");
    img.style.height = "100px";

    let cartBtn = cartCard.querySelector("button");
    cartBtn.style.display = "none";

    let cardText = cartCard.querySelector("h3");
    cardText.style.fontSize = "20px";
    cartCard.classList.remove("card", "col-md-3", "justify-content-around");
    cartCard.classList.add("d-flex", "text-light")
    console.log(cartCard)
    mySidebar.classList.add("openbtn");
    let newDiv = document.createElement("div");
    // products.appendChild(cartCard)
    // mySidebar.appendChild(products)
    mySidebar.appendChild(cartCard)
}