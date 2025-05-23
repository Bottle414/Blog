<template>
    <div class="typewriter">
        <span ref="textSpan">{{ displayedContent }}</span>
        <span class="cursor">_</span>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, onUnmounted } from 'vue'

    const props = defineProps<{
        content: string
        speed?: number
        fontSize: string // 字体大小
        loopInterval?: number // 打字完成后，隔多久重新开始循环，单位毫秒。如果为 0 或 undefined，则不循环。
    }>()

    const textSpan = ref<HTMLSpanElement | null>(null)
    const displayedContent = ref('')
    let currentIndex = 0
    let typeTimeout: number | null = null // 用于存储 setTimeout 的 ID
    let loopTimeout: number | null = null // 用于存储循环定时器的 ID

    // 打字机核心函数
    const typeWriter = () => {
        // 清除任何可能存在的循环定时器，防止重复触发
        if (loopTimeout) {
            clearTimeout(loopTimeout)
            loopTimeout = null
        }

        if (currentIndex < props.content.length) {
            // 还在打字中
            displayedContent.value += props.content[currentIndex]
            currentIndex++
            typeTimeout = setTimeout(typeWriter, props.speed || 100)
        } else {
            // 打字完成
            if (typeTimeout) {
                clearTimeout(typeTimeout)
                typeTimeout = null
            }

            // 检查是否需要循环
            if (props.loopInterval && props.loopInterval > 0) {
                loopTimeout = setTimeout(() => {
                    resetTypewriter() // 重置打字机状态
                    typeWriter() // 重新开始打字
                }, props.loopInterval)
            }
        }
    }

    // 重置打字机状态的函数
    const resetTypewriter = () => {
        if (typeTimeout) {
            clearTimeout(typeTimeout)
            typeTimeout = null
        }
        if (loopTimeout) {
            // 确保也清除循环定时器
            clearTimeout(loopTimeout)
            loopTimeout = null
        }
        displayedContent.value = ''
        currentIndex = 0
    }

    // 组件挂载时开始打字
    onMounted(() => {
        typeWriter()
    })

    // 监听 content prop 的变化，如果外部传入的 content 改变了，就重置并重新开始打字
    watch(
        () => props.content,
        (newContent, oldContent) => {
            if (newContent !== oldContent) {
                resetTypewriter()
                // 延时一点点再开始打字，确保DOM更新完成，并避免watch回调和mounted同时触发的问题
                setTimeout(typeWriter, 50)
            }
        },
        { immediate: false }
    ) // immediate: false 避免在组件初次挂载时重复触发

    // 组件卸载时清除所有定时器，防止内存泄漏
    onUnmounted(() => {
        if (typeTimeout) {
            clearTimeout(typeTimeout)
        }
        if (loopTimeout) {
            clearTimeout(loopTimeout)
        }
    })
</script>

<style lang="scss">
    .typewriter {
        font-family: monospace;
        font-size: v-bind(fontSize);
        white-space: nowrap;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
    }

    .cursor {
        display: inline-block;
        width: 1ch;
        animation: blink 0.7s steps(1) infinite;
    }

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
</style>
