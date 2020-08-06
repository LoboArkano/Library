let myBooksList = [
  {
    image_url: 'https://a.wattpad.com/cover/22127925-288-k860552.jpg',
    title: 'Harry Potter Chapter 1',
    author: 'Jose Roberto',
    pages: 535,
    read: false,
  },
  {
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/81s5gr8znaL.jpg',
    title: 'Alchimist',
    author: 'Zakariae El Mejdki',
    pages: 230,
    read: true,
  },
  {
    image_url: 'https://miro.medium.com/max/480/1*E6aoQIUVWcJbDbXulkLpkg.jpeg',
    title: 'Rich Dad Poor Dad',
    author: 'Zakariae Roberto',
    pages: 354,
    read: false,
  },
];

const defaultCover = 'https://www.brantlibrary.ca/en/resourcesGeneral/default-river.png';

function Book(title, author, pages, image_url = defaultCover, read) {
  this.title = title;
  this.image_url = image_url;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
          <p class="d-flex align-center status ${book.read ? 'green' : 'red'}">
            <span class="circle ${book.read ? 'green-bg' : 'red-bg'}">
            </span>
            ${book.read ? 'Already read' : 'Not read yet'}
          </p>
          <p class="book-title">${book.title}</p>
          <p class="book-author">Author: ${book.author}</p>
          <p class="book-pages">Pages: ${book.pages}</p>
        </div>
      </div>
    `;

    bookList.innerHTML += card;
  });
}

function render_form () {
  const form = document.getElementById('book-form');
  form.classList.remove('d-none');
}

function hide_form () {
  const form = document.getElementById('book-form');
  form.classList.add('d-none');
}

function getRadioVal(form, name) {
  var val;
  console.log(form);
  var radios = form.elements[name];

  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) {
          val = radios[i].value;
          break;
      }
  }
  return val;
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
  const book = new Book(
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
