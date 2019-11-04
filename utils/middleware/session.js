import session from 'express-session'
import makeFirebaseStore from 'connect-session-firebase'
import firebase from '../isomorphic-firebase'
import wrapMiddleware from '../wrapMiddleware'

const FirebaseStore = makeFirebaseStore(session)

const sessionMiddleware = wrapMiddleware(
  session({
    secret: 'geheimnis',
    saveUninitialized: true,
    store: new FirebaseStore({
      database: firebase.database()
    }),
    resave: false,
    rolling: true,
    httpOnly: true,
    cookie: { maxAge: 604800000 } // week
  })
)

export default sessionMiddleware
