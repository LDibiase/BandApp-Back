const express = require('express');
const router = express.Router();
const dbService = require('../db')
const { v4: uuidv4 } = require('uuid');

// REST methods

module.exports = router;

// POST
router.post('/', (req, res) => {
    const genre = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description
    }
    
    dbService.getDataBase().collection('genres').doc(req.body.name).set(genre);
    res.json("Post success");
});

// GET BY NAME
router.get('/:name', async (req, res) => {
  const ref = dbService.getDataBase().collection('genres').doc(req.params.name);

  const result = await getGenresByName(ref);
  res.json(result);

});

async function getGenresByName(ref) {
  const doc = await ref.get();

  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
}

// GET ALL
router.get('/', async (req, res) => {
  const ref = dbService.getDataBase().collection('genres');

  const result = await getGenres(ref);
  res.json(result);

});

async function getGenres(ref) {
  const snapshot = await ref.get();
  const result = []

  snapshot.forEach(doc => {
    result.push(
      {
        genre: doc.id,
        data: doc.data()
      })
  });

  return result;
}

