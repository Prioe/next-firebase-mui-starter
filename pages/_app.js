import React, { useEffect } from 'react'
import NextApp from 'next/app'
import Head from 'next/head'
import { UserProvider } from 'components/UserContext'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import Layout from 'components/Layout'
import config from 'config'
// import theme from 'theme';

const theme = createMuiTheme(config.muiTheme)

function App(props) {
  const {
    Component,
    pageProps: { __user, ...pageProps }
  } = props

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
      </Head>
      <UserProvider initialUser={__user}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserProvider>
    </>
  )
}

export default class EnhancedApp extends NextApp {
  render() {
    return <App {...this.props} />
  }
}
