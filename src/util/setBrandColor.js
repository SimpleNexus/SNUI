import { hexToRgb } from './hexToRgb'
import cssVars from 'css-vars-ponyfill'

export const setBrandColor = (color) => {
  const parsedColor = color.charAt(0) === '#' ? hexToRgb(color) : color
  cssVars({
    watch: true,
    variables: {
      '--snui-color-brand': parsedColor
    }
  })
}
