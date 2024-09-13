import { get, writable } from "svelte/store";
import { typewriter } from "./typewriter";
import { tweened } from "svelte/motion";
import type { ComponentType } from "svelte";
import { ui_layouts } from "$lib/layouts/layout_components";

export type DialogState = {
    showDate: boolean;
    showText: boolean;
    showChoices: boolean;
    text: string;
};

export type DialogSequence = (gameSequence: DialogManager) => void;

export type DialogInfo = {
    [key: number]: {
        [key: string]: DialogSequence;
    };
};

export class DialogManager {
    currentText = writable("");
    currentPortrait = writable<undefined | string>(undefined);
    currentSpeaker = writable("");
    currentBackground = writable<undefined | string>(undefined);
    bgBlur = tweened(0);
    bgOpacity = tweened(1);
    resolverFn = writable(() => {});
    currentPrompts = writable<string[]>([]);
    pickedPrompt = writable(-1);
    dateSprite = writable("");
    dialogOpacity = tweened(1);
    charLeft = writable<undefined | string>(undefined);
    charRight = writable<undefined | string>(undefined);
    charCenter = writable<undefined | string>(undefined);
    uiLayoutComponent = writable<undefined | ComponentType>(
        ui_layouts.IntroLayout
    );

    async question(
        question: string,
        choices: string[],
        o?: { speed?: number }
    ) {
        this.dialog(question, { speed: o?.speed ?? 25 });
        this.currentPrompts.set(choices);
        this.pickedPrompt.set(-1);
        return new Promise<number>((resolve) => {
            const sub = this.pickedPrompt.subscribe((i) => {
                if (i === -1) {
                    return;
                }
                sub();
                resolve(i);
                this.currentPrompts.set([]);
                this.pickedPrompt.set(-1);
            });
        });
    }

    async sleep(
        duration = 0,
        o?: {
            block?: boolean;
        }
    ) {
        let block = o?.block ?? true;
        let timeout = -1;
        if (duration === 0) {
            return new Promise<void>((resolve) => {
                this.resolverFn.set(() => {
                    resolve();
                    clearTimeout(timeout);
                });
            });
        }
        return new Promise<void>((resolve) => {
            let timeout = setTimeout(() => {
                resolve();
                if (!block) {
                    get(this.resolverFn)();
                }
            }, duration);
            this.resolverFn.set(() => {
                resolve();
                clearTimeout(timeout);
            });
        });
    }

    async dialog(
        question: string,
        o?: {
            name?: string;
            speed?: number;
            portrait?: string;
            autoDelay?: number;
        }
    ) {
        if (o?.portrait) {
            this.currentPortrait.set(o.portrait);
        }
        this.currentSpeaker.set(o?.name ?? "");
        let speed = o?.speed ?? 25;
        if (speed <= 0) {
            this.currentText.set(question);
            return new Promise<void>((resolve) => {
                this.resolverFn.set(() => {
                    resolve();
                });
            });
        }

        return new Promise<void>((resolve) => {
            const writer = typewriter(question, speed);
            const sub = writer.subscribe(async (text) => {
                this.currentText.set(text);
                if (text === question) {
                    sub();
                }
            });
            this.resolverFn.set(() => {
                // If text is still being typed, finish it
                if (get(writer).length < question.length) {
                    writer.setDelay(writer.getDelay() / 8);
                    return;
                }

                sub();
                resolve();
            });

            if (o?.autoDelay !== undefined) {
                setTimeout(() => {
                    get(this.resolverFn)();
                }, o.autoDelay);
            }
        });
    }
}

export const globalState = new DialogManager();
