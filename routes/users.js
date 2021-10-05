const express = require('express');
const router = express.Router();
const dbService = require('../db')

// REST methods

// POST
router.post('/', (req, res) => {
    const usr = {
        firstname: req.body.firstname
    }
    
    dbService.getDataBase().ref('users').push(usr)
    res.json("Post success")
});

module.exports = router;
