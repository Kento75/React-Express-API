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
  console.log("*********************");
  app.post('/find', companyMasterController.companyFind);
  app.post('/add', companyMasterController.companyAdd);
  app.post('/remove', companyMasterController.companyRemove);
  app.post('/update', companyMasterController.companyUpdate);
}

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
