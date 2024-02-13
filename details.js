let imgContainer = document.getElementById("img-cont");

let infoContainer = document.getElementById("info-cont");

let endpoint = "https://striveschool-api.herokuapp.com/books/";

const params = new URLSearchParams(location.search);
const bookId = params.get("id");

fetch(`${endpoint}${bookId}`)
    .then((result) => result.json())
    .then((json) => createHtml(json))
    .catch((err) => console.log(err))

function createHtml({ title, img, price, category }) {
    console.log(title)

    let bookImg = document.createElement("img");
    bookImg.src = img;
    bookImg.classList.add("img-fluid");

    imgContainer.appendChild(bookImg)

    let contentBook = document.createElement("div");

    let bookTitle = document.createElement("h2");
    bookTitle.innerText = ` Titolo: ${title}`;
    bookTitle.classList.add("p-3");
    let bookPrice = document.createElement("h4");
    bookPrice.classList.add("p-3");
    bookPrice.innerText = `Prezzo: ${price}$`;

    let bookCategory = document.createElement("h4");
    bookCategory.classList.add("p-3");
    bookCategory.innerText = `Categoria: ${category}`;

    contentBook.appendChild(bookTitle);
    contentBook.appendChild(bookPrice);
    contentBook.appendChild(bookCategory);


    infoContainer.appendChild(contentBook);
}


