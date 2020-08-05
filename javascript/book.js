let myBooksList = [
  {
    image_url: 'https://a.wattpad.com/cover/22127925-288-k860552.jpg',
    title: 'Harry Potter Chapter 1',
    author: 'Jose Roberto',
    pages: 535
  },
  {
    image_url: 'https://images-na.ssl-images-amazon.com/images/I/81s5gr8znaL.jpg',
    title: 'Alchimist',
    author: 'Zakariae El Mejdki',
    pages: 230
  },
  {
    image_url: 'https://miro.medium.com/max/480/1*E6aoQIUVWcJbDbXulkLpkg.jpeg',
    title: 'Rich Dad Poor Dad',
    author: 'Zakariae Roberto',
    pages: 354
  }
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
          <p class="book-title">${book.title}</p>
          <p class="book-author">author: ${book.author}</p>
          <p class="book-pages">pages: ${book.pages}</p>
        </div>
      </div>
    `;

    bookList.innerHTML += card;
  });
}

render();
