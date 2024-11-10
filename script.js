// Array which contains all books
let myLibrary = [];

// EventListener to get book inputs
const addBook = document
  .getElementById("addBook")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (inputValidation()) {
      addBookToLibrary();
    }
  });

// Input-Fields

const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookRead = document.querySelector("#bookRead");

// Table for all books
const booksTable = document.querySelector("#books");

function inputValidation() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.style.display = "none";

  let isValid = true;

  const fields = [
    { id: "bookTitle", type: "text", validator: validateRequired },
    { id: "bookAuthor", type: "text", validator: validateRequired },
    { id: "bookPages", type: "number", validator: validatePages },
  ];

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!field.validator(input.value)) {
      isValid = false;
      markFieldAsInvalid(input);
    } else {
      markFieldAsValid(input);
    }
  });

  if (!isValid) {
    errorMessage.style.display = "block";
    return false;
  } else {
    console.log("Form is valid.");
    return true;
  }
}

function validateRequired(value) {
  return value.trim() !== "";
}

// Validation function for Number of Pages
function validatePages(value) {
  const pages = Number(value);
  return pages > 0;
}

// Mark field as invalid
function markFieldAsInvalid(field) {
  field.style.borderColor = "red";
}

// Mark field as valid
function markFieldAsValid(field) {
  field.style.borderColor = "";
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    const upperString =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    if (this.read) {
      return upperString + "done";
    } else {
      return upperString + "not read yet";
    }
  }
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
  clearBooks();
  displayBooks();
}

function readBook(parentId) {
  myLibrary[parentId].read = true;
  clearBooks();
  displayBooks();
}

function deleteBook(parentId) {
  myLibrary.splice(parentId, 1);
  clearBooks();
  displayBooks();
}

function clearBooks() {
  while (booksTable.hasChildNodes()) {
    booksTable.removeChild(booksTable.firstChild);
  }
  let newRow = document.createElement("tr");

  const cellData = ["Title", "Author", "Pages", "Read", "Edit"];

  // Function to create and append a td element
  function createAndAppendCell(row, text) {
    let cell = document.createElement("th");
    cell.innerText = text;
    row.appendChild(cell);
  }

  // Loop through the cell data and create cells
  cellData.forEach((data) => createAndAppendCell(newRow, data));

  booksTable.appendChild(newRow);
}

// Add all Books from the myLibrary array to the html table
function displayBooks() {
  let counter = 0;
  myLibrary.forEach((book) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", counter);
    counter += 1;
    for (const key of Object.keys(book)) {
      if (key == "info") {
        continue;
      }
      let newCell = document.createElement("td");
      newCell.innerText = `${book[key]}`;
      newRow.appendChild(newCell);
    }

    let delButton = document.createElement("button");
    delButton.classList.add("delButton");
    delButton.innerHTML = "delete";
    newRow.appendChild(delButton);

    const parentId = delButton.parentElement.id;

    delButton.addEventListener("click", function () {
      deleteBook(parentId);
    });

    let readButton = document.createElement("button");
    readButton.classList.add("readButton");
    readButton.innerHTML = "read";
    newRow.appendChild(readButton);

    readButton.addEventListener("click", function () {
      readBook(parentId);
    });

    booksTable.appendChild(newRow);
  });
}

// test books
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
myLibrary.push(theHobbit);

// Display books which are already in the array
displayBooks();
