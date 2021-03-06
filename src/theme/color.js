import colorMap from './colorMap'
const generatorColor = primary => {
  const colors = {}
  Object.values(colorMap).forEach(key => {
    // console.log(primary)
    // key 是我们给色值起的别名
    if (key !== 'primary') {
      console.log(key[key.length - 1])
      colors[key] = mix('ffffff', primary.slice(1), key[key.length - 1] * 10)
    }
  })
  return colors
}

// JavaScript 实现 scss的mix函数
function mix(color_1, color_2, weight) {
  function d2h(d) {
    return d.toString(16)
  } // convert a decimal value to hex
  function h2d(h) {
    return parseInt(h, 16)
  } // convert a hex value to decimal

  weight = typeof weight !== 'undefined' ? weight : 50 // set the weight to 50%, if that argument is omitted

  let color = '#'

  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue
    let v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
      v2 = h2d(color_2.substr(i, 2)),
      // combine the current pairs from each source color, according to the specified weight
      val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)))

    while (val.length < 2) {
      val = '0' + val
    } // prepend a '0' if val results in a single digit

    color += val // concatenate val to our new color string
  }
  return color // PROFIT!
}

export default generatorColor
