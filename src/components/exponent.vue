<template>
  <div class="exponent" v-if="currentForecast">
    <div class="item">
      <span class="iconfont">&#xe62a;</span>
      <div class="desc">感冒指数</div>
      <div class="desc">{{coldRisk}}</div>
    </div>
    <div class="item">
      <span class="iconfont">&#xe624;</span>
      <div class="desc">穿衣指数</div>
      <div class="desc">{{dressing}}</div>
    </div>
    <div class="item">
      <span class="iconfont">&#xe614;</span>
      <div class="desc">紫外线</div>
      <div class="desc">{{ultraviolet}}</div>
    </div>
    <div class="item">
      <span class="iconfont">&#xe626;</span>
      <div class="desc">洗车指数</div>
      <div class="desc">{{carWashing}}</div>
    </div>
  </div>
</template>

<script>
  // import { currentForecast } from '../vuex/getters'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        coldRisk: '加载中',
        dressing: '加载中',
        ultraviolet: '加载中',
        carWashing: '加载中'
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
        var daily = this.currentForecast.daily || {}

        this.coldRisk = daily.coldRisk && daily.coldRisk[0].desc
        this.dressing = daily.dressing && daily.dressing[0].desc
        this.ultraviolet = daily.ultraviolet && daily.ultraviolet[0].desc
        this.carWashing = daily.carWashing && daily.carWashing[0].desc

        // this.parseHourly(this.currentForecast.hourly)
      }
    }
  }
</script>

<style>
  .exponent {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
  }
  .exponent .item {
    flex: 1;
    text-align: center;
  }
  .exponent .iconfont {
    color: #1bb1b2;
    font-size: 0.8rem;
  }
</style>