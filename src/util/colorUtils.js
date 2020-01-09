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

export const rgbToHex = (rgba) => {
  const trim = (str) => str.replace(/^\s+|\s+$/gm, '')

  const parts = rgba.substring(rgba.indexOf('(')).split(',')
  const r = parseInt(trim(parts[0].substring(1)), 10)
  const g = parseInt(trim(parts[1]), 10)
  const b = parseInt(trim(parts[2]), 10)
  const a = parts[3] ? parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2) : ''

  return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a * 255).toString(16).substring(0, 2))
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
