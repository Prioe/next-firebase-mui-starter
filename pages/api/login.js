import micro from 'micro'
import firebase from '../../utils/isomorphic-firebase'
import session from '../../utils/session'

export default micro(async (req, res) => {
    if (!req.body) return res.sendStatus(400)
    await session(req, res)

    const token = req.body.token

firebase
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
    req.session.decodedToken = decodedToken
    return decodedToken
    })
    .then(decodedToken => res.json({ status: true, decodedToken }))
    .catch(error => console.log(error) || res.json({ error }))
})

