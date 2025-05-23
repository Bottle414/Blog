<template>
    <div class="home">
        <header>
            <nav id="navigation">
                <span id="name">风的叶脉</span>

                <div class="nav-right">
                    <RouterLink :to="{ path: 'work' }">作品</RouterLink>
                    <RouterLink :to="{ path: 'about' }">关于我</RouterLink>
                    <RouterLink :to="{ path: 'contact' }">与我合作</RouterLink>

                    <button id="register-btn">登录</button>
                </div>
            </nav>

            <div id="welcome">
                <TypeWriter content="你好啊, 远道而来的朋友" />
                <p class="zh"></p>
                <p class="en">WELCOME TO MY BLOG. MAY THE PEACE BE WITH US</p>
                <p class="log">—— 旅程本身就是奖赏</p>
            </div>
        </header>

        <ScrollDown id="scroll-down" />

        <section ref="section">
            <img
                id="author-img"
                draggable="false"
                src="@/assets/author.jpg"
                alt="author-img"
            />

            <div class="card">
                <p>Hi, 我是风的叶脉</p>
                <p>欢迎来到我的个人博客</p>
            </div>
        </section>

        <footer></footer>
    </div>
</template>

<script lang="ts" setup>
    import { useTemplateRef } from 'vue'
    import ScrollDown from '@/components/ScrollDown.vue'
    import TypeWriter from '@/components/TypeWriter.vue'
    import throttle from '@/utils/throttle.ts'

    const section = useTemplateRef<HTMLElement>('section')
    const throttleScroll = throttle(() => {
        console.log('triggle!')
        if (!section.value) return
        section.value.style.top = -window.scrollY * 0.5 + 'px'
    }, 10)

    window.addEventListener('scroll', throttleScroll)

    // 当文字进入视口，opacity变成1并向上跳跃 animation改成在active时候加
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 选中文字，播放动画
                // const introduce = document.querySelector('.card')

                cardObserver.unobserve(entry.target)
            }
        })
    })
</script>

<style scoped lang="scss">
    header {
        height: 90vh;
        background-image: url('@/assets/image3.png');
        background-position: 30% 70%;
        user-select: none;

        #navigation {
            position: sticky;
            top: 0;
            padding: 2%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #name {
            font-size: 2rem;
            color: $color-white;
        }

        .nav-right {
            display: flex;
            min-width: 300px;
            gap: 5%;
            font-size: 1.2rem;
            user-select: none;

            a {
                color: $color-white;
            }
        }

        #welcome {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: $color-white;
            text-wrap: nowrap;

            .zh,
            .en {
                margin: 0;
                text-shadow:
                    1px 1px 1px rgba(100, 100, 100, 0.2),
                    1px 2px 2px rgba(100, 100, 100, 0.1);
            }

            .zh {
                font-size: 3.5rem;
                font-weight: bold;
            }

            .en {
                font-size: 1.4rem;
            }
        }
    }

    #scroll-down {
        top: 72vh;
        left: 50%;
    }

    section {
        position: relative;
        display: flex;
        padding: 5%;
        width: 100%;
        height: 600px;
        align-items: center;
        background: $color-grey;
        box-shadow: 2px 2px 2px $color-grey;

        #author-img {
            position: absolute;
            width: 30%;
            aspect-ratio: 1 / 1;
            border-radius: 100%;
        }

        .card {
            position: absolute;
            right: 20%;
            padding: 5%;
            background: $color-white;
            box-shadow: 1px 2px 2px rgba(100, 100, 100, 0.2);
            border: 1px solid $color-theme;
            border-radius: 10px;

            p {
                font-size: 1.2rem;
            }
        }
    }

    footer {
        position: relative;
        width: 100%;
        height: 400px;
        background: $color-black;
    }
</style>
