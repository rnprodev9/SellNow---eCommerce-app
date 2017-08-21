import { PixelRatio, Platform } from 'react-native'
const pixelRatio = PixelRatio.get();
import I18n from 'react-native-i18n'

const type = {
  base: I18n.locale === 'ar' ? 'GeezaPro' : 'Avenir-Book',
  bold: I18n.locale === 'ar' ? 'GeezaPro-Bold' : 'Avenir-Black',
  emphasis: I18n.locale === 'ar' ? 'GeezaPro' : 'HelveticaNeue',
  helveticaLight: I18n.locale === 'ar' ? 'GeezaPro' : 'Helvetica-Light'
}

const normalize = (size) => {
  if (pixelRatio > 1.5 && pixelRatio < 2 && Platform.OS !== 'ios') {
    return size / 1.3;
  } else if (pixelRatio > 2 && Platform.OS !== 'ios') {
    return size / 1.5
  } else if (pixelRatio > 1.3 && pixelRatio < 1.5 && Platform.OS !== 'ios') {
    return size / 1.2
  }

  return size;
}

const size = {
  h1: normalize(38),
  h2: normalize(34),
  h3: normalize(30),
  h4: normalize(26),
  h5: normalize(20),
  h6: normalize(19),
  input: normalize(18),
  regular: normalize(17),
  medium: normalize(14),
  small: normalize(12),
  tiny: normalize(10)
}


const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.emphasis,
    fontSize: size.medium
  },
  small: {
    fontFamily: type.emphasis,
    fontSize: size.small
  },
  tiny: {
    fontFamily: type.emphasis,
    fontSize: size.tiny
  },
  input: {
    fontFamily: type.base,
    fontSize: size.input
  },
  error: {
    fontFamily: type.helveticaLight,
    fontSize: size.small
  }
}

export default {
  type,
  size,
  style
}

