let myBooksList = [
  new Book(
    2,
    'Alchimist',
    'Zakariae El Mejdki',
    230,
    'https://images-na.ssl-images-amazon.com/images/I/81s5gr8znaL.jpg',
    true
  ),
  new Book(
    1,
    'Harry Potter Chapter 1',
    'Jose Roberto',
    535,
    'https://a.wattpad.com/cover/22127925-288-k860552.jpg',
    false
  ),
  new Book(
    3,
    'Rich Dad Poor Dad',
    'Zakariae Roberto',
    354,
    'https://miro.medium.com/max/480/1*E6aoQIUVWcJbDbXulkLpkg.jpeg',
    false
  )
];

let lastID = 3;

const defaultCover = 'https://www.brantlibrary.ca/en/resourcesGeneral/default-river.png';

function Book(id, title, author, pages, image_url = defaultCover, read) {
  this.id = id,
  this.title = title;
  this.image_url = image_url;
  this.author = author;
  this.pages = pages;
  this.status = read;
}

Book.prototype.toggleStatus = function() {
  this.status = !this.status;
}

function addBookToList (book) {
  myBooksList.push(book);
}

function render () {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  myBooksList.forEach((book) => {
    const card = `
      <div class="item align-center d-flex">
        <img class="book-image" src="${book.image_url}">
        <div class="book-info">
          <p class="d-flex align-center status ${book.status ? 'green' : 'red'}">
            <span class="circle ${book.status ? 'green-bg' : 'red-bg'}">
            </span>
            ${book.status ? 'Already read' : 'Not read yet'}

            <span class="edit-status">
              <image src="assets/images/edit.png" onclick="toggleStatus(${book.id})"> status
            </span>
          </p>
          <p class="book-title">${book.title}</p>
          <p class="book-author">Author: ${book.author}</p>
          <p class="book-pages">Pages: ${book.pages}</p>
        </div>
        <image class="delete-btn" src="assets/images/trash.png" onclick="deleteBook(${book.id})">
      </div>
    `;

    bookList.innerHTML += card;
  });
}

function toggleStatus(book_id) {
  const book = myBooksList.find(book => book.id === book_id);
  book.toggleStatus();
  render();
}

function render_form () {
  const form = document.getElementById('book-form');
  form.classList.remove('d-none');
}

function hide_form () {
  const form = document.getElementById('book-form');
  form.classList.add('d-none');
}

function deleteBook(key) {
  const books = myBooksList.filter((book) => {
    return book.id !== key;
  });
  myBooksList = books;
  render();
}

const submit_btn = document.getElementById('form-btn');
const form = document.getElementById('book-form');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const url = document.getElementById('book-cover');

submit_btn.addEventListener('click', (e) => {
  e.preventDefault();
  let imageUrl;
  if(url.value === "") {
    imageUrl = undefined;
  } else {
    imageUrl = url.value;
  }
  lastID += 1;
  const book = new Book(
    lastID,
    title.value,
    author.value,
    pages.value,
    imageUrl,
    document.querySelector('input[name=status]:checked').value === "true"
  );

  myBooksList.push(book);
  title.value = "";
  author.value = "";
  pages.value = "";
  url.value = "";
  hide_form();
  render();
});

render();
