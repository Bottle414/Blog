<template>
    <div class='article'>
        <SideBar :lists="lists" @changeBlock="changeBlock"/>
        <RouterView></RouterView> <!-- <ArticleDetail/> -->
    </div>
</template>

<script lang='ts' setup>
    import SideBar from '@/components/SideBar.vue'
    import { RouterView } from 'vue-router';
    import router from '@/router/index'
    import { onMounted } from 'vue'

    const lists = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Browser', 'NetWork']

    const changeBlock = (item: string) => {
        // 改变路由
        router.push({
            name: 'category',
            params: {
                category: item
            }
        })
    }
</script>

<style scoped>
    .article {
        display: grid;
        height: 100%;
        grid-template-columns: 1fr 3fr;
    }
</style>