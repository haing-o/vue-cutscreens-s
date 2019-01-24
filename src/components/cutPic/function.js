import Vue from 'vue'
import cutPic from './cutPic.vue'

const cutPicConstructor = Vue.extend(cutPic); // extend使我们可以通过new方法创建一个组件（参数为对象）

var cutPicFn = (src, key) => {
    var instance = new cutPicConstructor({
        data: {
            src: src || null,
            key: key || null
        }
    });
    instance.vm = instance.$mount();
    return instance.vm.$el;
}

export default cutPicFn;