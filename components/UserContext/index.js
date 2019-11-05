import React, { useContext, useState, useEffect } from 'react'
import firebase from 'utils/isomorphic-firebase'

export const UserContext = React.createContext({ user: null })

export function useUser() {
  const user = useContext(UserContext)
  return user
}

export function UserProvider(props) {
  const { children, initialUser } = props
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser({
          ...(await currentUser.getIdTokenResult()).claims,
          uid: currentUser.uid,
          server: false
        })
        const token = await currentUser.getIdToken()
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })
        return
      }
      setUser(null)
      await fetch('/api/logout', {
        method: 'POST'
      })
    })
  }, [])

  // initialUser
  // null: not authenticated
  // undefined: not loaded
  // object: authenticated

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function getInitialUser(originalGetInitialProps) {
  return async function getInitialProps(ctx) {
    let user
    if (typeof window === 'undefined') {
      user = ctx.req.session.decodedToken && {
        ...ctx.req.session.decodedToken,
        server: true
      }
    }
    const { currentUser } = firebase.auth()
    if (currentUser) {
      const decodedToken = await currentUser.getIdTokenResult()
      user = decodedToken.claims && {
        ...decodedToken.claims,
        uid: currentUser.uid,
        server: false
      }
    }

    user = user || null

    if (typeof originalGetInitialProps === 'function') {
      return {
        __user: user,
        ...(await originalGetInitialProps({ ...ctx, user }))
      }
    }
    return {
      __user: user
    }
  }
}
