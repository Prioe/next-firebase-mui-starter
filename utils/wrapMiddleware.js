const wrapMiddleware = (middleware) => async (req, res) => {
  return new Promise((resolve, reject) => {
    if (!req) {
      console.log('asdf', req, res, typeof window)
    }

    middleware(req, res, (err) => (err ? reject(err) : resolve()))
  })
}

export default wrapMiddleware
