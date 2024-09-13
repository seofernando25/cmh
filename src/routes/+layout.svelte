<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    import SoundPlayer from "./SoundPlayer.svelte";
    import { globalState } from "$lib/utils/dialog";

    let shiftPressed = false;
    $: resolverFn = globalState.resolverFn;

    let skipIntervalId: number | undefined = undefined;

    $: {
        if (shiftPressed && skipIntervalId === undefined) {
            skipIntervalId = setInterval(() => {
                $resolverFn();
            }, 10);
        }

        if (!shiftPressed) {
            clearInterval(skipIntervalId);
            skipIntervalId = undefined;
        }
    }
</script>

<svelte:document
    on:keydown={(e) => (shiftPressed = e.shiftKey)}
    on:keyup={(e) => (shiftPressed = e.shiftKey)}
/>

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
