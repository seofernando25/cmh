<script lang="ts">
    import { goto } from "$app/navigation";
    import introBg from "$lib/assets/introBG.png";

    import Button from "$lib/components/Button.svelte";
</script>

<img src={introBg} alt="bg" class="bg" />

<div class="back-button">
    <Button
        on:click={() => {
            goto("/");
        }}>Back</Button
    >
</div>

<div class="dialog">
    <!-- Improve this description -->
    Shift to skip <br />
    Press T to clear mode
</div>

<style>
    .back-button {
        z-index: 100;
        position: absolute;
        top: 1rem;
        left: 1rem;
    }

    .back-button:hover {
        --color-yellow: white;
        color: white;
    }

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

        background-color: rgb(from var(--color-red) r g b);
        backdrop-filter: blur(0.2em);
        border: 1rem solid var(--color-yellow);
        border-radius: 8rem;
        user-select: none;
        color: var(--color-yellow);
    }
</style>
