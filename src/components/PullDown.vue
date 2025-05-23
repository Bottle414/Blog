<template>
    <div class='pulldown'>
        <slot></slot>
        <ul>
            <li v-for="item in social">{{ item }}</li>
        </ul>
    </div>
</template>

<script lang='ts' setup>
    import { ref } from 'vue'
    defineProps(['social'])
    
</script>

<style scoped>
    .pulldown {
        height: 0;
        width: 100%;
        overflow: hidden;
        transition: height 1s;
    }

    .pulldown:hover {
        max-height: 200px;
    }
</style>