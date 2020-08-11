const db = firebase.firestore();

const bookList = document.getElementById('book-list');
const submit_btn = document.getElementById('form-btn');
const form = document.getElementById('book-form');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const url = document.getElementById('book-cover');
const defaultCover = 'https://www.brantlibrary.ca/en/resourcesGeneral/default-river.png';

function Book(title, author, pages, image_url = defaultCover, status) {
  this.title = title;
  this.image_url = image_url;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleStatus = function() {
  this.status = !this.status;
}

function toggleStatus(book) {
  book.toggleStatus();
}

function addBookToList (book) {
  myBooksList.push(book);
}

async function render() {
  const snapShot = await db.collection('books').get();
  const books = snapShot.docs.map(doc => doc);

  bookList.innerHTML = '';
  books.forEach((doc) => {
    const book = doc.data();
    book.id = doc.id;
    const card = `
    <div class="item align-center d-flex pos-rel">
      <img class="book-image" src="${book.image_url}">
      <div class="book-info pos-rel">
        <p class="d-flex align-center status pos-abs ${book.status ? 'green' : 'red'}">
          <span class="circle ${book.status ? 'green-bg' : 'red-bg'}">
          </span>
          ${book.status ? 'Already read' : 'Not read yet'}
    
          <span class="edit-status d-flex pos-abs align-center">
            <image class="status-btn pointer" src="assets/images/edit.png" data-id="${book.id}"> status
          </span>
        </p>
        <p class="book-title">${book.title}</p>
        <p class="book-author">Author: ${book.author}</p>
        <p class="book-pages">Pages: ${book.pages}</p>
      </div>
      <image class="delete-btn pos-abs pointer" src="assets/images/trash.png" data-id="${book.id}">
    </div>
    `;

    bookList.innerHTML += card;
  });

  const statusButtons = bookList.querySelectorAll('.status-btn');
  statusButtons.forEach((btn) => btn.addEventListener('click', async (e) => {
    const doc = await db.collection('books').doc(e.target.dataset.id).get();
    const book = doc.data();
    book.id = doc.id;
    book.status = !book.status;

    await db.collection('books').doc(book.id).update(book);
    render();
  }));

  const deleteButtons = bookList.querySelectorAll('.delete-btn');
  deleteButtons.forEach((btn) => btn.addEventListener('click', async (e) => {
    await db.collection('books').doc(e.target.dataset.id).delete();
    render();
  }));
}

function render_form () {
  form.classList.remove('d-none');
}

function hide_form () {
  form.classList.add('d-none');
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
