<template>
    <div class="home">
        <header>
            <nav id="navigation">
                <TopBar />
            </nav>

            <div id="welcome" ref="welcome">
                <TypeWriter
                    font-size="2.5rem"
                    content="你好啊, 远道而来的朋友"
                />
                <p class="zh"></p>
                <p class="en">WELCOME TO MY BLOG. MAY THE PEACE BE WITH US</p>
                <p class="log">—— 旅程本身就是奖赏</p>
            </div>
        </header>

        <ScrollDown id="scroll-down" />

        <section class="ribbon" ref="section">
            <img
                id="author-img"
                draggable="false"
                src="@/assets/author.jpg"
                alt="author-img"
            />

            <div class="card">
                <p>Hi, 我是风的叶脉</p>
                <p>欢迎来到我的个人博客</p>
                <p>很高兴见到你！</p>
                <p>Github链接: <a href="./">Bottle414</a></p>
            </div>
        </section>

        <section class="introduce">
            <div id="sentence1" ref="sentence1">
                <p>如你所见</p>
                <p>它还不是那么完善</p>
            </div>
    
            <div id="sentence2" ref="sentence2">
                <p>别担心</p>
                <p>它还在成长</p>
                <p>就像我们每一个人</p>
            </div>
        </section>

        <footer></footer>
    </div>
</template>

<script lang="ts" setup>
    import { useTemplateRef } from 'vue'
    import ScrollDown from '@/components/ScrollDown.vue'
    import TypeWriter from '@/components/TypeWriter.vue'
    import TopBar from '@/components/TopBar.vue'
    import throttle from '@/utils/throttle.ts'

    const sectionRef = useTemplateRef<HTMLElement>('section')
    const welcomeRef = useTemplateRef<HTMLElement>('welcome')
    const sentence1Ref = useTemplateRef<HTMLElement>('sentence1')
    const sentence2Ref = useTemplateRef<HTMLElement>('sentence2')

    const throttleScroll = throttle(() => {
        if (!sectionRef.value || !welcomeRef.value) return
        const curScrollY = window.scrollY
        const translateYValue = curScrollY * 0.5
        sectionRef.value.style.transform = `translateY(-${translateYValue}px)`// 比起top, 推荐transform

        if (curScrollY >= 80) welcomeRef.value.style.opacity = '0'
        else welcomeRef.value.style.opacity = '1'

        const classList = sentence1Ref.value?.classList
        if (curScrollY >=800){
            if (!classList?.contains('slideIn')) classList?.add('slideIn')
        }

    }, 10)

    window.addEventListener('scroll', throttleScroll)
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
            width: 100%;
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
            transition: opacity 1s ease;

            .zh,
            .en {
                margin: 0;
                text-shadow: $shadow-light, $shadow-deep;
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

    section.ribbon {
        position: absolute;
        display: flex;
        padding: 5%;
        width: 100%;
        height: 600px;
        top: 90vh;
        align-items: center;
        background: $color-grey;
        z-index: 2;

        #author-img {
            position: absolute;
            width: 30%;
            max-width: 350px;
            aspect-ratio: 1 / 1;
            border-radius: 100%;
            border: 1px solid $color-white;
            box-shadow: $shadow-light;
        }

        .card {
            position: absolute;
            right: 20%;
            padding: 5%;
            background: $color-white;
            box-shadow: 1px 2px 2px rgba(100, 100, 100, 0.2);
            border: 1px solid $color-theme;
            border-radius: 10px;
            text-align: center;

            p {
                font-size: 1.2rem;
            }
        }
    }

    section.introduce {
        position: relative;
        top: 10vh;
        width: 100%;
        height: 800px;
        background: url('@/assets/image4.png');
        background-position: center;
        background-size: contain;
        color: $color-white;
        
        p {
            margin: 0;
            font-size: 1.5rem;
        }

        .sentence1 {
            position: absolute;
            top: 110vh;
        }

        .sentence2 {
            position: absolute;
            top: 110vh;
        }
    }

    footer {
        width: 100%;
        height: 600px;
        background: $color-black;
    }

    /* @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-50%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    } */
</style>
