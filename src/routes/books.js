const express = require("express");
const router = express.Router();
const { booksDb } = require("../db");

router.get("/books/create", (req, res) => {
  res.render("books/create");
});

router.post("/books/create", (req, res) => {
  // console.log(req.body);
  const { title, author } = req.body;
  booksDb.create({ title, author });

  const haveBook = booksDb.findByTitle(title);
  if (!haveBook) {
    console.log(`${title} book exist`);
    return res.send(`${title} book exist`);
  }
  res.redirect("/books/list");
});
router.get("/books/list", (req, res) => {
  const book = booksDb.findAll();
  if (!book) {
    console.log("book not found");
    return res.status(404).send("book not found");
  }
  res.render("books/list", { book });
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksDb.findById(id);
  if (!book) {
    console.log("book not found");
    return res.status(404).send("book not found");
  }
  console.log(req.params);
  res.render("books/show", { book });
});
router.get("/books/:id/edit", (req, res) => {
  const { id } = req.params;
  const book = booksDb.findById(id);
  if (!book) {
    console.log("book not found");
    return res.status(404).send("book not found");
  }
  res.render("books/edit", { book });
});

router.post("/books/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = booksDb.findById(id);
  if (!book) {
    console.log("book not found");
    return res.status(404).send("book not found");
  }
  booksDb.update(id, { title, author });
  res.redirect("/books/list");
});
router.post("/books/:id/delete", (req, res) => {
  const { id } = req.params;
  console.log("delete book", id);
  const book = booksDb.findById(id);
  if (!book) {
    console.log("delete book not found");
    return res.status(404).send("delete book not found");
  }
  booksDb.remove(id);

  res.redirect("/books/list");
});
module.exports = router;
