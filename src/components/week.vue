<template>
  <div id="week" class="week">
    <div class="item" v-for="week in weekData">
      <span>{{week.day}}</span>
      <span class="iconfont" v-html="week.skycon"></span>
      <!-- <div>{{week.skyconText}}</div> -->
      <span>{{week.max}}°/{{week.min}}°</span>
    </div>
  </div>
</template>

<script>
  import { caiyunSkycon, caiyunSkyconIcon } from '../config'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        weekData: []
      }
    },
    computed: {
      ...mapGetters([
        'currentForecast'
      ])
    },
    watch: {
      'currentForecast': function () {
        if (!this.currentForecast) {
          return false
        }
        this.parseWeek(this.currentForecast)
      }
    },
    methods: {
      parseWeek (data) {
        if (!data || !data.daily) {
          return ''
        }
        var temperatureArr = data.daily.temperature
        var skyconArr = data.daily.skycon
        var arr = []

        temperatureArr.map(function (item, index) {
          arr.push({
            max: Math.floor(item.max),
            min: Math.floor(item.min),
            skycon: caiyunSkyconIcon[skyconArr[index].value],
            skyconText: caiyunSkycon[skyconArr[index].value],
            day: item.date.substr(5)
          })
        })

        this.weekData = arr
      }
    }
  }
</script>

<style scoped>
  .week {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    margin: 0.3rem auto;
  }
  .week .item {
    flex: 1;
    text-align: center;
  }
  .week .item .iconfont {
    color: #1bb1b2;
    display: block;
  }
</style>