/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const vision = require('@google-cloud/vision')

const fileUploader = require('express-fileupload');

const client = new vision.ImageAnnotatorClient();


const app = express();


app.use(fileUploader());


app.post('/processImage',function(req,res) {
  

let imageFile = req.files.image.data;
let encoded = Buffer.from (imageFile).toString('base64');

const request = {

  image: { content: encoded }

};

client.documentTextDetection(request).then(response => {

    res.send(response);

  })

});



// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]
