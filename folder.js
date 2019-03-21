const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const folderSchema = new mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    user : {type:Schema.Types.ObjectId, ref : 'user'}, 
    documents: [{type : Schema.Types.ObjectId, ref : 'document'}]

})

module.exports = mongoose.model('folder',folderSchema);