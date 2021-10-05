const admin = require('firebase-admin');
const serviceAccount = require('./bandapp-607b4-firebase-adminsdk-ta5bx-a88c8b3e9b.json');

let db = null;

function configDataBase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  })
}

function getDataBase() {
  if (db == null) {
    db = admin.database();
  }

  return db;
}

module.exports = { configDataBase, getDataBase };
