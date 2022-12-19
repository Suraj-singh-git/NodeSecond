const mongoose = require("mongoose");
const Schema = mongoose.Schema  //use to create a table/collection

const userSchema = new Schema({
    fname : {
        type:String,
        required:true
    },
    lname : {
        type:String,
        required:true
    },
    email : String,
    password : String,
    books: {
        type: Array,
        ref: "Book"
    }
    
});   


const user_model = mongoose.model("User",userSchema);   //collection created ("collection Name", collection Schema)

//Export

module.exports = user_model;
