import React, { useCallback } from 'react'
import firebase from 'utils/isomorphic-firebase'
import { Button } from '@material-ui/core'
import { useUser } from 'components/UserContext'

export default function AuthenticationButton(props) {
  const user = useUser()
  const handleClick = useCallback(() => {
    if (user) {
      firebase.auth().signOut()
      return
    }

    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }, [user])

  return (
    <Button color="inherit" {...props} onClick={handleClick}>
      {user ? 'Logout' : 'Login'}
    </Button>
  )
}
