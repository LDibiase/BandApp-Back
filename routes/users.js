const express = require('express');
const router = express.Router();
const dbService = require('../db')
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const { remoteConfig } = require('firebase-admin');

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
        instruments: req.body.instruments,
        friends: req.body.friends,
        genres: req.body.genres,
        bio: req.body.bio
    }
    
    dbService.getDataBase().collection('users').doc(req.body.email).set(usr);

    res.json("Post success");
});

// PUT CAMBIO CONTRASEÑA
router.put('/', (req, res) => {
    
    const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
    userRef.set({
      password: req.body.password
    }, { merge: true })

    res.json("Put success")
});

// PUT INSTRUMENT
router.put('/instrument', (req, res) => {
  
    const newInstrument = {
      name: req.body.name,
      active: true
    }

    const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
    userRef.update({
      instruments: admin.firestore.FieldValue.arrayUnion(newInstrument)
    })

    res.json("Put success")
});

// DELETE INSTRUMENT
router.delete('/instrument', (req, res) => {

  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);

  const instrumentToRemove = {
    name: req.body.name,
    active: req.body.status
  }
  userRef.update({
    instruments: admin.firestore.FieldValue.arrayRemove(instrumentToRemove)
  })

  res.json("Delete success")
})

// PUT INSTRUMENT CHANGE STATUS
router.put('/instrument/status', (req, res) => {

  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);

  const instrumentToRemove = {
    name: req.body.name,
    active: !req.body.status
  }

  userRef.update({
    instruments: admin.firestore.FieldValue.arrayRemove(instrumentToRemove)
  })

  const newInstrument = {
    name: req.body.name,
    active: req.body.status
  }

  userRef.update({
    instruments: admin.firestore.FieldValue.arrayUnion(newInstrument)
  })

  res.json("Put success")
});

// PUT FRIEND
router.put('/friend', (req, res) => {
  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
  userRef.update({
    friends: admin.firestore.FieldValue.arrayUnion(req.body.friend)
  })

  res.json("Put success")
});

// DELETE FRIEND
router.delete('/friend', (req, res) => {
  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
  userRef.update({
    friends: admin.firestore.FieldValue.arrayRemove(req.body.friend)
  })

  res.json("Delete success")
})

// PUT GENRE
router.put('/genre', (req, res) => {
  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
  userRef.update({
    genres: admin.firestore.FieldValue.arrayUnion(req.body.genre)
  })

  res.json("Put success")
});

// DELETE GENRE
router.delete('/genre', (req, res) => {
  const userRef = dbService.getDataBase().collection('users').doc(req.body.email);
  userRef.update({
    genres: admin.firestore.FieldValue.arrayRemove(req.body.genre)
  })

  res.json("Delete success")
})

// POST BY EMAIL AND PASSWORD
router.post('/login', async (req, res) => {
  const ref = dbService.getDataBase().collection('users').doc(req.body.email);

  const result = await getUserByEmail(ref);

  if (result != null && req.body.password === result.password) {
    res.json(result);
  } else {
    res.statusCode = 401;
    res.json("Password invalid")
  }
});

async function getUserByEmail(ref) {
  const doc = await ref.get();

  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
}

// GET BY EMAIL
router.get('/:email', async (req, res) => {
  const ref = dbService.getDataBase().collection('users').doc(req.params.email);

  const result = await getUserByEmail(ref);
  res.json(result);

});

async function getUserByEmail(ref) {
  const doc = await ref.get();

  if (!doc.exists) {
    return null;
  } else {
    return doc.data();
  }
}


// GET ALL
router.get('/', async (req, res) => {
  const ref = dbService.getDataBase().collection('users');

  const result = await getUsers(ref);
  res.json(result);

});

async function getUsers(ref) {
  const snapshot = await ref.get();
  const result = []

  snapshot.forEach(doc => {
    result.push(
      {
        user: doc.id,
        data: doc.data()
      })
  });

  return result;
}

// END USERS

// GET (TEST)
router.get('/', (req, res) => {
    const usr = {
        firstname: "USER TEST"
    }
    
    res.json(usr)
});

module.exports = router;
