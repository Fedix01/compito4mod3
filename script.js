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
    // booksCards.innerHTML =
    //     ` <div class="card container-fluid" >
    //    <img class="card-img-top" src="${books.img}" alt="Card image cap" style="height:350px">
    //    <div class="card-body">
    //      <p class="card-text title">${books.title}</p>
    //      <p class="card-text">${books.price}</p>
    //      <div class="d-flex">
    //       <button class="btn btn-outline-dark" onclick="sideBar('${books.title}', this)">Aggiungi al carrello</button>
    //       <button class="btn btn-outline-dark" onclick="deleteItem(this)">Cancella</button>
    //       <button class="btn btn-outline-dark">Dettagli</button>
    //      </div>
    //     </div>
    //  </div>`;

    let cardsCont = document.createElement("div");
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
    cardText.innerText = books.price;
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("d-flex");
    let addCart = document.createElement("button");
    addCart.classList.add("btn", "btn-outline-dark");
    addCart.innerText = "Aggiungi al carrello";
    addCart.addEventListener("click", () => {
        sideBar(books.title, addCart)
    })

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Scorri";
    deleteBtn.classList.add("btn", "btn-outline-dark");
    deleteBtn.addEventListener("click", () => {
        deleteItems(deleteBtn)
    })

    let detailsBtn = document.createElement("button");
    detailsBtn.classList.add("btn", "btn-outline-dark");
    detailsBtn.innerText = "Dettagli";
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

function sideBar(titoli, btn) {
    let card = btn.parentNode.parentNode.parentNode;

    activeCards = card;
    console.log(titoli);
    activeCards.classList.add("clicked-book");

    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("openbtn", "text-light");
    sidebarCont.classList.remove("closebtn");
    let mySidebar = document.getElementById("mySidebar");
    let cartList = document.createElement("li");
    cartList.classList.add("openbtn");
    cartList.style.marginTop = "20px";
    cartList.innerText = titoli;
    let cartDelete = document.createElement("span");
    cartDelete.classList.add("border", "ms-3")
    cartDelete.innerText = "Elimina";
    cartList.appendChild(cartDelete);
    cartDelete.addEventListener("click", () => {
        deleteClickedItem(cartDelete)

    })


    count++;
    let counter = document.getElementById("count");
    counter.textContent = `Il numero di articoli è ${count}`;


    mySidebar.appendChild(cartList);
}


function deleteClickedItem(btn) {
    let parent = btn.parentNode;
    count--;
    parent.remove()
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
    activeCards.classList.remove("clicked-book");

}

function details(id) {
    let newPage = "details.html";
    window.location.href = `${newPage}?id=${id} `;
}