/* eslint-disable no-shadow */
function Book(index, title, author, pages, read) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = () => `${this.name} by ${this.author}, ${this.pages} pages,
  //                     ${this.read ? `read.`: `not yet read.`}`;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

const myLibrary = [];
myLibrary.push(new Book(0,'The Hobbit', 'J.R.R. Tolkien', 295, false));
myLibrary.push(new Book(1, 'Colloidal Suspension Rheology', 'J. Mewis', 415, true));

const libraryContainer = document.querySelector('div.library-container');

function updateLibraryIndex() {
  myLibrary.forEach(book => {
    const bookDOM = document.querySelector(`div.library-card[data-index="${book.index}"]`);
    bookDOM.dataset.index = myLibrary.indexOf(book);
    // eslint-disable-next-line no-param-reassign
    book.index = myLibrary.indexOf(book);
  });
}

function removeBook(event){
  const btn = event.target;
  btn.parentNode.remove();
  myLibrary.splice(btn.parentNode.dataset.index, 1);
  updateLibraryIndex();
}

function makeLibraryCard(book) {
  const card = document.createElement('div');
  const title = document.createElement('div');
  const author = document.createElement('div');
  const pages = document.createElement('div');
  const read = document.createElement('div');
  const readBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  card.classList.add('library-card');
  card.dataset.index = book.index;
  title.classList.add('card-title');
  title.textContent = book.title;
  author.classList.add('card-author');
  author.textContent = book.author;
  pages.classList.add('card-pages');
  pages.textContent = book.pages;
  read.classList.add('card-read');
  read.textContent = book.read ? 'Read' : 'Unread';
  readBtn.classList.add('card-readButton');
  readBtn.textContent = 'Change read status';
  readBtn.addEventListener('click', () => {
    book.toggleReadStatus();
    read.textContent = book.read ? 'Read' : 'Unread';
  });
  deleteBtn.classList.add('card-delete');
  // deleteBtn.dataset.index = book.index;
  deleteBtn.textContent = 'Delete book';
  deleteBtn.addEventListener('click', removeBook);
  card.append(title, author, pages, read, readBtn, deleteBtn);
  libraryContainer.appendChild(card);
}

function populateLibrary() {
  myLibrary.forEach((book) => makeLibraryCard(book));
}
populateLibrary();

const formTitle = document.querySelector('#formTitle');
const formAuthor = document.querySelector('#formAuthor');
const formPages = document.querySelector('#formPages');
const formRead = document.querySelector('#formRead');
const addBookForm = document.querySelector('form');
const submitBtn = document.querySelector('button#submit');
function addBookToLibrary() {
  const newBook = new Book(
    myLibrary.length,
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked,
  );
  myLibrary.push(newBook);
  makeLibraryCard(newBook);
  addBookForm.reset();
}
submitBtn.addEventListener('click', (event) => {
  if (submitBtn.parentNode.parentNode.checkValidity()){
    event.preventDefault();
    addBookToLibrary();
  }
});


