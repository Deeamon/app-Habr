const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;
const dbName = 'myfirstcluster';
const assert = require('assert');



const mongoClient = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(mongoClient);
//console.log(mongoClient.s.namespace);

app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect( (err, db) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //console.log("base: " + database);
  const database = db.db(dbName);

  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });  
         
});
