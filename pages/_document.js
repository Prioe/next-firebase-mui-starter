import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import session from 'utils/middleware/session'
import pkg from '../package.json'

export async function middleware({ req, res }) {
  if (!req) {
    return
  }
  await session(req, res)
}

class EnhancedDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => {
          return Component
        }
      })

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            src={`https://polyfill.io/v3/polyfill.min.js?features=${pkg.eslintConfig.settings.polyfills.join(
              '%2C'
            )}`}
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default EnhancedDocument
