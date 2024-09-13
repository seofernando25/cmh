<script lang="ts">
    import { get } from "svelte/store";
    import introBg from "$lib/assets/introBG.png";
    import intro from "$lib/story/intro";
    import { globalState } from "$lib/utils/dialog";

    const state = globalState;

    intro(state);

    $: dialogOpacity = state.dialogOpacity;
    $: txt = state.currentText;
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
    {$txt}
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
        color: var(--color-yellow);
        padding: 2em;
        top: 20%;
        bottom: 20%;
        left: 20%;
        right: 20%;

        background-color: rgb(from var(--color-red) r g b);
        backdrop-filter: blur(0.2em);
        border: 1rem solid var(--color-yellow);
        border-radius: 8rem;
        user-select: none;
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
</style>
