const myLibrary = [];
const addbook = document.querySelector(".newBook");;
const dialog = document.querySelector("dialog");
const submit = document.querySelector("#submit");
const displayBooks = document.querySelector(".display-books")
let input_title, input_author, input_pages, input_read;
addbook.addEventListener("click", () => {
    dialog.showModal();
});
submit.addEventListener("click", getData);

function getData(event) {
    event.preventDefault();
    input_title = document.querySelector(".title").value;
    input_author = document.querySelector(".author").value;
    input_pages = document.querySelector(".pages").value;
    input_read = document.querySelector(".read").checked;
    addBookToLibrary(input_title, input_author, input_pages, input_read);
    dialog.close();
}

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const bookName = new Book (crypto.randomUUID(), title, author, pages, read);
    myLibrary.push(bookName);
    displayLibrary();
}



function displayLibrary() {
    let book_element, property_element;
    if (!myLibrary.length == 0) {
        for (let book of myLibrary) {
            book_element = document.createElement("ul");
            displayBooks.appendChild(book_element);
            for (let property in book) {
                property_element = document.createElement("li");
                property_element.innerText = property + ": " + book[property];
                book_element.appendChild(property_element);
            }
        }
    } else {
        document.createElement("p").innerText = "Theres nothing on here";
    }
}

