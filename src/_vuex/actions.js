import Vue from 'vue'
import * as types from './mutation-types'
import { config } from '../config'

// VueResource.config

export const addCity = ({
  dispatch
}, city) => {
  dispatch(types.ADD_CITY, city)
}

export const getDefaultCity = ({
  dispatch
}) => {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     geolocationCB(position, dispatch)
  //   },
  //   function (error) {
  //     geolocationError(error, dispatch)
  //   })
  // } else {
  getLngByBaidu(dispatch)
  // }
}

export const setCurCity = ({
  dispatch
}, data) => {
  dispatch(types.SET_CURRENT_CITY, data)
  var point = data.point || data.location
  point.name = data.name
  var dateVal = (new Date()).valueOf()
  // 缓存十分钟
  if (!data.serverTime || parseInt(data.serverTime / 1000) - dateVal > 600) {
    getWeatherData(point, dispatch)
  }
}

export const delCity = ({
  dispatch
}, data) => {
  dispatch(types.DELETE_CITY, data)
}

export const searchCity = ({
  dispatch
}, keyword) => {
  searchCityByBaidu(keyword, dispatch)
}

export const refresh = ({
  dispatch
}, point) => {
  getWeatherData(point, dispatch)
}

// 搜索地址
function searchCityByBaidu (keyword, dispatch) {
  var url = 'http://api.map.baidu.com/place/v2/suggestion?query=' + keyword + '&region=131&output=json&ak=' + config.baidu

  Vue.http.jsonp(url)
  .then((response) => {
    var data = response.data.result
    data.filter(function (item) {
      return item.location && item.name
    })
    dispatch(types.SET_SEARCH_DATA, data)
  }, (response) => {
  })
}

function getLngByBaidu (dispatch) {
  var requestUrl = 'http://api.map.baidu.com/location/ip?coor=bd09ll&ak=' + config.baidu
  Vue.http.jsonp(requestUrl)
  .then((response) => {
    let data = response.data
    let point = data.content.point
    dispatch(types.SET_DEFAULT_CITY, {
      lng: point.x, // 经度
      lat: point.y, // 纬度
      name: data.content.address
    })
    getWeatherData({
      lng: point.x,
      lat: point.y,
      name: data.content.address
    }, dispatch)
  }, (response) => {
    // error callback
  })
}

// 通过经纬度获取天气信息
function getWeatherData (point, dispatch) {
  // point.lng = 117.47288143554556
  // point.lat = 24.08114456563548
  var realTimeUrl = 'https://api.caiyunapp.com/v2/' + config.caiyun + '/' + point.lng + ',' + point.lat + '/realtime.jsonp'
  var forecastUrl = 'https://api.caiyunapp.com/v2/' + config.caiyun + '/' + point.lng + ',' + point.lat + '/forecast.jsonp'
  Vue.http.jsonp(realTimeUrl)
  .then((response) => {
    dispatch(types.SET_REALTIME_DATA, {
      address: point.name,
      data: response.data
    })
    Vue.http.jsonp(forecastUrl)
    .then((response) => {
      dispatch(types.SET_FORECAST_DATA, {
        address: point.name,
        data: response.data
      })
    }, (response) => {
    })
  },
  (response) => {
    // error callback
  })
}
