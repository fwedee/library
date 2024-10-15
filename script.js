// Array which contains all books
const myLibrary = [];

// EventListener to get book inputs
const addBook = document
  .getElementById("addBook")
  .addEventListener("click", addBookToLibrary);

// Input-Fields

const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");

// Table for all books
const booksTable = document.querySelector("#books");

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

// Adds values of input fields to the myLibrary array
function addBookToLibrary() {
  let book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
  myLibrary.push(book);
  displayBooks();
}





// Add all Books from the myLibrary array to the html table
function displayBooks() {
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
    booksTable.appendChild(newRow);
  });
}

// test books
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
myLibrary.push(theHobbit);

// Display books which are already in the array
displayBooks();
