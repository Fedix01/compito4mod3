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
    search(json)
    json.forEach(books => {
        console.log(books)
        createHtml(books)

    })
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
    booksCards.innerHTML = ` <div class="card container-fluid" >
       <img class="card-img-top" src="${books.img}" alt="Card image cap" style="height:350px">
       <div class="card-body">
         <p class="card-text title">${books.title}</p>
         <p class="card-text">${books.price}</p>
         <button class="btn btn-outline-dark" onclick="sideBar('${books.title}', this)">Aggiungi al carrello</button>
       </div>
     </div>`


    container.appendChild(booksCards);




    // addToCart.addEventListener("click", (event) => {
    //    sideBar(event.target)
    // })
};

function sideBar(titoli, btn) {
    let card = btn.closest('.card');

    console.log(titoli);
    card.classList.add("clicked-book")

    let sidebarCont = document.getElementById("sidebar-container");
    sidebarCont.classList.add("openbtn", "text-light");
    let mySidebar = document.getElementById("mySidebar");
    let cartList = document.createElement("li");
    cartList.classList.toggle("openbtn")
    cartList.innerText = titoli;
    mySidebar.appendChild(cartList)

}

function search(libri) {
    let valoreInput = searchBar.value;
    let dataFilter = libri.filter((value) => {
        return (
            value.title.toLowerCase().includes(valoreInput.toLowerCase())
        )
    });

    console.log(dataFilter)
}
