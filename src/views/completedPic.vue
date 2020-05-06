<template>
  <div class="wrap">
    <img v-if="$store.state.completedSrc" :src="$store.state.completedSrc" alt="img" class="pic">
    <p class="completed_info" v-else>点击确认裁剪后，图片会出现在这里</p>
    <!-- <img src="../img/kate.jpg" alt="" class="pic"> -->
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "completedPic",
  store
};
</script>

<style lang="less" scoped>
.wrap {
  text-align: center;
}
.pic {
  min-width: 1000px;
  max-width: 1200px;
  margin: 50px;
}
.completed_info {
  margin-top: 100px;
  color: #999999;
}
</style>