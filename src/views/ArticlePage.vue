<template>
    <div class='article-page'>
        <SideBar :lists="lists" @changeBlock="changeBlock">
            <template #header>
                <h1>目录</h1>
            </template>
        </SideBar>
        <article>
            <RouterView>
                此处显示文章
            </RouterView>
        </article>
    </div>
</template>

<script lang='ts' setup>
    import SideBar from '@/components/SideBar.vue';

    const lists = [
        '文章界面',
        '本来应该解析文本，提取标题类型并生成对应组件的'
    ]

    function changeBlock(item: string){
        const el = document.getElementById(item)
        console.log(el);
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth', // 平滑滚动
                block: 'start'
            })
        }
    }
    
</script>

<style scoped lang="scss">
    .article-page {
        display: grid;
        height: 100%;
        grid-template-columns: 1fr 3fr;

        h1 {
            margin: 0;
            padding: 10px 0;
            font-size: 1.5rem;
            color: $color-theme;
            border-bottom: 2px solid $color-grey;
        }
    }

    @media (max-width: 789px) {
        .article {
            /* 在小屏幕下，当侧边栏关闭时，grid-template-columns 应该只有一列 */
            /* 此时侧边栏是绝对定位或固定定位，不影响 grid 布局 */
            grid-template-columns: 1fr; /* 小屏幕下只显示内容区域，侧边栏通过定位层叠在上方 */
        }
    }
</style>