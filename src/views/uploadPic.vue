<template>
    <div id="uploadPic">
        <btns></btns>
    </div>
</template>

<script>
    import btns from '@/components/btns.vue'
    export default {
        name: 'uploadPic',
        components: {
            btns,
        }
    }
</script>

<style lang="less" scoped>
    #uploadPic {
        width: 1280px;
        margin: 0 auto;
        padding: 50px 0 20px;
        position: relative;
        overflow: hidden;
    }
</style>
