import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 200,
    images: [],
    currentCom: 'Upload',
    completedSrc: ''
  },
  mutations: {
    changeHeight(state, newH) {
      state.height = newH;
    },
    changeCurrent(state, newCurrent) {
      state.currentCom = newCurrent;
    },
    setSrc(state, src) {
      state.completedSrc = src;
    },
    clearImgs(state) {
      state.images = [];
    },
    addImg(state, img) {
      state.images.push(img);
    }
  }
})
