const express = require('express');
const router = express.Router();

// REST methods

// GET
router.get('/', (_, res) => {
    res.json("TEST")
});

module.exports = router;
