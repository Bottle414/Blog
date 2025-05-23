<template>
    <div class="work">
        <!-- 标签栏 -->
        <div class="tab-header" :style="{ '--tab-color': tabs[currentTab].tabColor }">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: currentTab === index }"
                @click="currentTab = index"
            >
                {{ tab.label }}
            </div>
            <div>
                <input type="text" placeholder="search...">
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="tab-content">
            <component :is="tabs[currentTab].component" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import Articles from '@/views/tabs/Articles.vue'
    import Projects from '@/views/tabs/Projects.vue'
    import Demos from '@/views/tabs/Demos.vue'

    const currentTab = ref(0)

    const tabs = [
        { label: '文章', component: Articles, tabColor: '#65A1F0' },
        { label: '项目', component: Projects, tabColor: '#EEA84E'},
        { label: 'Demo', component: Demos, tabColor: '#91C46C' }
    ]
</script>

<style scoped lang="scss">
    .tab-header {
        display: flex;
        width: 100%;
        background: $color-grey;
        user-select: none;
        align-items: center;
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

    input[type=text]:focus {
        width: 250px;
        border: 2px solid $color-theme;
    }

    .tab-header .active {
        background: var(--tab-color);
        color: $color-white;
    }

    .tab-content {
        width: 100%;
        border: 1px solid $color-deep-grey;
    }
</style>
