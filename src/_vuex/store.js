import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { getLocalStorage } from '../util'

Vue.use(Vuex)
Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'
var state = {
  name: '',
  searchData: [],
  cityList: getLocalStorage('cityList')
}

export default new Vuex.Store({
  state,
  mutations,
  strict: debug
})
