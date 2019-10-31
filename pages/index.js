import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import clientCredentials from '../credentials/client'

export default class Index extends Component {
  static async getInitialProps ({ req, query }) {
    const user = req && req.session ? req.session.decodedToken : null
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentDidMount () {
    firebase.initializeApp(clientCredentials)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
        return user
          .getIdToken()
          .then(token => {
            // eslint-disable-next-line no-undef
            return fetch('/api/login', {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          })
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }

  handleLogin () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  render () {
    const { user } = this.state

    return (
      <div>
        {user ? (
          <button onClick={this.handleLogout}>Logout</button>
        ) : (
          <button onClick={this.handleLogin}>Login</button>
        )}
        {user && (
          <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
          </>
        )}
      </div>
    )
  }
}
