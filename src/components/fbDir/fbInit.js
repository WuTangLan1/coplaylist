// src/components/fbDir/fbInit.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
const { getStorage } = require('firebase/storage');
const fbConfig = require('./fbConfig');

const firebaseApp = initializeApp(fbConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

module.exports = { db, auth, storage };
