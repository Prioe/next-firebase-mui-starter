import micro from 'micro'
import firebase from '../../utils/isomorphic-firebase'
import session from '../../utils/session'

export default micro(async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  await session(req, res)

  const { token } = req.body

  const decodedToken = await firebase.auth().verifyIdToken(token)
  req.session.decodedToken = decodedToken
  return {
    status: true,
    decodedToken
  }
})
