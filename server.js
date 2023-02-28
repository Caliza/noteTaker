const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/apiRoutes.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);``

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.delete('/api/notes/:id', (req, res) => {
  const deleteId = req.params.id;
  fs.promises.readFile('db/db.json')
  .then((data) => {
    const db = JSON.parse(data);
    const filterNotes = db.filter((note) => {
      console.log(note.id, deleteId);
      return note.id !== deleteId;
    })
    console.log('filterNotes', filterNotes);
    return fs.promises.writeFile('db/db.json', JSON.stringify(filterNotes))
  })
  .then((data) => {
    res.send(data);
  })
})