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
        password: req.body.password
    }
    
    dbService.getDataBase().ref('users/' + req.body.username).set(usr);

    res.json("Post success");
});

// PUT CAMBIO CONTRASEÑA
router.put('/', (req, res) => {
    const usr = {
        password: req.body.password,
    }
    
    dbService.getDataBase().ref('users/' + req.body.username).update(usr);
    res.json("Put success")
});

// PUT INSTRUMENT
router.put('/instrument', (req, res) => {
    dbService.getDataBase().ref('users/' + req.body.username + '/instruments/' + req.body.instrument).push(req.body.instrument);

    res.json("Put success")
});

// PUT FRIEND
router.put('/friend', (req, res) => {
    dbService.getDataBase().ref('users/' + req.body.username + '/friends/' + req.body.friend).push(req.body.friend);

    res.json("Put success")
});

// PUT GENRE
router.put('/genre', (req, res) => {
    dbService.getDataBase().ref('users/' + req.body.username + '/genres/' + req.body.genre).push(req.body.genre);

    res.json("Put success")
});

// GET USER INSTRUMENTS
router.get('/:username/instruments', (req, res) => {
    const ref = dbService.getDataBase().ref('users/' + req.params.username + '/instruments');

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});

// GET USER FRIENDS
router.get('/:username/friends', (req, res) => {
    const ref = dbService.getDataBase().ref('users/' + req.params.username + '/friends');

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
});

// GET USER GENRES
router.get('/:username/genres', (req, res) => {
    const ref = dbService.getDataBase().ref('users/' + req.params.username + '/genres');

    ref.on('value', (snapshot) => {
        res.json(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
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
