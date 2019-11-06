import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import session from 'utils/middleware/session'
import { ServerStyleSheets } from '@material-ui/core/styles'
import pkg from '../package.json'

export async function middleware({ req, res }) {
  if (!req) {
    return
  }
  await session(req, res)
}

class EnhancedDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      })

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
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
