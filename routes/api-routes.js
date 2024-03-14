const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises; // Async file operations
const dbPath = "db/db.json";

// GET all notes
router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await fs.readFile(dbPath, 'utf8');
    res.json(JSON.parse(dbJson));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new note
router.post('/api/notes', async (req, res) => {
  try {
    const dbJson = JSON.parse(await fs.readFile(dbPath, 'utf8'));
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    dbJson.push(newNote);
    await fs.writeFile(dbPath, JSON.stringify(dbJson, null, 2)); // Pretty-print JSON
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE a note by ID
router.delete('/api/notes/:id', async (req, res) => {
  try {
    const dbJson = JSON.parse(await fs.readFile(dbPath, 'utf8'));
    const newNotes = dbJson.filter((note) => note.id !== req.params.id);
    await fs.writeFile(dbPath, JSON.stringify(newNotes, null, 2)); // Pretty-print JSON
    res.json({ msg: 'Note deleted', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

