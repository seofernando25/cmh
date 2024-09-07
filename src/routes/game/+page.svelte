<script lang="ts">
    import bg from "$lib/assets/candyshop.webp";
    import emptyPortrait from "$lib/assets/empty.png";

    import { fade } from "svelte/transition";

    import { get } from "svelte/store";

    import intro from "$lib/story/intro";
    import { DialogManager } from "$lib/utils/dialog";

    let dateInfo = {
        name: "",
        place: "",
        day: 0,
    };

    // let charInfo: CharacterDescriptor | undefined;

    const state = new DialogManager();

    intro(state);

    $: speaker = state.currentSpeaker;
    $: dialogOpacity = state.dialogOpacity;
    $: currentPortrait = state.currentPortrait;
    $: charRight = state.charRight;
    $: charLeft = state.charLeft;
    $: txt = state.currentText;

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

<img src={bg} alt="bg" class="bg" />

{#if $charRight}
    <img transition:fade src={$charRight} alt="portrait" class="char-right" />
{/if}

{#if $charLeft}
    <img transition:fade src={$charLeft} alt="portrait" class="char-left" />
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
        <!-- <div class="portrait-container">
        </div> -->
        <div class="text">
            {$speaker} <br />
            {$txt}
        </div>
    </div>
{/if}

<style>
    .bg {
        position: absolute;
        width: 100%;
        height: 100vh;
        /* background-color: black; */
        /* blur */
        filter: blur(5px);
        scale: 1.1;
    }

    .dialog {
        position: absolute;
        padding: 1rem;
        bottom: 5%;
        left: 5%;
        right: 5%;
        height: 20rem;
        background-color: rgb(from #6f1c1b r g b / 0.8);
        box-shadow: 20px 20px 2px #99582a;
        border: 0.5rem solid #bb9557;
        display: flex;
        user-select: none;
    }

    .portrait {
        box-sizing: border-box;
        height: 100%;
        width: 200px;
        object-fit: scale-down;
        transition: all 0.2s ease-out;
        user-select: none;
    }

    .no-potrait {
        width: 0;
    }

    .char-right {
        position: absolute;
        right: 5%;
        height: 64rem;
        bottom: -10rem;
        /* width: 30%; */
        object-fit: contain;
        transition: all 0.2s ease-out;
    }

    .char-left {
        position: absolute;
        left: 5%;
        height: 64rem;
        bottom: -10rem;
        /* width: 30%; */
        object-fit: contain;
        transition: all 0.2s ease-out;
        transform: scaleX(-1);
    }

    .char-left:hover {
        bottom: -8rem;
    }

    .char-right:hover {
        bottom: -8rem;
    }

    .text {
        color: #bb9557;
    }
</style>
