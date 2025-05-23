<template>
    <div class="tip">
        <p>单指向左滑动</p>
        <ScrollDown />
    </div>
    <div
        id="image-track"
        ref="track"
        data-mouse-down-at="0"
        data-prev-percentage="0"
    >
        <img
            v-for="(src, index) in images"
            :key="index"
            class="image"
            :src="src"
            :alt="'image' + (index + 1)"
            :draggable="false"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import ScrollDown from '@/components/ScrollDown.vue'

    const track = ref<HTMLElement | null>(null)
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

    const handleMouseMove = (e: MouseEvent) => {
        if (!track.value || track.value.dataset.mouseDownAt === '0') return

        const mouseDelta =
            parseFloat(track.value.dataset.mouseDownAt!) - e.clientX
        const maxDelta = window.innerWidth / 2
        let percentage = (mouseDelta / maxDelta) * -100
        let nextPercentage =
            parseFloat(track.value.dataset.prevPercentage!) + percentage

        nextPercentage = Math.min(Math.max(nextPercentage, -100), 0)
        track.value.dataset.percentage = nextPercentage.toString()
        track.value.style.transform = `translate(${nextPercentage}%, -50%)`

        track.value.animate(
            {
                transform: `translate(${nextPercentage}%, -50%)`
            },
            { duration: 1200, fill: 'forwards' }
        )

        const imageEls =
            track.value.querySelectorAll<HTMLImageElement>('.image')
        imageEls.forEach((img) => {
            img.style.objectPosition = `${nextPercentage + 100}% center`
            img.animate(
                {
                    objectPosition: `${100 + nextPercentage}% center`
                },
                { duration: 1200, fill: 'forwards' }
            )
        })
    }

    const handleMouseUp = () => {
        if (!track.value) return
        track.value.dataset.mouseDownAt = '0'
        track.value.dataset.prevPercentage =
            track.value.dataset.percentage || '0'
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
