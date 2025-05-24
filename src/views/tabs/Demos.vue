<template>
    <div class="demos">
        <div class="tip" ref="tip">
            <p>单指向左滑动</p>
            <p>一些Demo</p>
            <ScrollDown />
        </div>
        <div id="image-track" ref="track" data-mouse-down-at="0" data-prev-percentage="0">
            <img
                v-for="(src, index) in images"
                :key="index"
                class="image"
                :src="src"
                :alt="'image' + (index + 1)"
                :draggable="false"
                @click="jumpTo"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import ScrollDown from '@/components/ScrollDown.vue'
    import throttle from '@/utils/throttle'

    const track = ref<HTMLElement | null>(null)
    const tip = ref<HTMLElement | null>(null)
    const images = [
        new URL('@/assets/image1.png', import.meta.url).href,
        new URL('@/assets/image2.png', import.meta.url).href,
        new URL('@/assets/image3.png', import.meta.url).href,
        new URL('@/assets/image4.png', import.meta.url).href,
        new URL('@/assets/image3.png', import.meta.url).href,
        new URL('@/assets/image2.png', import.meta.url).href,
        new URL('@/assets/image1.png', import.meta.url).href
    ]

    const handleMouseDown = (e: MouseEvent) => {
        if (!track.value) return
        track.value.dataset.mouseDownAt = e.clientX.toString()
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
        if (!track.value || track.value.dataset.mouseDownAt === '0' || !tip.value) return

        const mouseDelta = parseFloat(track.value.dataset.mouseDownAt!) - e.clientX
        const maxDelta = window.innerWidth / 2
        let percentage = (mouseDelta / maxDelta) * -100

        const transLeft = track.value.style.transform.slice(11, 13)

        if (parseFloat(transLeft) >= 5) {
            tip.value.classList.add('fade')
        } else {
            tip.value.classList.remove('fade')
        }

        let nextPercentage = parseFloat(track.value.dataset.prevPercentage!) + percentage

        nextPercentage = Math.min(Math.max(nextPercentage, -100), 0)
        track.value.dataset.percentage = nextPercentage.toString()
        track.value.style.transform = `translate(${nextPercentage}%, -50%)`

        track.value.animate(
            {
                transform: `translate(${nextPercentage}%, -50%)`
            },
            { duration: 1200, fill: 'forwards' }
        )

        const imageEls = track.value.querySelectorAll<HTMLImageElement>('.image')
        imageEls.forEach((img) => {
            img.style.objectPosition = `${nextPercentage + 100}% center`
            img.animate(
                {
                    objectPosition: `${100 + nextPercentage}% center`
                },
                { duration: 1200, fill: 'forwards' }
            )
        })
    }, 50)

    const handleMouseUp = () => {
        if (!track.value) return
        track.value.dataset.mouseDownAt = '0'
        track.value.dataset.prevPercentage = track.value.dataset.percentage || '0'
    }

    const jumpTo = () => {
        // 跳转链接
    }

    onMounted(() => {
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    })

    onUnmounted(() => {
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    })
</script>

<style scoped lang="scss">
    p {
        margin: 0;
        font-size: 1.3rem;
        color: $color-white;
    }

    .demos {
        position: relative;
        background: $color-black;
        height: 100%;
        user-select: none;
    }

    .tip {
        position: absolute;
        top: 40%;
        left: 15%;
        text-align: center;
        transition: opacity 0.5s ease-out;
    }

    .scroll-down {
        transform: translate(500%, -160%) rotate(-90deg);
        transition: opacity 1s;
    }

    .fade {
        opacity: 0;
    }

    #image-track {
        display: flex;
        gap: 4vmin;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(0%, -50%);
        z-index: 2;
        user-select: none;
    }

    .image {
        width: 40vmin;
        height: 56vmin;
        object-fit: cover;
        object-position: 100% 50%;
    }

    .scroll-down {
        .arrow {
            border-left: 2px solid $color-theme;
            border-right: 2px solid $color-theme;
        }
    }
</style>
