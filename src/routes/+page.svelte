<script lang="ts">
    import title from "$lib/assets/title.svg";
    import { hasStartedGame } from "$lib/gamedata";
</script>

<div class="opt-menu-bg"></div>
<img src={title} alt="title" class="center" />

<!-- Title opts -->
<div class="opt-menu">
    <a class="opt-menu-item" href="/game">
        {#if $hasStartedGame === true}
            Continue
        {:else}
            Start Shift
        {/if}
    </a>
    <a class="opt-menu-item" href="/help">Help</a>
</div>

<style>
    .center {
        display: block;
        margin-left: auto;
        margin-right: 5%;
        padding-top: 1%;
        width: 30%;
        filter: drop-shadow(0 0 0.75rem #432818);
        rotate: 0;
        transition: all 0.2s ease-out;
        animation: pulsating 1s infinite;
    }

    .opt-menu {
        position: absolute;

        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        height: 100%;
        justify-content: center;
    }

    .opt-menu-item {
        font-size: 4rem;
        color: #bb9557;
        text-decoration: none;
        transition: all 0.2s ease-out;
    }

    .opt-menu-item:focus,
    .opt-menu-item:active,
    .opt-menu-item:hover {
        color: #f4f4f4;
        outline: none;
        scale: 1.05;
        translate: 2rem 0;
    }

    .opt-menu-bg {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #6f1c1b;
        width: 35rem;
        height: 140%;
        display: flex;
        justify-content: center;

        border-radius: 0 50% 50% 0;
        translate: -30% -20%;
        /* border */
        outline: 20px solid #bb9557;
    }

    .center:hover {
        rotate: 10deg;
    }

    @keyframes pulsating {
        0% {
            transform: scale(0.9);
        }

        50% {
            transform: scale(1);
        }

        100% {
            transform: scale(0.9);
        }
    }
</style>
