// Firestore
const firestoreAdmin = require('firebase-admin');
const serviceAccount = require('./thadam-firestore-key.json');

firestoreAdmin.initializeApp({
  credential: firestoreAdmin.credential.cert(serviceAccount)
});

const db = firestoreAdmin.firestore();
module.exports = db;