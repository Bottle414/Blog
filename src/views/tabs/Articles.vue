<template>
    <div class='article'>
        <SideBar :lists="lists" @changeBlock="changeBlock"/>
        <RouterView>
            <ArticleDetail/>
        </RouterView>
    </div>
</template>

<script lang='ts' setup>
    import SideBar from '@/components/SideBar.vue'
    import ArticleDetail from '@/components/ArticleDetail.vue'
    import { RouterView } from 'vue-router';
    import router from '@/router/index'

    const lists = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Browser', 'NetWork']

    const changeBlock = (item: string) => {
        // 改变路由
        router.push(`/work/article/${item}`)
    }
</script>

<style scoped>
    .article {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }
</style>