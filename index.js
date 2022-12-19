const express = require("express");
require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({
    extended:true
}))
app.use("/user",require("./routes/user.js"));
app.use("/book",require("./routes/book.js"));

app.post("/verify", async (req, res)=>{
    const token = req.body.token;
    const user = jwt.verify(token,"secretkeyhere");
    res.send(user);

})


app.listen(1212);
