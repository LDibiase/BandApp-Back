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
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        instruments: [],
        genres: [],
        groups: [],
    }
    
    dbService.getDataBase().ref('users').push(usr)
    res.json("Post success")
});

// GET BY EMAIL
router.get('/:email', (req, res) => {
    const ref = dbService.getDataBase().ref('users');
    ref.orderByChild('email').equalTo(req.params.email).on('value',  (snap) => {
        const usr = {
            firstname: "",
            surname: "",
            email: "",
            instruments: [],
            genres: [],
            groups: [],
        }

        for(var key in snap.val()){
            usr.firstname = snap.val()[key].firstname;
            usr.surname = snap.val()[key].surname;
            usr.email = snap.val()[key].email;
            usr.instruments = snap.val()[key].instruments;
            usr.genres = snap.val()[key].genres;
            usr.groups = snap.val()[key].groups;
        }
        res.json(usr);
    })
});

// END USERS

// GENRES



// END GENRES

// GET (TEST)
router.get('/', (req, res) => {
    const usr = {
        firstname: "USER TEST"
    }
    
    res.json(usr)
});

module.exports = router;
