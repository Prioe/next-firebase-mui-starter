const wrapMiddleware = (middleware) => async (req, res) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (err) => (err ? reject(err) : resolve()))
  })
}

export default wrapMiddleware
