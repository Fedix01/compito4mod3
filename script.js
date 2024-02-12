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

let count = 0;

let endpoint = "https://striveschool-api.herokuapp.com/books";

let container = document.getElementById("search-output");

const spinner = document.getElementById("spinner");



searchBar.addEventListener("keydown", () => {
    loadData()
})

searchBtn.addEventListener("click", () => {
    loadData();
})


function loadData() {

    spinner.classList.toggle("d-none");

    fetch(`${endpoint}`)

        .then((res) => res.json())
        .then((json) => filterRes(json))
        .catch((err) => console.log(err))
}

// Funzione aperta all'apertura della pagina
loadData()


function filterRes(json) {
    let valoreInput = searchBar.value.toLowerCase();
    let filteredResults = json.filter((books) => {
        return books.title.toLowerCase().includes(valoreInput.trim())
    });

    let container = document.getElementById("search-output");
    container.innerHTML = "";
    filteredResults.forEach(books => {
        console.log(books)
        createHtml(books)
    })
    spinner.classList.toggle("d-none");

};

function createHtml(books) {
    // <div class="card" style="width: 18rem;">
    //   <img class="card-img-top" src="..." alt="Card image cap">
    //   <div class="card-body">
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //   </div>
    // </div>
    console.log(books)
    let container = document.getElementById("search-output");
    let booksCards = document.createElement("div");
    booksCards.classList.add("card", "col-md-3", "justify-content-around");
    booksCards.innerHTML =
        ` <div class="card container-fluid" >
       <img class="card-img-top" src="${books.img}" alt="Card image cap" style="height:350px">
       <div class="card-body">
         <p class="card-text title">${books.title}</p>
         <p class="card-text">${books.price}</p>
         <div class="d-flex">
          <button class="btn btn-outline-dark" onclick="sideBar('${books.title}', this)">Aggiungi al carrello</button>
          <button class="btn btn-outline-dark" onclick="deleteItem(this)">Cancella</button>
          <button class="btn btn-outline-dark">Dettagli</button>
         </div>
        </div>
     </div>`;

    container.appendChild(booksCards);

};

function sideBar(titoli, btn) {
    let card = btn.parentNode.parentNode.parentNode;

    console.log(titoli);
    card.classList.add("clicked-book");

    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("openbtn", "text-light");
    sidebarCont.classList.remove("closebtn");
    let mySidebar = document.getElementById("mySidebar");
    let cartList = document.createElement("li");
    cartList.classList.add("openbtn");
    cartList.style.marginTop = "20px";
    cartList.innerText = titoli;


    count++;
    let counter = document.getElementById("count");
    counter.textContent = `Il numero di articoli è ${count}`;


    mySidebar.appendChild(cartList);
}


function deleteItem(btn) {
    let card = btn.parentNode.parentNode.parentNode;
    card.classList.add("d-none");
}

function empty() {
    let myOl = document.getElementById("mySidebar");
    myOl.innerHTML = "";
    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("closebtn");
    count = 0;
}

function liveSearch() {
    if (activeResults) {
        let valoreInput = searchBar.value.toLowerCase();
        let filteredResults = activeResults.filter((books) => {
            return books.title.toLowerCase().includes(valoreInput.trim())
        });

        filterRes(filteredResults, false)
    }
}