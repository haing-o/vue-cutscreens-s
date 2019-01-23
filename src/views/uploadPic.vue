<template>
  <div id="uploadPic">
    <div class="cut-pic-list" ref="list">
      <span class="text">click button on the right side to add pictures ......</span>
    </div>
    <div class="mybtn">
      <a href="javascript:void (0)" class="mybutton">
        Add
        <input @change="addPic($event)" ref="selectedPic" class="upload-btn" type="file">
      </a>
      <a href="javascript:void (0)" class="mybutton" @click="startCut">Start !</a>
      <a href="javascript:void (0)" class="mybutton reset-btn" @click="resetPic">Reset</a>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "uploadPic",
  // data() {
  //   return {
  //     // 需要截出来的高度，传给每一个组件
  //     height: 200
  //   };
  // },
  store,
  mounted() {
    // this.$refs.list.appendChild(this.$newCutPicFn());
  },
  methods: {
    // 上传图片，并显示在页面上
    addPic(event) {
      var that = this;
      var files = this.$refs.selectedPic.files;
      if (files.length == 0) {
        return;
      }
      var file = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file); // 上传图片
      reader.onload = function(e) {
        var src = e.target.result; // 图片的地址
        // var parent = document.createElement('div');
        // that.$refs.list.appendChild(parent);
        // that.$newCutPicFn(src, this.height, parent);
        // 将图片添加入state
        var img = new Image();
        img.src = src;
        that.$store.commit("addImg", img);
        that.$refs.list.appendChild(that.$newCutPicFn(src));
        setTimeout(function() {
          window.scrollTo(0, document.body.scrollHeight);
        }, 0);
        // 清除已上传的文件信息
        event.target.value = null;
      };
    },
    // 清空所有已经上传的图片
    resetPic() {
      var pics = document.querySelectorAll(".pic-item");
      var i = 0;
      while (i < pics.length) {
        this.$refs.list.removeChild(pics[i]);
        i++;
      }
      pics = null;
      this.$store.commit("clearImgs");
    },
    // 开始合成图片
    startCut() {
      // 创建canvas
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var images = this.$store.state.images;
      var h = this.$store.state.height;
      // 换算高宽比例
      var changedH = img => {
        if (img.width <= 1000) {
          return h;
        } else {
          return (img.width / 1000) * h;
        }
      };
      canvas.width = 1000;
      canvas.height = h * images.length;
      for (let i = 0; i < images.length; i++) {
        var img = images[i];
        context.drawImage(
          img,
          0,
          img.height - changedH(img),
          img.width,
          changedH(img),
          0,
          i * h,
          img.width >= 1000 ? 1000 : img.width,
          h
        );
      }
      var src = canvas.toDataURL();
      this.$store.commit("setSrc", src);
      this.$store.commit("changeCurrent", "Completed");
    }
  }
};
</script>

<style lang="less" scoped>
#uploadPic {
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0 20px;
  position: relative;
  overflow: hidden;
  .cut-pic-list {
    width: 1000px;
    min-height: 500px;
    margin-left: 85px;
    border-radius: 20px;
    position: relative;
    .text {
      font-size: 30px;
      color: #000;
      font-weight: bold;
      opacity: 0.2;
      position: absolute;
      z-index: 1;
      left: 8%;
      top: 20%;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  .mybtn {
    width: 200px;
    position: fixed;
    right: 100px;
    top: 200px;
    z-index: 9;
    .mybutton {
      display: inline-block;
      position: relative;
      z-index: 9;
      width: 200px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background-color: #707477;
      color: #fff;
      font-size: 25px;
      border: 2px solid #fff;
      border-radius: 10px;
      transition: opacity 0.4s;
      cursor: pointer;
      margin: 10px 0;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:hover {
        opacity: 0.7;
      }
    }
    .upload-btn {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      cursor: pointer;
    }
    .reset-btn {
      background-color: #5d0000;
    }
  }
}
</style>
