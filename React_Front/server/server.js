import path from 'path';
import express from 'express';

var app = express();

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3001, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('******************************************');
  console.log('>> React Front Start >>');
  console.log('>> Listening at http://localhost:3001 >> ');
  console.log('');
  console.log('search: http://localhost:3001/search');
  console.log('add   : http://localhost:3001/add');
  console.log('');
  console.log('******************************************');
});