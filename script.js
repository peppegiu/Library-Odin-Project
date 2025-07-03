const myLibrary = [];
const addbook = document.querySelector(".newBook");;
const dialog = document.querySelector("dialog");
const submit = document.querySelector("#submit");
const displayBooks = document.querySelector(".display-books");
let input_title, input_author, input_pages, input_read;
let classElement;
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

Book.prototype.toggleStatus = function () {
    this.read = invertBoolean(this.read);
} 

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const bookName = new Book (crypto.randomUUID(), title, author, pages, read);
    myLibrary.push(bookName);
    displayLibrary();
}

function invertBoolean(bool) {
    if(!bool) {
        bool = true;
        return bool;
    }
    else {
        bool = false;
        return bool;
    }
}

function setButton(element, bool) {
    console.log("dispatched");
    if (bool) {
        element.style.backgroundColor = "#5cbf2a";
        element.innerText = "read";
        element.value = true;
        console.log(element);
        console.log(element.value);
    }
    else {
        element.style.backgroundColor = "#eb4034";
        element.innerText = "not read";
        element.value = false;
    }
}

function parseBoolean(string) {
  switch (String(string).toLowerCase()) {
    case "true":
    case "1":
    case "yes":
    case "y":
      return true;
    case "false":
    case "0":
    case "no":
    case "n":
      return false;
    default:
      //you could throw an error, but 'undefined' seems a more logical reply
      return undefined;
  }
}

function displayLibrary() {
    let book_element, property_element;
    if (!myLibrary.length == 0) {
        for (let book of myLibrary) {
            book_element = document.createElement("ul");
            displayBooks.appendChild(book_element);
            for (let property in book) {
                if(property == 'id' || property == 'toggleStatus') {
                    continue;
                }             

                property_element = document.createElement("li");
                property_element.innerText = book[property];
                
                
                if (property == 'read') {
                    property_element = document.createElement("button");
                    property_element.classList.add("is-read");
                    console.log(property_element);
                    setButton(property_element, book.read);
                    property_element.addEventListener('click', function () {
                        book.toggleStatus();
                        setButton(property_element, book.read);
                    })
                }
                
                if (property == 'title') {
                    property_element.classList.add("title");
                }
                if (property == 'pages') {
                    property_element.innerText = "Number of pages: " + book[property];
                }
                book_element.appendChild(property_element);
            }
        }
    } else {
        document.createElement("p").innerText = "Theres nothing on here";
    }
}


