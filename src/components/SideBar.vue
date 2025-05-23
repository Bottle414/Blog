<template>
    <div class='sidebar'>
        <ul>
            <li v-for="item in lists" @click="changeBlock(item)">{{ item }}</li>
        </ul>
    </div>
</template>

<script lang='ts' setup>
    defineProps(['lists'])
    const emit = defineEmits(['changeBlock'])

    function changeBlock(item: string){
        emit('changeBlock', item)
    }
</script>

<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
        user-select: none;
    }
    .sidebar {
        ul {
            width: 100%;
            height: 100vh;
            text-align: center;
            border-right: 1px solid $color-grey;
        }

        li {
            padding: 15px 15px;
        }

        li:hover {
            background: $color-light-grey;
        }
    }
</style>