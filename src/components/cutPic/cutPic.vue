<template>
  <div
    class="pic-item"
    ref="wholePic"
    @mousemove="isDraging($event)"
    @mousedown="startDrag($event)"
    @mouseup="stopDrag($event)"
  >
    <!-- <img src="../../img/kate.jpg"> -->
    <img :src="src" alt="img" class="image">
    <div class="cut-line">
      <div ref="shade" class="shade"></div>
      <span ref="line" class="shift-line">
        <span class="arrow dragMe">...</span>
      </span>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "cutPic",
  mounted() {
    // 如果不是nextTick, 拿不到clientHeight
    // nextTick是保证子组件也已经渲染完毕
    this.$nextTick(() => {
      // 初始化css属性，为了之后可以拿到并设置数值
      // 非chrome浏览器里在这里还拿不到clientHeight
      // 通过setTimeout延缓执行顺序
      setTimeout(() => {
        this.$refs.shade.style.height =
          parseInt(this.picHeight - this.cutHeight) + "px";
        this.$refs.line.style.top =
          parseInt(this.picHeight - this.cutHeight) + "px";
      }, 0);
    });
  },
  store,
  // 使用vuex，就不需要父子组件传值了
  // props: {
  //   // 需要截出来的高度，由父组件传入
  //   height: {
  //     type: Number,
  //     default: 100
  //   }
  // },
  data() {
    return {
      src: "",
      isDrag: false
    };
  },
  // 监听state的改变
  watch: {
    cutHeight(newH) {
      this.$refs.shade.style.height = parseInt(this.picHeight - newH) + "px";
      this.$refs.line.style.top = parseInt(this.picHeight - newH) + "px";
    }
  },
  computed: {
    // 裁剪高度
    cutHeight() {
      return this.$store.state.height;
    },
    // 图片高度
    picHeight() {
      return parseInt(this.$refs.wholePic.clientHeight);
    },
    offsetTop() {
      return parseInt(this.$refs.wholePic.offsetTop);
    }
  },
  methods: {
    // 鼠标按住
    startDrag(e) {
      if (e.target.className.indexOf("dragMe") != -1) {
        this.isDrag = true;
      }
    },
    // 鼠标移动
    // TODO: line移动到边界回不来
    isDraging(e) {
      var bottom = this.picHeight - parseInt(this.$refs.line.offsetTop);
      if (this.isDrag && bottom >= 0 && bottom <= this.picHeight) {
        var h = parseFloat(e.pageY) - 100 - this.offsetTop;
        this.$refs.shade.style.height = h + "px";
        this.$refs.line.style.top = h + "px";
      }
    },
    // 鼠标放开
    stopDrag(e) {
      this.isDrag = false;
      var bottom = this.picHeight - parseInt(this.$refs.shade.clientHeight);
      console.log("bottom: " + bottom);
      console.log(this.$refs.wholePic.clientHeight);
      // 修改state里的height
      this.$store.commit("changeHeight", bottom);
    }
  }
};
</script>

<style scoped lang="less">
.pic-item {
  position: relative;
  z-index: 3;
  user-select: none;
  font-size: 0;
  img {
    max-width: 1000px;
  }
  .cut-line {
    .shade {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      width: 1000px;
      height: 100px;
      opacity: 0.4;
      transition: height 50ms;
    }
    .shift-line {
      display: block;
      position: absolute;
      left: 0;
      top: 100px;
      width: 1000px;
      height: 2px;
      background-color: #fff;
      cursor: pointer;
      //   border: 2px solid #fff;
      border-radius: 5px;
      transition: top 50ms;
      .arrow {
        position: absolute;
        display: block;
        bottom: -10px;
        left: 50%;
        width: 50px;
        border-radius: 10px;
        background-color: #fff;
        text-align: center;
        color: #868686;
        line-height: 5px;
        font-size: 30px;
        padding: 0 0 18px;
      }
    }
  }
}
</style>