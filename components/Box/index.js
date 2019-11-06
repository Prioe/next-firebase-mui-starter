import { styled } from '@material-ui/styles'
import {
  borders,
  compose,
  css,
  display,
  flexbox,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography
} from '@material-ui/system'

export const innerStyleFunction = css(
  compose(
    borders,
    display,
    flexbox,
    positions,
    palette,
    shadows,
    sizing,
    spacing,
    typography
  )
)

const styleFunction = (props) => ({
  '&&': innerStyleFunction(props)
})

styleFunction.filterProps = innerStyleFunction.filterProps

/**
 * @ignore - do not document.
 */
const Box = styled('div')(styleFunction, { name: 'MuiBox' })

export default Box
