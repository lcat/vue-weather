import {
  caiyunSkycon,
  caiyunSkyconIcon,
  windDirectionDic,
  windLevelDic
} from './config'

// skycon 转文字
exports.skyconParse = (value) => {
  return caiyunSkycon[value]
}

exports.skyconIconParse = (value) => {
  return caiyunSkyconIcon[value]
}

/* eslint brace-style: [2, "1tbs"] */
exports.pm25Parse = (value) => {
  if (value >= 0 && value <= 50) {
    return value + ' 优'
  } else if (value > 50 && value <= 100) {
    return value + ' 良'
  } else if (value > 100 && value <= 150) {
    return value + ' 轻度污染'
  } else if (value > 150 && value <= 200) {
    return value + ' 中度污染'
  } else if (value > 200 && value <= 300) {
    return value + ' 重度污染'
  } else if (value > 300) {
    return value + ' 严重污染'
  }
}
// 风向
exports.windDirectionFormat = (direction) => {
  if (direction < 0) {
    if (direction < -360) {
      direction %= 360
    }
    direction += 360
  } else if (direction > 360) {
    direction %= 360
  }
  if (direction >= 337.5 && direction < 22.5) {
    return windDirectionDic['NORTH']
  } else if (direction >= 22.5 && direction < 67.5) {
    return windDirectionDic['NORTH_EAST']
  } else if (direction >= 67.5 && direction < 112.5) {
    return windDirectionDic['EAST']
  } else if (direction >= 112.5 && direction < 157.5) {
    return windDirectionDic['SOUTH_EAST']
  } else if (direction >= 157.5 && direction < 202.5) {
    return windDirectionDic['SOUTH']
  } else if (direction >= 202.5 && direction < 247.5) {
    return windDirectionDic['SOUTH_WEST']
  } else if (direction >= 247.5 && direction < 292.5) {
    return windDirectionDic['WEST']
  } else {
    return windDirectionDic['NORTH_WEST']
  }
}
// 风力
exports.windLevelFormat = (value) => {
  var level = 0
  if (value >= 0 && value < 1) {
    level = 0
  } else if (value >= 1 && value < 6) {
    level = 1
  } else if (value >= 6 && value < 12) {
    level = 2
  } else if (value >= 12 && value < 20) {
    level = 3
  } else if (value >= 20 && value < 29) {
    level = 4
  } else if (value >= 29 && value < 39) {
    level = 5
  } else if (value >= 39 && value < 50) {
    level = 6
  } else if (value >= 50 && value < 62) {
    level = 7
  } else if (value >= 62 && value < 75) {
    level = 8
  } else if (value >= 75 && value < 89) {
    level = 9
  } else if (value >= 89 && value < 103) {
    level = 10
  } else if (value >= 103 && value < 117) {
    level = 11
  } else if (value >= 117) {
    level = 12
  }
  return windLevelDic[level].name
}
