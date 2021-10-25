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
    
    dbService.getDataBase().ref('genres/' + req.body.name).set(genre);
    res.json("Post success");
});

// GET BY NAME
router.get('/:name', (req, res) => {
    const ref = dbService.getDataBase().ref('genres/' + req.params.name);

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});

// GET ALL
router.get('/', (req, res) => {
    const ref = dbService.getDataBase().ref('genres');

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});

