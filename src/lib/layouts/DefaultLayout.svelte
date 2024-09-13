<script lang="ts">
    import emptyPortrait from "$lib/assets/empty.png";
    import { fade } from "svelte/transition";
    import { get } from "svelte/store";
    import { globalState } from "$lib/utils/dialog";

    const state = globalState;
    $: speaker = state.currentSpeaker;
    $: dialogOpacity = state.dialogOpacity;
    $: currentPortrait = state.currentPortrait;
    $: charRight = state.charRight;
    $: charCenter = state.charCenter;
    $: charLeft = state.charLeft;
    $: txt = state.currentText;
    $: currentBackground = state.currentBackground;
    $: bgBlur = state.bgBlur;
    $: bgOpacity = state.bgOpacity;

    const skipAction = () => {
        get(state.resolverFn)();
    };

    // press t to clear mode

    let clearMode = false;

    const keydownHandler = (e: KeyboardEvent) => {
        if (e.key === "t") {
            clearMode = !clearMode;
        }
    };
</script>

<svelte:window
    on:keydown={keydownHandler}
    on:dragstart={(e) => {
        e.preventDefault();
    }}
/>

{#if $currentBackground}
    <img
        transition:fade
        src={$currentBackground}
        alt="bg"
        class="bg"
        style="filter: blur({$bgBlur}rem);
    opacity: {$bgOpacity};
        "
    />
{/if}

{#if $charRight}
    <img
        transition:fade
        src={$charRight}
        alt="portrait"
        class="char char-right"
    />
{/if}

{#if $charCenter}
    <img
        transition:fade
        src={$charCenter}
        alt="portrait"
        class="char char-center"
    />
{/if}

{#if $charLeft}
    <img
        transition:fade
        src={$charLeft}
        alt="portrait"
        class="char char-left"
    />
{/if}

{#if !clearMode}
    <!-- content here -->
    <div
        class="dialog"
        on:click={skipAction}
        on:keypress={undefined}
        role="button"
        tabindex="0"
        style="opacity: {$dialogOpacity}"
    >
        <img
            src={$currentPortrait ? $currentPortrait : emptyPortrait}
            alt="portrait"
            class="portrait {$currentPortrait ? '' : 'no-potrait'}"
        />
        <div class="text">
            {#if $speaker !== ""}
                {$speaker} <br />
            {/if}
            {$txt}
        </div>
    </div>
{/if}

<style>
    .bg {
        position: absolute;

        width: 100%;
        height: 100%;

        scale: 1.1;
        object-fit: cover;
    }

    .dialog {
        position: absolute;
        padding: 1em;
        bottom: 5%;
        left: 5%;
        right: 5%;
        top: 72.5%;

        background-color: rgb(from #6f1c1b r g b / 0.8);
        backdrop-filter: blur(0.2em);
        /* box-shadow: 0.5em 0.5em 0.1em #99582a; */
        border: 0.5rem solid var(--color-yellow);
        border-radius: 2.5rem;
        display: flex;
        user-select: none;
    }

    /* if mobile use dialog top */
    @media (max-width: 600px) {
        .dialog {
            top: 5%;
            left: 5%;
            right: 5%;
            bottom: 72.5%;
        }
    }

    .portrait {
        flex: 0 0 auto;
        box-sizing: border-box;
        height: 100%;
        width: 5em;
        object-fit: scale-down;
        transition: all 0.2s ease-out;
        user-select: none;
    }

    .no-potrait {
        width: 0;
    }

    .char {
        position: absolute;
        transition: all 0.2s ease-out;
        height: 90%;
        animation: float 0.4s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            translate: 0 0;
        }
        50% {
            translate: 0 -1rem;
        }
        100% {
            translate: 0 0;
        }
    }

    .char-right {
        right: 5%;
        bottom: -10rem;
        object-fit: contain;
    }

    .char-left {
        left: 5%;
        bottom: -10rem;
        object-fit: contain;
        transform: scaleX(-1);
    }

    .char-center {
        left: 50%;
        transform: translateX(-50%);
        bottom: -10rem;
        object-fit: contain;
        scale: 1;
    }

    .char:hover {
        scale: 1.1;
    }

    .text {
        color: #bb9557;
    }
</style>
