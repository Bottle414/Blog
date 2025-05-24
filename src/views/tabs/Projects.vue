<template>
    <div class="projects">
        <div
            class="row"
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'row-reverse': index % 2 === 1 }"
        >
            <div class="col-image">
                <a :href="item.link">
                    <img
                        :class="`delay-${index % 5}`"
                        :src="getImage(item.name)"
                        @error="handleError"
                        alt="project-image"
                    />
                </a>
                <div class="overlay">
                    <div class="info">{{ item.title }}</div>
                </div>
            </div>
            <div :class="'col-detail'">
                {{ item.detail }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const items = [
        {
            name: 'image3.png',
            title: 'C语言植物大战僵尸',
            link: '',
            detail: '这是我的第一个项目，在大一下的时候做的，算是我的启蒙。从这时候开始我才知道一个应用是如何运转的。我花了很多时间，完成了14种植物，8种僵尸，两个地图，配有BOSS战斗、卡牌冷却、推车、铲子等功能。'
        },
        {
            name: 'image4.png',
            link: '',
            title: 'Java聊天室',
            detail: '这是我的第二个项目，在大二上做的，这时候接触了MVC模型。我为它做了添加删除好友、单人多人聊天、文件图片发送、Emoji表情发送、上线提示功能。'
        },
        {
            name: 'image3.png',
            link: '',
            title: '后台管理系统',
            detail: '这是我第一个正规流程的项目，从此我知道前后端如何交互，前端工程化在这里启蒙。我充当全栈，除去登录注册、主题色切换……我还做了路由鉴权、数据库设计、接口设计……还把它部署到了阿里云。'
        },
        {
            name: 'image2.png',
            link: '',
            title: 'Bottle-UI',
            detail: '这是我的第一个轮子项目，从这里我学到了很多高级用法，对组件通信理解更多了，写样式更是写了个爽(我最喜欢的部分，其实我不是很喜欢做业务)。后面经常要封装组件，对我来说已经是信手拈来的事了。'
        },
        {
            name: 'image2.png',
            link: '',
            title: 'Blog',
            detail: '如你所见，就是这个博客。这是真正意义上第一个我独立完成的项目。全程没有任何视频参考，自己查文档、找资料，自己设计结构和界面，把自己所想的创造出来。'
        }
    ]

    function getImage(name: string) {
        return new URL(`@/assets/${name}`, import.meta.url).href
    }

    function handleError(event: Event) {
        if (!event.target) return
        ;(event.target as HTMLImageElement).src = new URL(
            `@/assets/image1.png`,
            import.meta.url
        ).href
    }
</script>

<style scoped lang="scss">
    .projects {
        padding: 0 10%;
        user-select: none;
    }
    .row {
        display: flex;
        align-items: center; /* Vertically align items in the row */
        margin-bottom: 30px; /* Add some space between rows */
    }

    .col-image {
        position: relative;
        flex: 1; /* Takes up 1 part of the available space */
        padding: 15px; /* Add some padding around the image */
        overflow: hidden;
    }

    .overlay {
        position: absolute;
        bottom: 15px;
        left: 10px;
        height: 60px; /* 等于 .col-image 的 padding-top */
        left: 15px; /* 等于 .col-image 的 padding-left */
        right: 15px; /* 等于 .col-image 的 padding-right */
        bottom: 15px; /* 等于 .col-image 的 padding-bottom */
        background: rgba(10, 10, 10, 0.6); /* 半透明黑背景 */
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        display: flex;
        align-items: flex-end; /* 信息靠底部 */
        justify-content: center;
        transform: translateY(100%); /* 初始隐藏 */
        transition: transform 0.4s ease-in-out;
        color: white;
        padding: 20px;
        box-sizing: border-box;
        opacity: 0;
    }

    /* Hover 时显示遮罩层 */
    .col-image:hover .overlay {
        opacity: 1;
        transform: translateY(0); /* 向上浮现 */
    }

    .col-detail {
        flex: 2; /* Takes up 2 parts of the available space, making it wider */
        padding: 5%; /* Add some padding around the detail text */
        border: 1px solid $color-light-grey;
        border-radius: 5px;
        // animation: float 8s ease-in-out infinite;
        // will-change: transform; /* 强制开启硬件加速, 但还是会抖动 */

        &:hover {
            animation-play-state: paused;
            box-shadow: $shadow-around;
        }
    }

    /* For even rows (0-indexed: 1st, 3rd, etc.), reverse the order */
    .row-reverse {
        flex-direction: row-reverse;
    }

    img {
        width: 100%;
        height: auto; /* Maintain aspect ratio */
        display: block; /* Remove extra space below image */
        border-radius: 8px; /* Slightly rounded corners for the image */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        // animation: float 10s ease-in-out infinite;
    }

    /* .delay-0 {
        animation-delay: 0s;
    }
    .delay-1 {
        animation-delay: 0.5s;
    }
    .delay-2 {
        animation-delay: 1.6s;
    }
    .delay-3 {
        animation-delay: 1.2s;
    }
    .delay-4 {
        animation-delay: 2s;
    }
    */

    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {
        .row,
        .row-reverse {
            flex-direction: column; /* Stack items vertically on small screens */
        }

        .col-image,
        .col-detail {
            flex: none; /* Remove flex sizing */
            width: 100%; /* Full width */
            padding: 10px;
            text-align: center; /* Center text on small screens */
        }
    }
</style>
