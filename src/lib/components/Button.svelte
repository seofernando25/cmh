<script>
</script>

<button on:click {...$$restProps}>
    <slot />
</button>

<style>
    button {
        background-color: var(--color-red);
        padding: 0.25rem 0.75rem;
        color: var(--color-yellow);
        border: 0.5rem solid var(--color-yellow);
        border-radius: 8rem;
        transition: all 0.2s ease-out;
    }

    button:hover {
        --color-yellow: white;
        color: white;
        scale: 1.1;
    }
</style>
