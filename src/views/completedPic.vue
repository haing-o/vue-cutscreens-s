<template>
  <div class="wrap">
    <img :src="$store.state.completedSrc" alt="img" class="pic">
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
</style>