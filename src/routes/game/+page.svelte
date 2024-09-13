<script lang="ts">
    import { globalState } from "$lib/utils/dialog";
    import { fade } from "svelte/transition";

    $: component = globalState.uiLayoutComponent;
</script>

{#if $component}
    <div transition:fade>
        <svelte:component this={$component} />
    </div>
{:else}
    <div class="loading">Loading...</div>
{/if}

<style>
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: white;
        animation: loadingAnim 1s infinite;
    }
    @keyframes loadingAnim {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
