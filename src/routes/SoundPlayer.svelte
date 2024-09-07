<script lang="ts">
    import {
        currentHowl,
        currentSong,
        audioVolume,
        isPlaying,
        currentSeek,
        songDuration,
    } from "$lib/utils/bgm";
    import { fade } from "svelte/transition";

    let player: HTMLDivElement | undefined;
    $: howl = $currentHowl;
    function setVolume(e: Event) {
        const event = e.target as HTMLInputElement;
        audioVolume.set(Number(event.value));
    }

    function toPercent(num: number) {
        return `${(num * 100).toFixed(0)}%`;
    }

    function formatTime(time: number) {
        const fmt = new Intl.DateTimeFormat("en-US", {
            minute: "2-digit",
            second: "2-digit",
        });

        return fmt.format(time * 1000);
    }
</script>

{#if $currentSong}
    <div
        bind:this={player}
        on:mouseover={() => {
            player?.classList.remove("player-hidden");
        }}
        on:focus={() => {
            player?.classList.remove("player-hidden");
        }}
        on:focusin={() => {
            player?.classList.remove("player-hidden");
        }}
        on:focusout={() => {
            player?.classList.add("player-hidden");
        }}
        on:mouseleave={() => {
            player?.classList.add("player-hidden");
        }}
        role="application"
        transition:fade
        class="player-hidden transition-all z-10 absolute top-0 left-0 bg-theme-red rounded p-2 mt-2 flex flex-col w-[25%]"
    >
        <!-- Now playing -->
        <span class="text-theme-yellow text-sm"
            >Now Playing: {$currentSong}
        </span>

        <div class="flex gap-2 place-items-center text-theme-yellow">
            <!-- Play/pause button -->
            <button
                class="grid place-items-center bg-theme-white rounded-full h-8 w-8"
                on:click={() => {
                    if (howl?.playing()) {
                        howl?.pause();
                    } else {
                        howl?.play();
                    }
                }}
            >
                {#if !$isPlaying}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="h-3 w-3"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 19L18 12 6 5z"
                        />
                    </svg>
                {:else}
                    <!-- Pause -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="h-3 w-3 text-theme-yellow"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M4 6h3v12H4zm14 0h3v12h-3z"
                        />
                    </svg>
                {/if}
            </button>

            <div class="flex flex-col w-full">
                <!-- Current volume -->
                <label for="volume" class=" text-sm flex gap-2">
                    Volume: {toPercent($audioVolume)}
                    <input
                        on:input={setVolume}
                        type="range"
                        min="0"
                        max="1"
                        bind:value={$audioVolume}
                        step="0.05"
                        class="flex-1 w-16"
                    />
                    <output></output>
                    <div class="range-slider__progress"></div>
                </label>
                <!-- Elapsed: cur-time/total-time -->
                <label for="elapse" class="text-sm">
                    {formatTime($currentSeek)}/{formatTime($songDuration)}
                </label>
            </div>
        </div>
    </div>
{/if}

<style>
    .player-hidden {
        transform: translateX(-95%);
    }
</style>
