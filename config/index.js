// eslint-disable-next-line import/no-unresolved
import envConfig from 'env-config'
import { red } from '@material-ui/core/colors'

const muiTheme = {
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
}

export default {
  shared: true,
  muiTheme,
  ...envConfig
}
