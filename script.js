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

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

console.log(theHobbit.info());
