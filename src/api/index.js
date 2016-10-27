import Vue from 'vue'
import { config } from '../config'

// 获取当前ip经纬度
export function getLngByBaidu (cb) {
  var requestUrl = 'http://api.map.baidu.com/location/ip?coor=bd09ll&ak=' + config.baidu
  Vue.http.jsonp(requestUrl)
  .then((response) => {
    cb(response.data)
  }, (response) => {
    // error callback
  })
}

// 获取天气数据
export function getWeatherData (point, cb) {
  var realTimeUrl = 'https://api.caiyunapp.com/v2/' + config.caiyun + '/' + point.lng + ',' + point.lat + '/realtime.jsonp'
  var forecastUrl = 'https://api.caiyunapp.com/v2/' + config.caiyun + '/' + point.lng + ',' + point.lat + '/forecast.jsonp'
  Vue.http.jsonp(realTimeUrl)
  .then((realTimeData) => {
    Vue.http.jsonp(forecastUrl)
    .then((forecastData) => {
      cb({
        realTime: realTimeData,
        forecast: forecastData
      })
    }, (response) => {
    })
  },
  (response) => {
    // error callback
  })
}

// 搜索城市
export function searchCityByBaidu (keyword, cb) {
  var url = 'http://api.map.baidu.com/place/v2/suggestion?query=' + keyword + '&region=131&output=json&ak=' + config.baidu

  Vue.http.jsonp(url)
  .then((response) => {
    var data = response.data.result
    data.filter(function (item) {
      return item.location && item.name
    })
    cb(data)
  }, (response) => {
  })
}
