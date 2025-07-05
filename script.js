const myLibrary = [];
const addbook = document.querySelector(".newBook");;
const dialog = document.querySelector("dialog");
const submit = document.querySelector("#submit");
const displayBooks = document.querySelector(".display-books");
let input_title, input_author, input_pages, input_read;
let readButtons;
addbook.addEventListener("click", () => {
    dialog.showModal();
});
submit.addEventListener("click",  function (event) {
    event.preventDefault();
    console.log("title:", input_title);
    console.log("typeof title:", typeof input_title);

    getData();
    console.log("Using input_title:", input_title);
    console.log("Form field value right now:", document.querySelector(".title").value);

    addBookToLibrary(input_title, input_author, input_pages, input_read);
    dialog.close();
    displayBooks.innerHTML = "";
    displayLibrary();
    readButtons = document.querySelectorAll(".is-read");
    delButtons = document.querySelectorAll(".del");
    console.log(delButtons);
    readButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            for (book of myLibrary) {
                if (book.id === btn.id) {
                    setButton(btn, book.read);
                    book.read = !book.read;
                }
            }
        })
    })
    delButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            for (const book of displayBooks.children) {
                if (book.dataset.id == btn.dataset.id) {
                    book.remove();
                }
            }
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id === btn.dataset.id) {
                    myLibrary.splice(i, 1);
                }
            }
        })
    })
});

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

Book.prototype.toggleStatus = function () {
    this.read = invertBoolean(this.read);
} 

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const bookName = new Book (crypto.randomUUID(), title, author, pages, read);
    myLibrary.push(bookName);
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
    }
    else {
        element.style.backgroundColor = "#eb4034";
        element.innerText = "not read";
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
    let book_element, property_element, button_element;
    if (!myLibrary.length == 0) {
        for (let book of myLibrary) {
            book_element = document.createElement("ul");
            book_element.dataset.id = book.id;
            displayBooks.appendChild(book_element);
            for (let property in book) {
                if(property == 'id' || property == 'toggleStatus') {
                    continue;
                }             
               
                if (property == 'read') {
                    button_element = document.createElement("button");
                    button_element.classList.add("is-read");
                    setButton(button_element, book.read);
                    button_element.id = book.id;
                    book_element.appendChild(button_element);
                    continue;
                }
                property_element = document.createElement("li");
                if (property == 'title') {
                    property_element.classList.add("title");
                }

                if (property == 'pages') {
                    property_element.innerText = "Number of pages: " + book[property];                  
                }
                else {
                    property_element.innerText = book[property];
                }
                
                book_element.appendChild(property_element);
            }
            let del = document.createElement("button");
            del.classList.add("del");
            del.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>';
            del.dataset.id = book.id;
            book_element.appendChild(del);
        }
    } else {
        document.createElement("p").innerText = "Theres nothing on here";
    }
    
    
    
}


