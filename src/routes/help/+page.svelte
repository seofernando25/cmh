<script lang="ts">
    import { get } from "svelte/store";

    import introBg from "$lib/assets/introBG.png";
    import intro from "$lib/story/intro";
    import { goto } from "$app/navigation";

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
<!-- content here -->
<div class="dialog">
    <div class="text">
        <!-- Improve this description -->
        Shift to skip <br />
        Press T to clear mode
    </div>
</div>

<!-- Top left button to go back -->

<style>
    .back-button {
        z-index: 100;
        position: absolute;
        /* background-color: red; */
        top: 1rem;
        left: 1rem;
        /* background-color: var(--color-red);
        padding: 0.5rem 1rem;
        color: var(--color-yellow);
        border: 0.5rem solid var(--color-yellow);
        border-radius: 8rem;
        transition: all 0.2s ease-out; */
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
