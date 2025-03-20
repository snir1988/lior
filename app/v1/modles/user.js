const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
     name:String,
     email:String,
     password: String
   
 });

const model = mongoose.model("User", userSchema);

module.exports = model;