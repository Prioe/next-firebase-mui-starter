/* eslint-disable global-require */
import config from 'config'
// eslint-disable-next-line import/no-mutable-exports
let firebase

if (typeof window === 'undefined') {
  firebase = require('firebase-admin')
  if (!firebase.apps.find((app) => app.name === '[DEFAULT]'))
    firebase.initializeApp({
      credential: firebase.credential.cert(config.firebaseAdminCredential),
      databaseURL: config.databaseURL
    })
} else {
  firebase = require('firebase/app')
  require('firebase/auth')
  firebase.initializeApp(config.firebaseClient)
}

export default firebase
