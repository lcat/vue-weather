<template>
  <div class="top-info" id="top-info" v-if="currentRealtime">
    <div class="t-c city">{{cityName}}</div>
    <div class="t-c skycon">
    <span class="iconfont" v-html="skycon"></span>
    {{currentRealtime.skycon | skyconParse}}
    /
    {{currentRealtime.wind.direction | windDirectionFormat}}
    {{currentRealtime.wind.speed | windLevelFormat}}
    </div>
    <div class="t-c temperature">{{currentRealtime.temperature}}°</div>
    <div class="t-c pm25">
    <span class="iconfont">&#xe629;</span>pm25: {{currentRealtime.pm25 | pm25Parse}}
    <span class="update-time">{{updateTime}}</span>
    <!-- /
    <span class="iconfont">&#xe625;</span>湿度 {{currentRealtime.humidity * 100}} -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { caiyunSkyconIcon } from '../config'

  export default {
    computed: {
      ...mapGetters([
        'cityName',
        'currentRealtime',
        'serverTime'
      ]),
      updateTime () {
        if (!this.serverTime) {
          return '加载中..'
        }
        var dateVal = (new Date()).valueOf()
        var timeDiff = dateVal - this.serverTime * 1000
        var timeDiffSecond = parseInt(timeDiff / 1000)
        var timeDiffMinute = parseInt(timeDiffSecond / 60)

        if (timeDiffSecond < 60) {
          return '刚刚发布'
        } else {
          return `约${timeDiffMinute}分钟前发布`
        }
      },
      skycon () {
        return caiyunSkyconIcon[this.currentRealtime.skycon]
      }
    }
  }
</script>

<style scoped>
  .top-info {
    color: #fff;
    background: #1bb1b2;
    position: relative;
    padding: 0.266667rem 0;
  }
  .city {
    font-size: 0.4rem;
  }
  .skycon {
    font-size: 0.4rem;
  }
  .pm25 {
    font-size: 0.32rem;
  }
  .temperature {
    font-size: 2.0rem;
    line-height: 2.0rem;
  }
  .pm25 .iconfont {
    vertical-align: sub;
  }
  .update-time {
    position: absolute;
    top: 0;
    right: 0.2rem;
  }
</style>