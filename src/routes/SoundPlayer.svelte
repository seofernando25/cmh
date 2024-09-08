<script lang="ts">
    import corneliaHmm from "$lib/assets/sfx/cornelia_hmm.mp3";
    import {
        bgmVolume,
        currentSeek,
        currentSong,
        songDuration,
    } from "$lib/utils/bgm";
    import { sfxVolume } from "$lib/utils/sfx";

    let sampleHowl = new Howl({
        src: [corneliaHmm],
        volume: $sfxVolume,
    });
    function setBgmVolume(e: Event) {
        const event = e.target as HTMLInputElement;
        bgmVolume.set(Number(event.value));
        sampleHowl.stop();
        sampleHowl.volume($sfxVolume);
        sampleHowl.play();
    }

    function setSfxVolume(e: Event) {
        const event = e.target as HTMLInputElement;
        sfxVolume.set(Number(event.value));
        sampleHowl.stop();
        sampleHowl.volume($sfxVolume);
        sampleHowl.play();
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

<details>
    <summary
        class="p-4 text-theme-yellow rounded-full bg-theme-red w-14 h-14 flex items-center justify-center
        border-theme-yellow border-2 hover:scale-110 transition-transform"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            class="w-full h-full"
            fill="currentColor"
        >
            ><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
                d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
            /></svg
        >
    </summary>
    <div
        class="mt-4 bg-theme-red flex flex-col p-4 details-container text-theme-yellow border-theme-yellow"
    >
        <span>Now Playing: {$currentSong} </span>

        <span>
            {formatTime($currentSeek)}/{formatTime($songDuration)}
        </span>

        <label for="BGM">
            <span> BGM </span>

            <input
                type="range"
                id="BGM"
                class="w-32"
                min="0"
                max="1"
                step="0.01"
                value={$bgmVolume}
                on:input={setBgmVolume}
            />
        </label>
        <label for="SFX">
            SFX

            <input
                type="range"
                id="SFX"
                min="0"
                max="1"
                step="0.01"
                value={$sfxVolume}
                on:input={setSfxVolume}
            />
        </label>
    </div>
</details>

<style>
    .player-hidden {
        transform: translateX(-95%);
    }

    details {
        user-select: none;
        position: absolute;
        display: flex;
        z-index: 100;
        height: 100px;
        padding: 0.5em;
    }

    /* Hide tails arrow */
    details summary::-webkit-details-marker {
        display: none;
    }

    .details-container {
        border-width: 0.1em;
    }
</style>
