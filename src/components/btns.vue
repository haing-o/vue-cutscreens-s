<template>
    <div class="btns">
        <my-button value="Add"></my-button>
        <my-button value="Start !"></my-button>
        <my-button value="Reset"></my-button>
    </div>
</template>

<script>
    import myButton from '@/components/button.vue'
    export default {
        name: 'btns',
        components: {
            myButton,
        }
    }
</script>

<style scoped>
    .btns {
        width: 200px;
        position: fixed;
        right: 100px;
        top: 200px;
    }
</style>