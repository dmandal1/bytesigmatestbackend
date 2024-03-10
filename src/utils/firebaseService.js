const admin = require('firebase-admin');
const serviceAccount = require('../../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const storage = admin.storage().bucket();

module.exports = storage;
