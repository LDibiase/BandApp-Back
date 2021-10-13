const admin = require('firebase-admin');
const fs = require('fs');

let db = null;

function configDataBase() {

  if (fs.existsSync('./bandapp-607b4-firebase-adminsdk-ta5bx-a88c8b3e9b.json')) {
    let rawdata = fs.readFileSync('./bandapp-607b4-firebase-adminsdk-ta5bx-a88c8b3e9b.json');
    let serviceAccount = JSON.parse(rawdata);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DATABASE_URL
    })
  } else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.DATABASE_URL
    })
  }
}

function getDataBase() {
  if (db == null) {
    db = admin.database();
  }

  return db;
}

module.exports = { configDataBase, getDataBase };
