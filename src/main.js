import Vue from 'vue'
import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)

import filters from './filters'
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

import main from './components/main.vue'
import addCity from './components/add.vue'

import Swiper from 'swiper'
window.Swiper = Swiper

// let App = Vue.extend({})
import App from './components/app.vue'
// var router = new VueRouter()

var router = new VueRouter({
  routes: [{
    path: '/',
    component: main
  }, {
    path: '/add',
    component: addCity
  }]
})
new Vue(Vue.util.extend({ router }, App)).$mount('#app')
// router.start(App, '#app')
