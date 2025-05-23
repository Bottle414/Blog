<template>
    <div class="top-bar">
        <span id="name">风的叶脉</span>

        <div class="nav-right">
            <RouterLink :to="{ path: 'work' }">作品</RouterLink>
            <RouterLink :to="{ path: 'about' }">关于我</RouterLink>
            <RouterLink :to="{ path: 'contact' }">与我合作</RouterLink>

            <button id="login-btn">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    .top-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #name {
        font-size: 2rem;
        color: $color-white;
        text-shadow: $shadow-deep;
    }

    .nav-right {
        display: flex;
        min-width: 350px;
        gap: 2vw;
        font-size: 1.2rem;
        user-select: none;
        align-items: center;

        a {
            position: relative;
            color: $color-white;
            transform-origin: left;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 100%;
                height: 2px;
                background-color: $color-white;
                border-radius: 5px;
                transform-origin: right;
                transform: scaleX(0);
                transition: transform 0.5s;
            }

            &:hover::after {
                transform-origin: left;
                transform: scaleX(1);
            }
        }

        #login-btn {
            padding: 2% 6%;
            font-size: 1rem;
            border: 2px solid $color-white;
            box-shadow: $shadow-light, $shadow-deep;
            background: transparent;
            color: $color-white;
        }
    }
</style>
