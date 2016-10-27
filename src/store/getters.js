export function isShowSidebar (state) {
  return state.isShowSidebar
}

export function currentRealtime (state) {
  var current
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      current = item.realtime
    }
  })
  return current
}

export function cityName (state) {
  var current
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      current = item.name
    }
  })
  return current
}

export function point (state) {
  var point
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      point = item.point
    }
  })
  return point
}

export function serverTime (state) {
  var current
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      current = item.serverTime
    }
  })
  return current
}

export function currentForecast (state) {
  var current
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      current = item.forecast
    }
  })
  return current
}

export function minutelyForecast (state) {
  var current
  state.cityList.map(function (item, index) {
    if (item.isCurrent) {
      current = item.forecast && item.forecast.minutely
    }
  })
  return current
}

export function cityList (state) {
  return state.cityList
}

export function searchData (state) {
  return state.searchData
}
