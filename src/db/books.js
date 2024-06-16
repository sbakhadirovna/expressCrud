const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const dbPath = path.join(__dirname, "..", "books.json");

const findAll = () => {
  const Books = fs.readFileSync(dbPath, "utf8");
  const parsed = JSON.parse(Books);
  return parsed;
};
const findByTitle = (title) => {
  const books = findAll();
  const book = books.find((book) => book.title === title);
  return book ? book : null;
};

const create = (data) => {
  const books = findAll();
  const newBook = { id: uuid.v4(), ...data };
  books.push(newBook);
  fs.writeFileSync(dbPath, JSON.stringify(books, null, 2));
  return newBook;
};
// console.log(create({title:"shaytanat",author:"tohir malik"}));

const findById = (id) => {
  const books = findAll();
  let result = books.find((book) => book.id === id);
  return (result = result ? result : null);
};
// console.log(findById("a026617d-82a6-4553-99d6-33a6f01be038"));

const update = (id, newData) => {
  const books = findAll();
  let result = books.find((book) => book.id === id);
  if (result != undefined) {
    result = newData;
    result.id = id;
    const arr = books.filter((books) => books.id !== id);
    arr.push(result);
    const data = JSON.stringify(arr, null, 2);
    fs.writeFileSync(dbPath, data, "utf8");
    return true;
  } else {
    return false;
  }
};
// console.log(update("a026617d-82a6-4553-99d6-33a6f01be038",{title:"shaytanat",author:"utkir hoshimov"}));

const remove = (id) => {
  const books = findAll();
  let result = books.filter((book) => book.id !== id);
  const data = JSON.stringify(result, null, 2);
  fs.writeFileSync(dbPath, data, "utf8");
  return true;
};
// console.log(remove("a026617d-82a6-4553-99d6-33a6f01be038"));
module.exports = { findAll, update, create, findById, remove, findByTitle };
