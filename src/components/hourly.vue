<template>
  <div id="hourly" v-show="currentForecast">
    <div id="hourly-svg" ref="hourlySvg"></div>
  </div>
</template>

<script>
  import { caiyunSkycon } from '../config'
  import { mapGetters } from 'vuex'
  import * as utils from '../util'
  
  // var scrollTimeout

  export default {
    watch: {
      'currentForecast': function () {
        if (!this.currentForecast) {
          return false
        }

        this.parseHourly(this.currentForecast.hourly)
      }
    },
    computed: {
      ...mapGetters([
        'currentForecast'
      ])
    },
    ready () {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      parseHourlyData (data) {
        if (!data) {
          return ''
        }
        var skycon = data.skycon.slice(0, 8)
        var temperature = data.temperature.slice(0, 8)
        var arr = []

        skycon.map(function (item, index) {
          arr.push({
            datetime: item.datetime.split(' ')[1],
            skycon: caiyunSkycon[item.value],
            temperature: temperature[index].value
          })
        })
        return arr
      },
      parseHourly (data) {
        var newData = this.parseHourlyData(data)
        var scale = this.getHourlyScale(newData)
        this.drawSVG(this.parseData(newData, scale))
      },
      // 曲线图高度
      getHourlyHeight (data) {
        var max = data[0].y
        var min = data[0].y
        var dpr = utils.getDPR()

        data.map(function (item) {
          if (max < item.y) {
            max = item.y
          }
          if (min > item.y) {
            min = item.y
          }
        })

        return max - min + (dpr * 50) + 20
      },
      // 获取曲线阀值
      getHourlyScale (data) {
        var max = data[0].temperature
        var min = data[0].temperature
        data.map(function (item) {
          if (item.temperature > max) {
            max = item.temperature
          }
          if (item.temperature < min) {
            min = item.temperature
          }
        })
        return 50 / (max - min)
      },
      parseData (data, scale) {
        var width = utils.getWindowWidth()
        var max = data[0].temperature
        var len = data.length
        var lon = width / (len - 1)
        var dpr = utils.getDPR()
        data.map(function (item) {
          if (item.temperature > max) {
            max = item.temperature
          }
        })
        data.map(function (item, index) {
          data[index]['x'] = lon * index
          data[index]['y'] = (max - item.temperature) * scale + (dpr * 50) + 20
        })
        return data
      },
      drawSVG (data) {
        var width = utils.getWindowWidth()
        var hourlySvgHeight = this.getHourlyHeight(data)
        var p
        var circleArr = []
        var dpr = utils.getDPR()
        for (var i = 0, ii = data.length; i < ii; i++) {
          var point = data[i]
          var x = point.x
          var y = point.y
          // 头尾两点不绘制点，点信息
          if (i !== 0 && i !== ii - 1) {
            var temperatureY = y - 20
            var skyconY = y - (20 + dpr * 15)
            var datetimeY = y - (20 + dpr * 30)
            var radius = dpr * 2
            circleArr.push('<circle cx="' + x + '" cy="' + y + '" r="' + radius + '" fill="#fff" stroke="#1bb1b2" stroke-width="' + dpr + '"/>')
            circleArr.push('<text x="' + x + '" y="' + datetimeY + '" style="fill: #fff" text-anchor="middle">' + point.datetime + '</text>')
            circleArr.push('<text x="' + x + '" y="' + skyconY + '" style="fill: #fff" text-anchor="middle">' + point.skycon + '</text>')
            circleArr.push('<text x="' + x + '" y="' + temperatureY + '" style="fill: #fff" text-anchor="middle">' + point.temperature + '°</text>')
          }
          if (!i) {
            p = ['M', x, y, 'C', x, y]
          }
          if (i && i < ii - 1) {
            var point1 = data[i - 1]
            var point2 = data[i + 1]
            var a = utils.getAnchors(point1.x, point1.y, x, y, point2.x, point2.y)
            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2])
          }
        }
        p = p.concat([x, y, x, y, 'L', width, 0, 'L', 0, 0])
        this.$refs.hourlySvg.innerHTML = '<svg width="' + width + '" height="' + hourlySvgHeight + '"><path d="' + p.join(' ') + '" fill="#1bb1b2" style="stroke-width: 2px;"></path>' + circleArr.join('') + '</svg>'
      },
      handleResize (e) {
        if (!this.currentForecast) {
          return false
        }

        this.parseHourly(this.currentForecast.hourly)
      }
    },
    events: {
      'page-scroll': function (top) {
        // 横屏状态不处理
        if (window.orientation === 90 || window.orientation === -90) {
          return
        }
        // var self = this
        // clearTimeout(scrollTimeout)
        // scrollTimeout = setTimeout(function () {
        //   var topInfoHeight = document.getElementById('top-info').clientHeight || 400
        //   if (top > 0 && top < topInfoHeight && self.currentForecast) {
        //     var newData = self.parseHourlyData(self.currentForecast.hourly)
        //     var scale = self.getHourlyScale(newData) * (topInfoHeight - top) / topInfoHeight
        //     self.drawSVG(self.parseData(newData, scale))
        //   }
        // }, 0)
      }
    }
  }
</script>

<style>
  #hourly {
    margin-top: -1px;
  }
</style>