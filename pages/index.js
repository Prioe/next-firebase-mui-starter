import React, { useCallback } from 'react'
import firebase from 'utils/isomorphic-firebase'
import { useUser, getInitialUser } from 'components/UserContext'

function Index() {
  const user = useUser()

  const handleLogin = useCallback(() => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }, [])

  const handleLogout = useCallback(() => {
    firebase.auth().signOut()
  }, [])

  return (
    <div>
      {user ? (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      )}
      {user && (
        <div>
          <br />
          <img alt="" src={user.picture} />
          <p>
            <b>{user.name}</b> {user.email}
          </p>
        </div>
      )}
    </div>
  )
}

Index.getInitialProps = getInitialUser()

export default Index
