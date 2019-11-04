import React from 'react'
import NextApp from 'next/app'
import Head from 'next/head'
import { UserProvider } from '../components/UserContext'
// import { ThemeProvider } from '@material-ui/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from 'theme';

function App(props) {
  const {
    Component,
    pageProps: { __user, ...pageProps }
  } = props

  // useEffect(() => {
  //     // Remove the server-side injected CSS.
  //     const jssStyles = document.querySelector('#jss-server-side');
  //     if (jssStyles) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //     }
  // }, [])

  return (
    <>
      <Head>
        <title>My page</title>
      </Head>
      <UserProvider initialUser={__user}>
        <Component {...pageProps} />
      </UserProvider>
      {/* <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider> */}
    </>
  )
}

export default class EnhancedApp extends NextApp {
  render() {
    return <App {...this.props} />
  }
}
