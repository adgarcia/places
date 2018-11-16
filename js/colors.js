// @flow

export const Color = (colorHexString) => {
  while (colorHexString.length < 6) colorHexString = colorHexString+'0'
  if (colorHexString.length > 6) colorHexString = colorHexString.slice(0,6);
  const color = colorHexString
  const _Color = {
    color,
    multiplyByConstant: function (amount) {
      const {color} = this;

      let r = ( (parseInt(color, 16) >> 16) * amount)
      r = r > 255 ? 255 : r < 0 ? 0 : r
      r = r << 16;

      let g = ( ((parseInt(color, 16) >> 8) & 0x00FF ) * amount)
      g = g > 255 ? 255 : g < 0 ? 0 : g
      g = g << 8

      let b = ( (parseInt(color, 16) & 0x0000FF) * amount)

      const adjusted = (b|g|r).toString(16)
      return Color(adjusted);
    },
    toString: function () {
      return this.color
    },
    toDecimalString: function () {
      let {color} = this;
      let decimal = ''+((parseInt(color, 16) & 0xFF0000)>>16)+''+((parseInt(color, 16) & 0x00FF00)>>8)+''+(parseInt(color, 16) & 0x0000FF);
      return decimal;
    }
  }
  return _Color;
}
