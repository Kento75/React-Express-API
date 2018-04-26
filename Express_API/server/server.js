import path from 'path';
import express from 'express';
import db from './db';
import bodyParser from 'body-parser';


var app = express();

var cors = require('cors');
app.use(cors());

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

// Access to DB controllers
const sampleController = db.controllers && db.controllers.Sample;
if (sampleController) {
  app.post('/find', sampleController.find);
  app.post('/add', sampleController.add);
}

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
