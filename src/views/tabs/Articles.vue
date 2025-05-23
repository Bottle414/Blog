<template>
    <div class='article'>
        <SideBar :lists="lists" :changeBlock="changeBlock"/>
        <RouterView>二级路由</RouterView>
    </div>
</template>

<script lang='ts' setup>
    import SideBar from '@/components/SideBar.vue'
    import { RouterView } from 'vue-router';

    const lists = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Browser', 'NetWork']

    const changeBlock = () => {
        // 改变路由
    }
</script>

<style scoped>
    .article {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }
</style>