const db = firebase.firestore();

let myBooksList = [];

const submit_btn = document.getElementById('form-btn');
const form = document.getElementById('book-form');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const url = document.getElementById('book-cover');
const defaultCover = 'https://www.brantlibrary.ca/en/resourcesGeneral/default-river.png';

function Book(title, author, pages, image_url = defaultCover, read) {
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

async function render() {
  const bookList = document.getElementById('book-list');
  const snapShot = await db.collection('books').get();
  const books = snapShot.docs.map(doc => doc.data());

  bookList.innerHTML = '';
  books.forEach((book) => {
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
  form.classList.remove('d-none');
}

function hide_form () {
  form.classList.add('d-none');
}

function deleteBook(key) {
  const books = myBooksList.filter((book) => {
    return book.id !== key;
  });
  myBooksList = books;
  render();
}

submit_btn.addEventListener('click', async (e) => {
  e.preventDefault();

  let imageUrl;
  if(url.value === "") {
    imageUrl = undefined;
  } else {
    imageUrl = url.value;
  }
  const book = new Book(
    title.value,
    author.value,
    pages.value,
    imageUrl,
    document.querySelector('input[name=status]:checked').value === "true"
  );


  await db.collection('books').doc().set({
    title: book.title,
    author: book.author,
    pages: book.pages,
    image_url: book.image_url,
    status: book.status,
  });

  title.value = '';
  author.value = '';
  pages.value = '';
  url.value = '';
  hide_form();
  render();
});

render();
