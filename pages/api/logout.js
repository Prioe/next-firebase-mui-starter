import micro from 'micro'
import session from 'utils/middleware/session'

export default micro(async (req, res) => {
  await session(req, res)
  req.session.decodedToken = null
  return { status: true }
})
