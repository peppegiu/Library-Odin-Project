const myLibrary = [];
const addbook = document.querySelector(".newBook");
const displayBooks = document.querySelector(".display-books");
const form = document.getElementById("book-form");
addbook.addEventListener("click", () => {
  form.showModal()
})
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").value;
  addBookToLibrary(myLibrary, title, author, pages, readStatus);
  displayLibrary(myLibrary);
})

function getData() {
  input_title = document.querySelector("input.title").value;
  input_author = document.querySelector(".author").value;
  input_pages = document.querySelector(".pages").value;
  input_read = document.querySelector(".read").checked;
}

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(library, title, author, pages, read) {
  // take params, create a book then store it in the array
  library.push(new Book(crypto.randomUUID(), title, author, pages, read));
}

function displayLibrary(library) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  library.forEach(book => {
    const li = document.createElement("li");
    li.id = book.id;
    li.innerHTML =
            `Title: ${book.title}<br>` +
            `Author: ${book.author}<br>` +
            `Pages: ${book.pages}<br>` +
            `Status: ${book.read ? "Read" : "Not Read"}`;
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", () => removeBook(book.id));
    li.appendChild(button);
    bookList.appendChild(li);
  })
  
}

function removeBook(bookId) {
  const bookToRemove = document.getElementById(bookId);
  const bookList = document.getElementById("book-list");
  bookList.removeChild(bookToRemove);
}

addBookToLibrary(myLibrary, "LOTR", "JRR-Tolkien", 800, true);
displayLibrary(myLibrary);