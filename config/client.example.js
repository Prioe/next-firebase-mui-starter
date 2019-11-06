if (typeof window === 'undefined') {
  throw new Error('Dont require client-config on the server')
}

export default {
  client: true,
  firebaseClient: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  }
}
