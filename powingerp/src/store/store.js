import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    userInfo: localStorage.userInfo == null ? {} : JSON.parse(localStorage.userInfo)
  },
  mutations: {
    userInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('userInfo', userInfo)
    }
  }
})
