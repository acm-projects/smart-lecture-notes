

'use strict';


const express = require('express'); // create our express server object

const vision = require('@google-cloud/vision') // create our google cloud vision object

const fileUploader = require('express-fileupload'); // this object handles grabbing uploaded files in post requests

const client = new vision.ImageAnnotatorClient(); // instantiate the vision image annotator client


const app = express(); // create an instance of the express server 


app.use(fileUploader()); // tells express to use the file uploader object to parse post requests

// this declares the post function for a /process image request
app.post('/processImage',function(req,res) {
  

let imageFile = req.files.image.data; // grab the image buffer data from the post request using file uploader
let encoded = Buffer.from (imageFile).toString('base64'); // convert the buffer we grabbed into a base 64 buffer
//NOTE: the google api only accepts files converted to base64 buffers

//this creates the request object that the google api is designed to recieve  
const request = {
  
  //image is a keyword that tells the google api that we are passing
  // it an image buffer
  image: { content: encoded }

};

  
//this calls the client's documenttextdetection and passes it the request object
client.documentTextDetection(request).then(response => {
  
  // sends googles response to be displayed as the response on the server
    res.send(response);

  })

});



// Start the server
const PORT = process.env.PORT || 8080;

// This listens to the port and picks up requests
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

