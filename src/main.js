import Vue from 'vue'
import App from './App.vue'
// import router from './router'

Vue.config.productionTip = false
import cutPic from './components/cutPic/index'
Vue.use(cutPic); //因为export的是一个函数，所以需要用use调用

new Vue({
  render: h => h(App)
}).$mount('#app')
