const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    realname: String,
    password : String, 
    folders: [{type:Schema.Types.ObjectId, ref : 'folder'}]


})

module.exports = mongoose.model('user',userSchema);