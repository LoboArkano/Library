let myBooksList = [
  "Harry Potter Chapter 1",
  "Alchimist",
  "Rich Dad Poor Dad"
];

function Book() {

}

function addBookToList (book) {
  myBooksList.push(book);
}

function render () {
  const bookList = document.getElementById('book-list');
  for (let i = 0; i < myBooksList.length; i += 1) {
    const card = document.createElement('div');
    card.className = 'item';
    card.innerHTML = myBooksList[i];
    bookList.appendChild(card);
  }
}

render();
