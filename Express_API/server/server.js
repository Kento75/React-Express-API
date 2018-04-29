import path from 'path';
import express from 'express';
import db from './db';
import bodyParser from 'body-parser';

var cors = require('cors');
var app = express();
app.use(cors());

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// Access to DB controllers
const companyMasterController = db.controllers && db.controllers.CompanyMaster;
if (companyMasterController) {
  app.post('/companyFind', companyMasterController.companyFind);
  app.post('/companyAdd', companyMasterController.companyAdd);
}

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
