const myLibrary = [];

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
}

for (let book of myLibrary) {
    console.log("----- Start of book -----");
    for (let properties in book) {
        console.log(`${properties}: ${book[properties]}`);
    }
    console.log("----- End of book -----");
}

