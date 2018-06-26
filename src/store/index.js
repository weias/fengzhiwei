import Vue from 'vue'
import Vuex from 'vuex'
import { getSomeInfo } from '@/api/app';

Vue.use(Vuex);
const store = {
  state: {
    routerState: '/',
    httploading: false
  },
  mutations: {
    routerChange (state, value) {
      state.routerState = value;
    },
    changeLoading (state, value = false) {
      state.httploading = value
    },
  },
  actions: {
    fetchSomeInfo ({ commit }) {
      commit('changeLoading', true)
      return getSomeInfo().then(res => {
        commit('changeLoading')
      })
    }
  },
}

export function createStore () {
  return new Vuex.Store(store);
}
