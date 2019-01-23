import Vue from 'vue'
import Router from 'vue-router'
import uploadPic from '../src/views/uploadPic.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/uploadPic'
      },
      {
          path: '/uploadPic',
          name: 'uploadPic',
          component: uploadPic
      }
  ]
})
