const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pname:String,
    price:Number,
    pdesc: String,
    picname: String,
    pid:Number,
    cid: Number
});

const model = mongoose.model('products',productSchema);

module.exports = model;