const express = require("express");
const route = express.Router();
const Books = require("../Book");

//BOOK MANAGE HERE................

//Add Books.................
route.post("/", (req, res) => {
  let name = req.body.name;
  let title = req.body.title;
  let price = req.body.price;

  // creating Book.......................

  const new_book = new Books({
    name: name,
    title: title,
    price: price,
  });

  //saving book into database...................

  new_book.save();

  res.send({
    message : "Book Added successfully"
  });
});

//Get Book.................
route.get("/", async (req, res) => {
  const books = await Books.find();
  res.send(books);
});

//GET Book by id .......................................
route.get("/:id", async (req, res) => {
  let book_id = req.params.id; // params is use to get data from url
  let books = await Books.findOne({ _id: book_id });
  if (books) {
    res.send(books);
  } else {
    res.send({
      message : "Book not found"
    });
  }
});


//delete Book .......................................
route.delete("/:id", (req, res) => {
  let book_id = req.params.id; // params is use to get data from url
  Books.findByIdAndDelete(book_id).then(() => {
    res.send({
      message : "Book deleted successfully"
    });
  });
});

// Update Book.................................
route.put("/:id", async (req, res) => {
  let bookId = req.params.id;
  console.log(req.body);
  let name = req.body.name;
  let title = req.body.title;
  let price = req.body.price;
  let updated_book = await Books.findOne({ _id: bookId })
  if(updated_book)
  {
    updated_book.name = name;
    updated_book.title = title;
    updated_book.price = price;
    await updated_book.save();
    res.send({
      message : "Book Updated successfully"
    });
  }
  else
  {
    res.send({
      message : "Book not found"
    })
  }
  

});
module.exports = route;


