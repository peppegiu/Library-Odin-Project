const myLibrary = [];
const addbook = document.querySelector(".newBook");
const displayBooks = document.querySelector(".display-books");
const form = document.getElementById("book-form");


function getData() {
  input_title = document.querySelector("input.title").value;
  input_author = document.querySelector(".author").value;
  input_pages = document.querySelector(".pages").value;
  input_read = document.querySelector(".read").checked;
}

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static addBookToLibrary(library, title, author, pages, read) {
    // take params, create a book then store it in the array
    library.push(new Book(crypto.randomUUID(), title, author, pages, read));
  }

  static displayLibrary(library) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    library.forEach((book) => {
      const li = document.createElement("li");
      li.id = book.id;
      li.innerHTML =
        `Title: ${book.title}<br>` +
        `Author: ${book.author}<br>` +
        `Pages: ${book.pages}<br>`;
      const button = document.createElement("button");
      button.textContent = "Remove";
      button.addEventListener("click", () => this.removeBook(book.id));
      const button2 = document.createElement("button");
      button2.textContent = book.read ? "Read" : "Not read";
      button2.className = book.id;
      li.appendChild(button);

      li.appendChild(button2);
      bookList.appendChild(li);
      button2.addEventListener("click", () =>
        this.changeReadStatus(button2.className)
      );
    });
  }

  static removeBook(bookId) {
    const bookToRemove = document.getElementById(bookId);
    const bookList = document.getElementById("book-list");
    bookList.removeChild(bookToRemove);
  }

  static changeReadStatus(buttonId) {
    const button = document.getElementsByClassName(buttonId)[0];
    let buttonText = button.innerText;
    if (buttonText == "Read") {
      button.textContent = "Not read";
    } else {
      button.textContent = "Read";
    }
  }
}

addbook.addEventListener("click", () => {
  form.showModal();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").value;
  Book.addBookToLibrary(myLibrary, title, author, pages, readStatus);
  Book.displayLibrary(myLibrary);
});

Book.addBookToLibrary(myLibrary, "LOTR", "JRR-Tolkien", 800, true);
Book.displayLibrary(myLibrary);
