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

let activeCards;



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

    let container = document.getElementById("search-output");
    let booksCards = document.createElement("div");
    booksCards.classList.add("card", "col-md-3", "justify-content-around");

    let bookId = books.asin;
    console.log(bookId)
    bookAsin = bookId;
    let cardsCont = document.createElement("div");
    cardsCont.id = bookId;
    cardsCont.classList.add("card", "container-fluid");
    let cardImg = document.createElement("img");
    cardImg.src = books.img;

    cardImg.classList.add("card-img-top");
    cardImg.style.height = "350px";

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("p");
    cardTitle.classList.add("card-text", "title");
    cardTitle.innerText = books.title;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = books.price + "$";

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("d-flex", "justify-content-center");
    let addCart = document.createElement("button");

    addCart.classList.add("btn", "btn-outline-dark");
    addCart.innerText = "Buy";
    addCart.addEventListener("click", () => {
        sideBar(books.title, addCart, books.asin, books.img, books.price)
    })

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "btn-outline-dark");
    deleteBtn.addEventListener("click", () => {
        deleteItems(deleteBtn)
    })

    let detailsBtn = document.createElement("button");
    detailsBtn.classList.add("btn", "btn-outline-dark");
    detailsBtn.innerText = "Details";
    detailsBtn.addEventListener("click", () => {
        details(books.asin)
    })



    container.appendChild(booksCards);

    booksCards.appendChild(cardsCont);
    cardsCont.appendChild(cardImg);
    cardsCont.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonsDiv);
    buttonsDiv.appendChild(addCart);
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(detailsBtn);



};

function sideBar(titoli, btn, asin, img, price) {
    let card = btn.parentNode.parentNode.parentNode;
    let bookId = asin;
    activeCards = card;
    console.log(titoli);
    activeCards.classList.add("clicked-book");

    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("openbtn", "text-light");
    sidebarCont.classList.remove("closebtn");
    let mySidebar = document.getElementById("mySidebar");

    let cartList = document.createElement("li");

    let cartListIn = document.createElement("div");
    cartListIn.classList.add("d-flex");
    let cartImg = document.createElement("img");
    cartImg.src = img;
    cartImg.style.height = "100px";
    cartImg.style.marginRight = "10px";

    let cartTitle = document.createElement("span");
    cartTitle.innerText = titoli;

    let cartPrice = document.createElement("span");
    cartPrice.innerText = price + "$";
    cartPrice.style.marginLeft = "10px";


    let iconSide = document.querySelector(".icon");
    iconSide.addEventListener("click", () => {
        sidebarCont.classList.add("closebtn")
    })

    cartList.appendChild(cartImg);
    cartList.appendChild(cartTitle);
    cartList.appendChild(cartPrice);
    cartList.classList.add("openbtn");
    cartList.style.marginTop = "20px";

    let cartDelete = document.createElement("span");
    cartDelete.classList.add("border", "ms-3");
    cartDelete.style.cursor = "pointer";
    cartDelete.innerText = "Elimina";
    cartList.appendChild(cartDelete);
    cartDelete.addEventListener("click", () => {
        deleteClickedItem(cartDelete, bookId);
    })


    count++;
    let counter = document.getElementById("count");
    counter.textContent = `Il numero di articoli è ${count}`;


    mySidebar.appendChild(cartList);

}



function deleteClickedItem(btn, bookId) {
    let parent = btn.parentNode;
    let myCard = activeCards;


    myCard = document.getElementById(bookId);
    myCard.classList.remove("clicked-book");
    console.log(bookId)


    parent.remove();
    count--;

    let counter = document.getElementById("count");
    counter.textContent = `Il numero di articoli è ${count}`;

}

function deleteItems(btn) {


    let card = btn.parentNode.parentNode.parentNode;
    card.classList.add("d-none");
}

function empty() {
    let myOl = document.getElementById("mySidebar");
    myOl.innerHTML = "";
    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("closebtn");
    count = 0;

    let books = document.querySelectorAll(".clicked-book");
    books.forEach((book) => {
        book.classList.remove("clicked-book")
    })

}

function details(id) {
    let newPage = "details.html";
    window.location.href = `${newPage}?id=${id} `;
}