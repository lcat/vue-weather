// import { set } from 'vue'
import * as types from './mutation-types'
import * as utils from '../util'

export default {
  [types.ADD_CITY] (state, city) {
    addCity(state, city)
  },
  [types.DELETE_CITY] (state, data) {
    delCity(state, data)
  },
  [types.GET_DEFAULT_CITY] (state) {
    getDefaultCity(state)
  },
  [types.SET_DEFAULT_CITY] (state, data) {
    setDefaultCity(state, data)
  },
  [types.SET_CURRENT_CITY] (state, data) {
    setCurrentCity(state, data)
  },
  [types.SET_REALTIME_DATA] (state, data) {
    setRealtimeData(state, data)
  },
  [types.SET_FORECAST_DATA] (state, data) {
    setForecastData(state, data)
  },
  [types.SET_SEARCH_DATA] (state, data) {
    setSearchData(state, data)
  }
}

// 更新localStorage （不存储forecast realtime）
function refreshLocalStorage (state) {
  var cityList = []
  state.cityList.map(function (item) {
    // 当前城市不存储
    if (item.isDefault) return
    cityList.push({
      name: item.name,
      point: item.point
    })
  })

  utils.setLocalStorage('cityList', cityList)
}

function addCity (state, city) {
  state.cityList.push({
    name: city.name,
    point: city.location || city.point
  })
  state.searchData = ''
  refreshLocalStorage(state)
}

/**
 * 删除城市
 * @param  {[type]} state [description]
 * @param  {[type]} data  [description]
 * @return {[type]}       [description]
 */
function delCity (state, data) {
  var index
  state.cityList.map(function (item, i) {
    if (data.name === item.name) {
      index = i
    }
  })

  state.cityList.splice(index, 1)

  // 删除后把默认城市设为当前城市
  var defaultIndex
  state.cityList.map(function (item, i) {
    if (item.isDefault) {
      defaultIndex = i
    }
  })
  var cur = state.cityList[defaultIndex]
  state.cityList.splice(defaultIndex, 1, utils.jsExt.extend(cur, {
    isCurrent: true
  }))

  refreshLocalStorage(state)
}

function getDefaultCity (state) {

}

function setSearchData (state, data) {
  state.searchData = data
}

function setCurrentCity (state, data) {
  var index
  var newIndex

  state.cityList.map(function (item, i) {
    if (item.isCurrent) {
      index = i
    }
    if (data.name === item.name) {
      newIndex = i
    }
  })

  if (index || index === 0) {
    var cur = state.cityList[index]
    state.cityList.splice(index, 1, utils.jsExt.extend(cur, {
      isCurrent: false
    }))
  }

  if (newIndex || newIndex === 0) {
    var newcur = state.cityList[newIndex]
    state.cityList.splice(newIndex, 1, utils.jsExt.extend(newcur, {
      isCurrent: true
    }))
  }

  refreshLocalStorage(state)
}

function setDefaultCity (state, data) {
  state.cityList.splice(0, 0, {
    isCurrent: true,
    isDefault: true,
    point: {
      lat: data.lat,
      lng: data.lng
    },
    name: data.name
  })
}

function setRealtimeData (state, data) {
  var address = data.address
  var index

  state.cityList.map(function (item, i) {
    if (address === item.name) {
      index = i
    }
  })

  if (index || index === 0) {
    var cur = state.cityList[index]
    state.cityList.splice(index, 1, utils.jsExt.extend(cur, {
      serverTime: data.data.server_time,
      realtime: data.data.result
    }))
  }
}

function setForecastData (state, data) {
  var address = data.address
  var index

  state.cityList.map(function (item, i) {
    if (address === item.name) {
      index = i
    }
  })
  if (index || index === 0) {
    var cur = state.cityList[index]
    state.cityList.splice(index, 1, utils.jsExt.extend(cur, {
      serverTime: data.data.server_time,
      forecast: data.data.result
    }))
  }
}
