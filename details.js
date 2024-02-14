let imgContainer = document.getElementById("img-cont");

let infoContainer = document.getElementById("info-cont");

const spinner = document.getElementById("spinner");


let endpoint = "https://striveschool-api.herokuapp.com/books/";

const params = new URLSearchParams(location.search);
const bookId = params.get("id");

spinner.classList.toggle("d-none");

fetch(`${endpoint}${bookId}`)
    .then((result) => result.json())
    .then((json) => createHtml(json))
    .catch((err) => console.log(err))

function createHtml({ title, img, price, category }) {
    console.log(title)
    spinner.classList.toggle("d-none");

    let bookImg = document.createElement("img");
    bookImg.src = img;
    bookImg.classList.add("img-fluid");

    imgContainer.appendChild(bookImg)

    let contentBook = document.createElement("div");

    let bookTitle = document.createElement("h2");
    bookTitle.innerText = ` Title: ${title}`;
    bookTitle.classList.add("p-3");
    let bookPrice = document.createElement("h4");
    bookPrice.classList.add("p-3");
    bookPrice.innerText = `Price: ${price}$`;

    let bookCategory = document.createElement("h4");
    bookCategory.classList.add("p-3");
    bookCategory.innerText = `Category: ${category}`;

    contentBook.appendChild(bookTitle);
    contentBook.appendChild(bookPrice);
    contentBook.appendChild(bookCategory);


    infoContainer.appendChild(contentBook);
}


