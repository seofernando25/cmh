<script lang="ts">
    import emptyPortrait from "$lib/assets/empty.png";

    import { fade } from "svelte/transition";

    import { get } from "svelte/store";

    import intro from "$lib/story/intro";
    import { DialogManager, globalState } from "$lib/utils/dialog";
    import introBg from "$lib/assets/introBG.png";
    let dateInfo = {
        name: "",
        place: "",
        day: 0,
    };

    // let charInfo: CharacterDescriptor | undefined;

    const state = globalState;

    intro(state);

    $: speaker = state.currentSpeaker;
    $: dialogOpacity = state.dialogOpacity;
    $: currentPortrait = state.currentPortrait;
    $: charRight = state.charRight;
    $: charCenter = state.charCenter;
    $: charLeft = state.charLeft;
    $: txt = state.currentText;
    $: bgOpacity = state.bgOpacity;
    $: currentBackground = state.currentBackground;
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

<img src={introBg} alt="bg" class="bg" style="opacity: {$bgOpacity}" />
/>

<!-- content here -->
<div
    class="dialog"
    on:click={skipAction}
    on:keypress={undefined}
    role="button"
    tabindex="0"
    style="opacity: {$dialogOpacity}"
>
    <div class="text">
        {$txt}
    </div>
</div>

<style>
    .bg {
        position: absolute;

        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .dialog {
        position: absolute;
        padding: 2em;
        top: 20%;
        bottom: 20%;
        left: 20%;
        right: 20%;

        background-color: rgb(from var(--color-red) r g b / 0.5);
        backdrop-filter: blur(0.2em);
        border: 1rem solid var(--color-yellow);
        border-radius: 8rem;
        user-select: none;
    }

    .portrait {
        flex: 0 0 auto;
        box-sizing: border-box;
        height: 100%;
        width: 7.5em;
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
        color: var(--color-yellow);
    }
</style>
