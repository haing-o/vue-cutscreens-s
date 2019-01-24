import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 200,
    images: [],
    /*
    {
      imgList: img,
      key: Date,
      *cutheight: height 
    }
     */
    currentCom: 'Upload',
    completedSrc: '',
    delImg: {
      i: '',
      flag: false
    }
  },
  mutations: {
    changeHeight(state, newH) {
      state.height = newH;
    },
    changeSpHeight(state, payload) {
      var i = payload.order;
      state.images[i].cutheight = payload.height;
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
    addImg(state, payload) {
      state.images.push(payload);
    },
    delImg(state, i){
      state.images.splice(i, 1);
      state.delImg.i = i;
      state.delImg.flag = true;
    },
    afterDel(state) {
      state.delImg.flag = false;
    }
  }
})
