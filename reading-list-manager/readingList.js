const fs = require('fs');
const chalk = require('chalk');

const filePath = './books.json';

function loadBooks() {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    console.log(chalk.red('Error reading file. Using empty list.'));
    return [];
  }
}

function saveBooks(books) {
  try {
    const dataJSON = JSON.stringify(books, null, 2);
    fs.writeFileSync(filePath, dataJSON);
  } catch (error) {
    console.log(chalk.red('Error saving file.'));
  }
}

function addBook(book) {
  const books = loadBooks();
  books.push(book);
  saveBooks(books);
}

function getUnreadBooks() {
  const books = loadBooks();
  return books.filter((book) => !book.read);
}

function getBooksByGenre(genre) {
  const books = loadBooks();
  return books.filter((book) => book.genre === genre);
}

function markAsRead(id) {
  const books = loadBooks();

  const updatedBooks = books.map((book) => {
    if (book.id === id) {
      return { ...book, read: true };
    }
    return book;
  });

  saveBooks(updatedBooks);
}

function getTotalBooks() {
  const books = loadBooks();
  return books.length;
}


function hasUnreadBooks() {
  const books = loadBooks();
  return books.some((book) => !book.read);
}

function printAllBooks() {
  const books = loadBooks();

  console.log(chalk.bold('\n📚 MY READING LIST 📚\n'));

  books.forEach((book) => {
    const status = book.read
      ? chalk.green('✓ Read')
      : chalk.yellow('⚠ Unread');

    console.log(
      `${book.id}. ${chalk.cyan(book.title)} by ${book.author} (${book.genre}) ${status}`
    );
  });
}

function printSummary() {
  const books = loadBooks();
  const readCount = books.filter((b) => b.read).length;
  const unreadCount = books.length - readCount;

  console.log(chalk.bold('\n📊 SUMMARY 📊'));
  console.log(chalk.bold(`Total Books: ${books.length}`));
  console.log(chalk.bold(`Read: ${readCount}`));
  console.log(chalk.bold(`Unread: ${unreadCount}`));
}


printAllBooks();
printSummary();