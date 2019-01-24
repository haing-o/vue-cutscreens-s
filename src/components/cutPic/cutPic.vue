<template>
  <div
    class="pic-item"
    ref="wholePic"
    @touchmove.stop="isDraging($event)"
    @touchstart.stop="startDrag($event)"
    @touchend="stopDrag($event)"
    @mousedown="startDrag($event)"
    @mouseup="stopDrag($event)"
    @mousemove="isDraging($event)"
  >
    <!-- <img src="../../img/kate.jpg"> -->
    <img :src="src" alt="img" class="image">
    <div class="cut-line">
      <div ref="shade" class="shade"></div>
      <span ref="line" class="shift-line">
        <span ref="dragBtn" class="arrow dragMe">...</span>
      </span>
    </div>
    <div class="close-btn" @click.stop="delMyself()" @touchstart="delMyself()"></div>
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
  // 使用vuex，就不需要父子组件传值了
  store,
  data() {
    return {
      src: "",
      key: "",
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
      e.preventDefault();
      if (e.target.className.indexOf("dragMe") != -1) {
        this.isDrag = true;
      }
    },
    // 鼠标移动
    // TODO: line移动到边界回不来
    isDraging(e) {
      e.preventDefault();
      var bottom = this.picHeight - parseInt(this.$refs.line.offsetTop);
      if (this.isDrag && bottom >= 0 && bottom <= this.picHeight) {
        var pageY = e.pageY || e.targetTouches[0].pageY;
        var h = parseFloat(pageY) - 100 - this.offsetTop;
        this.$refs.shade.style.height = h + "px";
        this.$refs.line.style.top = h + "px";
      }
    },
    // 鼠标放开
    stopDrag(e) {
      e.preventDefault();
      this.isDrag = false;
      var bottom = this.picHeight - parseInt(this.$refs.shade.clientHeight);
      // console.log("bottom: " + bottom);
      // 修改state里的height
      if (e.target.className.indexOf("dragMe") != -1) {
        this.$store.commit("changeHeight", bottom);
      }
    },
    // 删除自身
    delMyself() {
      var images = this.$store.state.images;
      for (let i = 0; i < images.length; i++) {
        if (images[i].key == this.key) {
          this.$store.commit("delImg", i);
        }
      }
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
      height: 3px;
      background-color: #fff;
      cursor: pointer;
      //   border: 2px solid #fff;
      border-radius: 5px;
      transition: top 50ms;
      .arrow {
        position: absolute;
        display: block;
        bottom: -20px;
        right: 200px;
        // transform: translate(-50%);
        width: 100px;
        border-radius: 10px;
        background-color: #fff;
        text-align: center;
        color: #868686;
        line-height: 5px;
        font-size: 30px;
        padding: 10px 0 30px;
      }
    }
  }
  .close-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    background-color: red;
    background: url("../../img/del.png") no-repeat center center / 100%;
    opacity: 0.5;
    left: -75px;
    top: 20px;
    cursor: pointer;
    transition: all 1s;
    &:hover {
      opacity: 1;
      transform: rotate(360deg);
    }
  }
}
</style>