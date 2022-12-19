const express = require("express");
const jwt = require("jsonwebtoken");
const route = express.Router();
const User = require("../User");
const Book = require("../Book");

//get user...............

route.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});


//get single user...............

route.get("/:id", async (req, res) => {
    const user = await User.findOne({_id:req.params.id}).populate({path:"books"}).exec();
    res.send(user);
  });


//Get Books Details................

route.get("/book/:id",async(req, res)=> {
    const user = await User.findOne({_id:req.params.id});
    if(user)
    {
        const books = await Book.find({
            _id: {
                $in:user.books
            }
        })
        res.send(books)
    }
    else{
        res.send("no such user found ");
    }
})


//user registration.................

route.post("/register", (req, res) => {
  console.log(req.body);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let password = req.body.password;
  

  // creating user.......................

  const new_user = new User({
    fname: fname,
    lname: lname,
    email: email,
    password: password
  });

  //saving user into database...................

  new_user.save((err, resp)=>{
    if(err)
    {
      res.send(err)
    }
    res.send({
      message : "User registration successfull"
    });
    
  });

});

// Login users.......................

route.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.findOne(
    {
      email: email,
      password: password
    },
    {
      //to hide password or show (value should be 0, 1).............
      password: 0,
    }
  );
  if (user) {
    let token = jwt.sign({id:user._id},"secretkeyhere");
    res.send({
      user,
      token,
      message: "login successfull !"
    });
  } else {
    res.status(404).send({
      message : "User Not Found !"
    });
  }
});
//delete users .......................................

route.delete("/:id", (req, res) => {
  let user_id = req.params.id; // params is use to get data from url
  User.findByIdAndDelete(user_id).then(() => {
    res.send({
      message : "user Deleted"
    });
  });
});
// Update users.................................

route.put("/:id", async (req, res) => {
  let userId = req.params.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let password = req.body.password;
  await User.findByIdAndUpdate(userId, {
    fname: fname,
    lname: lname,
    password: password,
  });
  res.send({
    message : "update success"
  });
});

//Issue Book to users.................
route.post("/issue/:bookId",async(req, res)=> {
    const bookId = req.params.bookId;
    const userId = req.body.id;
    // check book is available or not
    const user = await User.findOne({_id:userId});

    const book = await Book.findOne({_id:bookId});
    if(book && user)
    {
        user.books.push(book._id);
        await user.save();
        res.send("Book Added Success");
    }
    else{
        res.status(404).send("Book Not Found !");
    }


})





module.exports = route;
