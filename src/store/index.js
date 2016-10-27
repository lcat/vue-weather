import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

import { getLocalStorage } from '../util'

Vue.use(Vuex)

Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

const state = {
  isShowSidebar: false,
  name: '',
  searchData: [],
  cityList: getLocalStorage('cityList')
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
