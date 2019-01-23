import cutPic from './cutPic.vue';
import cutPicFn from './function'

export default (Vue) => {
    // 全局注册，在整个全局都可以使用这个component
    Vue.component(cutPic.name, cutPic);
    Vue.prototype.$newCutPicFn = cutPicFn;
}