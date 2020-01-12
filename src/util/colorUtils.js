import cssVars from 'css-vars-ponyfill'

export const hexToRgb = (h) => {
  let r = 0; let g = 0; let b = 0

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')'
}

/**
 * Takes an rgba string in the format of "r, g, b, a" and turns it into a hex value
 * @param rgba
 * @return {string}
 */
export const rgbToHex = (rgba) => {
  const parts = rgba.split(', ')
  const r = parseInt(parts[0])
  const g = parseInt(parts[1])
  const b = parseInt(parts[2])
  const a = parts[3] ? parseFloat(parts[3]).toFixed(2) : 0
  return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a ? (a * 255).toString(16).substring(0, 2) : ''))
}
export const setBrandColor = (color) => {
  const parsedColor = color.charAt(0) === '#' ? hexToRgb(color) : color
  cssVars({
    watch: true,
    variables: {
      '--snui-color-brand': parsedColor
    }
  })
}
