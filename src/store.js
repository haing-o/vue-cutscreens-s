import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 200
  },
  mutations: {
    changeHeight(state, newH) {
      state.height = newH;
    }
  }
})
