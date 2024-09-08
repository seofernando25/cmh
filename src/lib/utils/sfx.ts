import cornelia_hmm from "$lib/assets/sfx/cornelia_hmm.mp3";
import { Howl } from "howler";
import { get, writable } from "svelte/store";
import { persisted } from "./persisted";

export const sfxHowl = writable<Howl | null>(null);

const sounds = [
    {
        name: "Cornelia Hmm",
        url: cornelia_hmm,
    },
] as const;

type SoundEffects = (typeof sounds)[number]["name"];

export async function playSFX(sfx: SoundEffects) {
    const howl = get(sfxHowl);
    if (howl) {
        // If not playing, just unload
        if (!howl.playing()) {
            howl.unload();
        } else {
            // Otherwise, fade out
            howl.fade(howl.volume(), 0, 500);
            await new Promise((resolve) => {
                howl.once("fade", resolve);
            });
            howl.unload();
        }
    }

    const sfxUrl = sounds.find((sound) => sound.name === sfx)?.url;

    if (!sfxUrl) {
        throw new Error(`Sound effect ${sfx} not found`);
    }

    const new_howl = new Howl({
        src: [sfxUrl],
        loop: false,
    });

    sfxHowl.set(new_howl);
    new_howl.play();
}

export type Song = {
    name: string;
    url: string;
};

export const sfxVolume = persisted("sfx_volume", 0.5);

sfxVolume.subscribe((val) => {
    const howl = get(sfxHowl);
    if (howl) {
        howl.volume(val);
    }
});
