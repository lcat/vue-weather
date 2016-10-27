<template>
  <div class="container" ref="container" @scroll="scrollFunction">
    <main-header></main-header>

    <side-bar></side-bar>

    <div v-if="isShowSidebar" class="sidebar-mask" @click="hiddenBar"></div>
    
    <div class="container-box">
      <top-info></top-info>
      <hourly></hourly>
      <week></week>
      <minutely-rain></minutely-rain>
      <exponent></exponent>
    </div>
  </div>
</template>

<script>
import mainHeader from './main-header.vue'
import sideBar from './side-bar.vue'
import topInfo from './top-info.vue'
import hourly from './hourly.vue'
import week from './week.vue'
import minutelyRain from './minutely-rain.vue'
import exponent from './exponent.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    mainHeader,
    sideBar,
    topInfo,
    hourly,
    week,
    minutelyRain,
    exponent
  },
  computed: {
    ...mapGetters([
      'isShowSidebar'
    ])
  },
  methods: {
    ...mapMutations({
      hiddenBar: 'HIDE_SIDEBAR'
    }),
    scrollFunction (e) {
      this.$broadcast('page-scroll', e.target.scrollTop)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "../assets/css/reset.css";
@import "../assets/css/app.css";
html, body, #app {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
