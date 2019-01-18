<template>
  <div id="app">
    <div class="nav">
      <keep-alive>
        <component class="link" :is="currentCom">Upload Pic</component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import uploadPic from '@/views/uploadPic.vue'
  export default {
      name: 'cutSreen',
      data() {
          return {
              currentCom: uploadPic
          }
      },
      components: {
          uploadPic,
      }
  }
</script>

<style lang="less" scoped>
#app {
  .nav {
    height: 50px;
    background-color: #fff;
    text-align: center;
    .link {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      color: #646464;
      border-bottom: 2px solid #646464;
      margin: 0 10px;
    }
  }
}
</style>
