import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
Vue.config.productionTip = false
import cutPic from './components/cutPic/index'
Vue.use(cutPic); //因为export的是一个函数，所以需要用use调用

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
