<script lang="ts">
    import "../app.css";
    import SoundPlayer from "./SoundPlayer.svelte";
</script>

<div class="page-wrapper">
    <div class="content-wrapper">
        <div class="content">
            <SoundPlayer></SoundPlayer>
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .page-wrapper {
        position: fixed;
        touch-action: manipulation;
        user-select: none;
        width: 100dvw;
        height: 100dvh;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        max-width: calc(
            100vh * 16 / 9
        ); /* Maintain 16:9 ratio based on height */
    }

    .content {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }
</style>
