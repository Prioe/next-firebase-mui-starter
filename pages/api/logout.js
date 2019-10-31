import session from '../../utils/session'
export default async (req, res) => {
    await session(req, res)
    req.session.decodedToken = null
    res.json({ status: true })
  }

