<template>
    <button class="mybutton">{{ value }}</button>
</template>

<script>
    export default {
        name: 'myButton',
        props: {
            value: {
                default: 'button',
                type: String
            }
        }
    }
</script>

<style lang="less" scoped>
    .mybutton {
        width: 200px;
        height: 80px;
        background-color: #707477;
        color: #fff;
        font-size: 25px;
        border: none;
        border-radius: 10px;
        transition: background-color .3s;
        cursor: pointer;
        margin: 10px 0;
        &:hover {
            background-color: #93989c;
        }
    }
</style>