<template>
    <div class="work">
        <!-- 标签栏 -->
        <div class="tab-header" :style="{ '--tab-color': tabs[currentTab].tabColor }">
            
                <RouterLink :to="{ name: 'home' }">
                    <div id="to-home">首页</div>
                </RouterLink>
            
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: currentTab === index }"
                @click="changeTab(index)"
            >
                {{ tab.label }}
            </div>
            <div>
                <input type="text" placeholder="search...">
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="tab-content">
            <!-- <component :is="tabs[currentTab].component" /> 不是子路由，刷新会重置-->
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import router from '@/router/index.ts'
    import { storeToLocal, getFromLocal } from '@/utils/local.ts'

    const currentTab = ref(0)

    const tabs = [
        { label: '文章', name: 'article/HTML', tabColor: '#65A1F0' },
        { label: '项目', name: 'project', tabColor: '#EEA84E'},
        { label: 'Demo', name: 'demo', tabColor: '#91C46C' }
    ]

    function changeTab(index: number){
        currentTab.value = index
        router.push(`/work/${ tabs[index].name }`)
        storeToLocal('curTab', currentTab.value)
    }

    onMounted(() => {
        currentTab.value = getFromLocal('curTab')
        console.log(currentTab.value);
    })
</script>

<style scoped lang="scss">
    .tab-header {
        display: flex;
        width: 100%;
        background: $color-grey;
        user-select: none;
        align-items: center;
    }

    #to-home {
        color: $color-theme;

        &:hover {
            background: $color-green;
            color: $color-white;
        }
    }

    .tab-header div {
        padding: 15px 30px;
        cursor: pointer;
        transition: all 0.3s;
    }

    input[type=text] {
        position: absolute;
        font-size: 1.1rem;
        outline: none;
        border: 2px solid $color-deep-grey;
        border-radius: 5px;
        width: 100px;
        height: 40px;
        top: 2%;
        transition: width .3s, border .3s;
    }

    input[type=text]:focus, input[type=text]:hover {
        width: 250px;
        border: 2px solid $color-theme;
    }

    .tab-header .active {
        background: var(--tab-color);
        color: $color-white;
    }

    .tab-content {
        position: relative;
        width: 100%;
        height: 89vh;
        overflow-x: hidden;
        border: 1px solid $color-deep-grey;
    }
</style>
