const express = require('express');
const router = express.Router();
const dbService = require('../db')
const { v4: uuidv4 } = require('uuid');

// REST methods

// USERS

// POST
router.post('/', (req, res) => {
    const usr = {
        id: uuidv4(),
        username: req.body.username,
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        instruments: [],
        genres: [],
        groups: [],
    }
    
    dbService.getDataBase().ref('users/' + req.body.username).set(usr);
    res.json("Post success");
});

// PUT
router.put('/', (req, res) => {
    const usr = {
        password: req.body.password,
    }
    
    dbService.getDataBase().ref('users/' + req.body.username).update(usr)
    res.json("Put success")
});

// GET BY USERNAME
router.get('/:username', (req, res) => {
    const ref = dbService.getDataBase().ref('users/' + req.params.username);

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});


// GET ALL
router.get('/', (req, res) => {
    const ref = dbService.getDataBase().ref('users');

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});

// END USERS

// GET (TEST)
router.get('/', (req, res) => {
    const usr = {
        firstname: "USER TEST"
    }
    
    res.json(usr)
});

module.exports = router;
