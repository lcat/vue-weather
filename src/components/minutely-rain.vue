<template>
  <div>
    <div class="t-c description" v-if="minutelyForecast">
      <span class="">{{minutelyForecast.description}}</span>
    </div>
    <div class="minutely-svg" ref="minutelySvg"></div>
    <div class="minutely-x">
      <div class="item">10分钟</div>
      <div class="item">30分钟</div>
      <div class="item">50分钟</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as utils from '../util'

  export default {
    computed: {
      ...mapGetters([
        'minutelyForecast'
      ])
    },
    watch: {
      'minutelyForecast': function () {
        if (!this.minutelyForecast) {
          return false
        }
        var data = this.parseMinutelyRainData(this.minutelyForecast.precipitation)
        this.draw(data)
      }
    },
    methods: {
      // 0.05-0.15是小雨，0.15-0.35是中雨, 0.35以上是大雨，根据不同地区情况可以有所调整。
      parseMinutelyRainData (data) {
        var width = utils.getWindowWidth()
        var len = data.length
        var lon = width / (len - 1)
        var dpr = utils.getDPR()
        var newArr = []

        /**
         * 位移            雨量
         * ----------
         * dpr * 30    -> [35, 100]  -> [35, 50) [50, 100]
         * ----------
         * dpr * 30    -> [15, 35)
         * ----------
         * dpr * 30    -> [0, 15)
         * ----------
         */
        data.map(function (item, index) {
          item = item * 100
          var y
          if (item >= 0 && item < 15) {
            y = (dpr * 30 * 3) - item * dpr * 30 / 15
          } else if (item >= 15 && item < 35) {
            y = (dpr * 30 * 2) - (item - 15) * dpr * 30 / 20
          } else {
            y = (dpr * 30) - (item - 35) * dpr * 30 / 65
          }
          // else if (item >= 35 && item < 50) {
          //   y = item * dpr * 30 / 15 * (dpr * 30 / 5)
          // } else {
          //   y = item * dpr * 30 / 50
          // }
          newArr.push({
            x: lon * index,
            y: y
          })
        })
        return newArr
      },
      draw (data) {
        var width = utils.getWindowWidth()
        var dpr = utils.getDPR()
        var p
        var line = []
        for (var k = 0; k < 4; k++) {
          var lineY = k * 30 * dpr
          var lineTextY = k * 30 * dpr - 10 * dpr
          line.push('<path d="M 0 ' + lineY + ' L ' + width + ' ' + lineY + '" style="stroke-width: ' + dpr + 'px;" stroke="#dedede"></path>')
          var arr = ['大雨', '中雨', '小雨']
          if (k > 0) {
            line.push('<text x="' + (dpr * 15) + '" y="' + lineTextY + '" style="fill: #1bb1b2" text-anchor="middle">' + arr[k - 1] + '</text>')
          }
        }
        for (var i = 0, ii = data.length; i < ii; i++) {
          var point = data[i]
          var x = point.x
          var y = point.y

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

        p = p.concat([x, y, x, y])
        this.$refs.minutelySvg.innerHTML = '<svg width="' + width + '" height="' + (dpr * 90) + '">' + line.join(' ') + '<path fill-opacity="0" d="' + p.join(' ') + '" style="stroke-width: ' + (dpr * 2) + 'px;" stroke="#1bb1b2"></path></svg>'
      }
    }
  }
</script>

<style>
  .description {
    margin: 0.6rem auto;
  }
  .description span {
    background: #dedede;
    padding: 0.133333rem 0.266666rem;
    border-radius: 0.4rem;
    color: #666;
  }
  .minutely-x {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
  }
  .minutely-x .item {
    flex: 1;
    color: #999;
    text-align: center;
  }
</style>