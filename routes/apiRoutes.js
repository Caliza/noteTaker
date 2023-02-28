const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text } = req.body;

  // If required properties (all) are present,
  if (title && text) {
    // Variable for the object that will saved
    const newNote = {
      title,
      text,
      id: uuid(),
      //remove underscore for extracredit.
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

router.delete('/notes/:id', (req, res) => {
  const deleteId = req.params.id
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err
    const db = JSON.parse(data)
    const filterNotes = db.filter(note => {
      console.log(note.id, deleteId)
      return note.id !== deleteId
    })
    console.log('filterNotes', filterNotes)
    fs.writeFile('db/db.json', JSON.stringify(filterNotes), err => {
      if (err) throw err
      res.send(filterNotes)
    })
  })``
})

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = router;
