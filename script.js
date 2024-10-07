// Array which contains all books
const myLibrary = [];

// Constructor for book objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    const upperString =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    if (this.read) {
      return upperString + "done";
    } else {
      return upperString + "not read yet";
    }
  };
}

function addBookToLibrary() {}

function displayBooks() {
  const books = document.querySelector("#books");

  myLibrary.forEach((book) => {
    let newRow = document.createElement("tr");

    for (const key of Object.keys(book)) {
      if (key == "info") {
        continue;
      }
      let newCell = document.createElement("td");
      newCell.innerText = `${book[key]}`;
      newRow.appendChild(newCell);
    }
    books.appendChild(newRow);
  });
}

// test books
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
myLibrary.push(theHobbit);

displayBooks();
