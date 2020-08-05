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

function Book() {

}

function addBookToList (book) {
  myBooksList.push(book);
}

function render () {
  const bookList = document.getElementById('book-list');
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

render();
