<template>
    <a href="javascript:void (0)" class="mybutton">{{ value }}</a>
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
        display: inline-block;
        width: 200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: #707477;
        color: #fff;
        font-size: 25px;
        border: none;
        border-radius: 10px;
        transition: background-color .4s;
        cursor: pointer;
        margin: 10px 0;
        &:hover {
            background-color: #93989c;
        }
    }
</style>