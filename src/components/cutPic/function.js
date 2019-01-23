import Vue from 'vue'
import cutPic from './cutPic.vue'

const cutPicConstructor = Vue.extend(cutPic); // extend使我们可以通过new方法创建一个组件（参数为对象）

var cutPicFn = (src, height) => {
    var instance = new cutPicConstructor({
        propsData: {
            height: height || 200
        },
        data: {
            src: src || null
        }
    });
    instance.vm = instance.$mount();
    return instance.vm.$el;
}

export default cutPicFn;