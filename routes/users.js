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
        person: {
            firstname: req.body.firstname,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
        },
        music: {
            instruments: [],
            genres: [],
        },
        groups: {
            personId: null,
        }
    }
    
    dbService.getDataBase().ref('users').push(usr)
    res.json("Post success")
});

// GET BY EMAIL
router.get('/:email', (req, res) => {
    const ref = dbService.getDataBase().ref('users');

    ref.orderByChild('users/person').equalTo(req.params.email).on('child_added', (snapshot) => {
        res.json(snapshot.key)
    });
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
