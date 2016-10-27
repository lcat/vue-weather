import * as api from '../api'
import * as types from './mutation-types'

// 添加城市
export const addCity = ({ commit }, city) => {
  commit(types.ADD_CITY, city)
}

// 获取默认城市（调用百度接口获取当前ip的经纬度）
export const getDefaultCity = ({ commit }) => {
  api.getLngByBaidu(data => {
    var point = data.content.point

    var pointObj = {
      lng: point.x, // 经度
      lat: point.y, // 纬度
      name: data.content.address
    }

    commit(types.SET_DEFAULT_CITY, pointObj)

    getWeatherData(pointObj, commit)
  })
}

// 设置为当前城市
export const setCurCity = ({ commit }, data) => {
  commit(types.SET_CURRENT_CITY, data)

  var point = data.point || data.location
  point.name = data.name
  var dateVal = (new Date()).valueOf()
  // 缓存十分钟
  if (!data.serverTime || parseInt(data.serverTime / 1000) - dateVal > 600) {
    getWeatherData(point, commit)
  }
}

// 搜索城市
export const searchCity = ({ commit }, keyword) => {
  api.searchCityByBaidu(keyword, data => {
    commit(types.SET_SEARCH_DATA, data)
  })
}

// 立即刷新
export const refresh = ({ commit }, point) => {
  getWeatherData(point, commit)
}

// 获取天气数据
function getWeatherData (pointObj, commit) {
  api.getWeatherData(pointObj, function (data) {
    commit(types.SET_REALTIME_DATA, {
      address: pointObj.name,
      data: data.realTime.data
    })

    commit(types.SET_FORECAST_DATA, {
      address: pointObj.name,
      data: data.forecast.data
    })
  })
}
