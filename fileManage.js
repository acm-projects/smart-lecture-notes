let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let Folder = require('../models/folder');
let document = require('../models/document');
let user = require('../models/user');
let bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');




router.use(fileUploader());

router.use(bodyParser.urlencoded({
  extended : false
}));

router.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/folders',{
  useNewUrlParser: true
});

router.post('/getUserFolders', function(req,res){

  user.findOne({_id : req.body.id})
  .populate('folders','name')
  .exec(function(err,user){
    if(err) return handleError(err);
    res.send(user)
  })

})

router.post('/getAllDocuments',function(req,res){

  Folder.
  findOne({name : req.body.name})
  .populate('documents','name')
  .exec(function(err,folder){
      if(err) return handleError(err);
      res.send(folder.documents);
  })

})

router.post('/addFolder',function(req,res){

    user.findOne({_id:req.body.id})

    .then( user => {

      let foldId = new mongoose.Types.ObjectId();

      let folder = new Folder({

      name : req.body.name,
      _id : foldId

      })

    user.folders.push(foldId);
    user.save();

    folder.save();
    res.send(folder);

    })  
})



router.get('/wordSearch', function(req,res){

  var phrase = req.body.search;
  

  console.log(req.body);


  document.find({content: new RegExp(phrase)}, function(err,docs){
    
    let names = new Array;

    docs.forEach( doc => {
      names.push(doc.name)
    })

    res.send(names);
    
  });
})







router.post('/addDocument',function(req,res){

  

  Folder.findOne({name:req.body.folder})
  .then(fold => {
    
    let docId = new mongoose.Types.ObjectId();
    

    let doc = new document({

    _id : docId,
    name : req.body.name,
    content : req.body.content,
    folder : fold._id,
    image : req.files.image.data

  })


  fold.documents.push(docId);
  fold.save();

  doc.save();
  res.send(doc);
    
  })
  .catch( err =>{
    console.log(err)

  })
})

module.exports = router