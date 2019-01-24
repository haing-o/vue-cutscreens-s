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
  store,
  computed: {
    delImg() {
      return this.$store.state.delImg.flag;
    }
  },
  watch: {
    delImg(newFlag) {
      if (newFlag) {
        var list = this.$refs.list;
        var picList = list.querySelectorAll(".pic-item");
        list.removeChild(picList[this.$store.state.delImg.i]);
        setTimeout(() => {
          this.$store.commit("afterDel");
        }, 100);
      }
    }
  },
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
        var key = new Date();
        var payload = {
          imgList: img,
          key: key
        };
        that.$store.commit("addImg", payload);
        that.$refs.list.appendChild(that.$newCutPicFn(src, key));
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
      var comHeight = this.$store.state.height;
      canvas.width = 1000;
      // 循环图片数组，相加得到canvas的高。
      var canvasHeight = 0;
      for (let i = 0; i < images.length; i++) {
        if (images[i].cutheight) {
          canvasHeight += images[i].cutheight;
        } else {
          canvasHeight += comHeight;
        }
      }
      canvas.height = canvasHeight;
      // 换算高宽比例
      var changedH = (img, hei) => {
        if (img.width <= 1000) {
          return hei;
        } else {
          return (img.width / 1000) * hei;
        }
      };
      // currentH:目前渲染到的高度
      var currentH = 0;
      // 遍历每一个图像，在canvas画布上画出来
      for (let i = 0; i < images.length; i++) {
        var img = images[i];
        var imgList = img.imgList;
        if (img.cutheight) {
          console.log("special");
          context.drawImage(
            imgList,
            0,
            imgList.height - changedH(imgList, img.cutheight),
            imgList.width,
            changedH(imgList, img.cutheight),
            0,
            currentH,
            imgList.width >= 1000 ? 1000 : imgList.width,
            img.cutheight
          );
          currentH += img.cutheight;
        } else {
          console.log("common");
          context.drawImage(
            imgList,
            0,
            imgList.height - changedH(imgList, comHeight),
            imgList.width,
            changedH(imgList, comHeight),
            0,
            currentH,
            imgList.width >= 1000 ? 1000 : imgList.width,
            comHeight
          );
          currentH += comHeight;
        }
      }
      // 将canvas画布转为jpeg的图片，将图片地址传给store。
      var src = canvas.toDataURL("image/jpeg", 1.0);
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
    margin-left: 150px;
    border-radius: 20px;
    position: relative;
    transition: all 2s;
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
      width: 200px;
      height: 80px;
    }
    .reset-btn {
      background-color: #5d0000;
    }
  }
}
</style>
