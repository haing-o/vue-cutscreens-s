<template>
  <div id="app">
    <div class="nav">
      <a
        v-for="tab in tabs"
        :key="tab"
        @click="shiftCom(tab)"
        class="link"
        :class="[{ 'choose': $store.state.currentCom == tab }]"
      >{{ tab }}</a>
    </div>
    <keep-alive exclude="Completed">
      <component :is="$store.state.currentCom">Upload Pic</component>
    </keep-alive>
  </div>
</template>

<script>
import Upload from "@/views/uploadPic.vue";
import Completed from "@/views/completedPic.vue";
import store from "@/store";
export default {
  name: "cutSreen",
  data() {
    return {
      // currentCom: "Upload",
      tabs: ["Upload", "Completed"]
    };
  },
  store,
  components: {
    Upload,
    Completed
  },
  mounted() {},
  methods: {
    shiftCom: function(tab) {
      this.$store.commit('changeCurrent', tab);
    }
  }
};
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
      margin: 0 20px;
      padding: 0 5px;
      font-size: 22px;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .choose {
      border-bottom: 3px solid #646464;
    }
  }
}
</style>
