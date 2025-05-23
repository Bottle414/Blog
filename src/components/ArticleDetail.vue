<template>
    <div class='article-detail' @click="handleClick">
        <div class="article-img" :style="{ backgroundImage: `url(${detailSrc})` }"></div>
        <h1>{{ title }}</h1>
        <p>
            {{ detail }}
        </p>
    </div>
</template>

<script lang='ts' setup>
    import img1 from '@/assets/image1.png'
    defineProps({
        detailSrc: {
            type: String,
            default: img1// 直接把路径写进来，vue不会解析
        },
        title: {
            type: String,
            default: '无标题'
        },
        detail: {
            type: String,
            default: '暂无描述'
        }
    })

    const emits = defineEmits(['click'])

    function handleClick(){
        emits('click')
    }
    
</script>

<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .article-detail {
        margin: 10px;
        padding: 10px;
        width: 95%;
        height: 150px;
        box-shadow: $shadow-light;
        border-radius: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        .article-img {
            height: 100px;
            float: left;
            margin: 0 10px 0 0;
            aspect-ratio: 4 / 3;
            background-position: center;/* 当一开始设置的行内是background(很多backgound属性的缩写), 再这样写就会被行内style覆盖完毕 */
            background-size: contain;
            border-radius: 8px;
        }

        h1 {
            margin: 0 20px;
        }

        p {
            width: 100%;
        }

        &:hover {
            box-shadow: $shadow-deep, $shadow-light;
        }
    }
</style>