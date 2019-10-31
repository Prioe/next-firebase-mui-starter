let sessionMiddleware

if (typeof window === 'undefined') {
const session = require('express-session')
const firebase = require('./isomorphic-firebase').default
const FirebaseStore = require('connect-session-firebase')(session)

sessionMiddleware =    session({
      secret: 'geheimnis',
      saveUninitialized: true,
      store: new FirebaseStore({
        database: firebase.database()
      }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 } // week
    })


}

const session = async (req, res) => {
if (typeof window !== 'undefined') {
    throw new Error(`Can't run session in the browser.`)
}
    return new Promise((resolve, reject) => sessionMiddleware(req, res, (err) => err ? reject(err) : resolve()))
}

export function withSession (Component) {
    const originalGetInitialProps = Component.getInitialProps

    Component.getInitialProps = async function getInitialProps(ctx) {
        if (ctx.req) {
            await session(ctx.req, ctx.res)
        }

        if (originalGetInitialProps) {
            return originalGetInitialProps(ctx)
        }
        return {}
    }
    return Component
}

export default session
