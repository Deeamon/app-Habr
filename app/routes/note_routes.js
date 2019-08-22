/*module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        console.log(req.body);
        res.send('Hello');
    });
};*/

module.exports = function(app, db) {
    //console.log("!!!!" + toString(db) + db.collection);
    app.get('/notes/:id', (req, res) => {

      const ObjectId = require('mongodb').ObjectID;
      const id = req.params.id;
      const details = { '_id': new ObjectId (id) };
      //console.log("!!!!" + details);
      db.collection('notes').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
        } 
      });
    });

    app.delete('/notes/:id', (req, res) => {
      const id = req.params.id;
      const ObjectId = require('mongodb').ObjectID;
      const details = { '_id': new  ObjectId (id) };
      db.collection('notes').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Note ' + id + ' deleted!');
        } 
      });
    });

    app.put ('/notes/:id', (req, res) => {
      const id = req.params.id;
      const ObjectId = require('mongodb').ObjectID;
      const details = { '_id': new ObjectId(id) };
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').update(details, note, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
      });
    });

    app.post('/notes', (req, res) => {
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
};

