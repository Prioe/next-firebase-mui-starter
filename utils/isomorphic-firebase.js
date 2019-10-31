let firebase

if (typeof window === 'undefined') {
    firebase = require('firebase-admin')
    if (!firebase.apps.find(app => app.name === '[DEFAULT]'))
firebase.initializeApp(
  {
    credential: firebase.credential.cert(require('../credentials/server')),
    databaseURL: 'https://next-example-69997.firebaseio.com'
  }
)


} else {
    firebase = require('firebase/app')
    require('firebase/auth')
    firebase.initializeApp(require('../credentials/client'))

}

export default firebase