<template>
    <div class="scroll-down">
        <div class="arrow left"></div>
        <div class="arrow right second"></div>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
    .scroll-down {
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;

        .arrow {
            width: 30px;
            height: 30px;
            border-left: 3px solid $color-white;
            border-bottom: 3px solid $color-white;
            transform: rotate(-45deg);
            margin: -2px 0;
            animation: bounce 1.2s infinite;

            &.second {
                animation-delay: 0.2s;
            }
        }

        .left {
            transform: rotate(150deg);
        }

        .right {
            transform: rotate(30deg);
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0) rotate(-45deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(8px) rotate(-45deg);
            opacity: 1;
        }
    }
</style>
