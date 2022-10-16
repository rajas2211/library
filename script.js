let myLibrary = [];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const addBookForm = document.querySelector('form');
const submitBtn = document.querySelector('button#submit');
const libraryContainer = document.querySelector('div.library-container');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        infoStatement = `${this.title} by ${this.author}, ${this.pages} pages, `;
        infoStatement += this.read ? 'read' : 'not read yet';
        // infoStatement = `${title} by ${author}, ${pages} pages, `;
        // infoStatement += read ? 'read' : 'not read yet';
        return infoStatement;
    }
}

function addBookToLibrary() {
    const newBook = new Book(title.value,
                             author.value,
                             pages.value,
                             read.checked);
    myLibrary.push(newBook);
    makeLibraryCard(newBook);
    addBookForm.reset();

}

const myBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const myBook2 = new Book('Colloidal Suspension Rheology', 'J. Mewis', 415, true);
myLibrary.push(myBook);
myLibrary.push(myBook2);

submitBtn.addEventListener('click', addBookToLibrary);


function populateLibrary() {
    myLibrary.forEach(book => makeLibraryCard(book));
}

function makeLibraryCard(book) {
    const card = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const read = document.createElement('div');
            
    card.classList.add('library-card');
    title.classList.add('card-title');
    title.textContent = book.title;
    author.classList.add('card-author');
    author.textContent = book.author;
    pages.classList.add('card-pages');
    pages.textContent = book.pages;
    read.classList.add('card-read');
    read.textContent = book.read;
    card.append(title,author,pages,read);
    libraryContainer.appendChild(card);
}

populateLibrary();