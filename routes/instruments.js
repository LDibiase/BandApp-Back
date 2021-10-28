const express = require('express');
const router = express.Router();
const dbService = require('../db')
const { v4: uuidv4 } = require('uuid');

// REST methods

module.exports = router;

// POST
router.post('/', (req, res) => {
  const instrument = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description
  }
  
  dbService.getDataBase().collection('instruments').doc(req.body.name).set(instrument);
  res.json("Post success");
});

// GET BY NAME
router.get('/:name', async (req, res) => {
const ref = dbService.getDataBase().collection('instruments').doc(req.params.name);

const result = await getInstrumentsByName(ref);
res.json(result);

});

async function getInstrumentsByName(ref) {
const doc = await ref.get();

if (!doc.exists) {
  return null;
} else {
  return doc.data();
}
}

// GET ALL
router.get('/', async (req, res) => {
const ref = dbService.getDataBase().collection('instruments');

const result = await getInstruments(ref);
res.json(result);

});

async function getInstruments(ref) {
const snapshot = await ref.get();
const result = []

snapshot.forEach(doc => {
  result.push(
    {
      instrument: doc.id,
      data: doc.data()
    })
});

return result;
}

