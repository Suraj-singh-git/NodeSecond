const mongoose = require("mongoose");
const Schema = mongoose.Schema  //use to create a table/collection


const bookSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    title : {
        type:String,
        required:true
    },
    price : String
    
});   


const books_model = mongoose.model("Books",bookSchema);   //collection created ("collection Name", collection Schema)

//Export

module.exports = books_model;
