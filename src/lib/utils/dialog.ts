import { get, writable } from "svelte/store";
import { typewriter } from "./typewriter";

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
    currentSpeaker = writable("");
    resolverFn = writable(() => {});
    showDate = writable(false);
    dateOpacity = writable(1);
    prompts = writable<string[]>([]);
    pickedPrompt = writable(-1);
    dateSprite = writable("normal");

    async question(
        question: string,
        choices: string[],
        o?: { speed?: number }
    ) {
        this.dialog(question, { speed: o?.speed ?? 25 });
        this.prompts.set(choices);
        this.pickedPrompt.set(-1);
        return new Promise<number>((resolve) => {
            const sub = this.pickedPrompt.subscribe((i) => {
                if (i === -1) {
                    return;
                }
                sub();
                resolve(i);
                this.prompts.set([]);
                this.pickedPrompt.set(-1);
            });
        });
    }

    async dateFadeIn(duration = 1000, o?: { block?: boolean }) {
        let block = o?.block ?? false;
        return new Promise<void>((resolve) => {
            let start = performance.now();
            let done = false;
            this.dateOpacity.set(0);
            const step = (timestamp: number) => {
                if (done) {
                    this.dateOpacity.set(1);
                    return;
                }
                const progress = timestamp - start;
                this.dateOpacity.set(progress / duration);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    this.dateOpacity.set(1);
                    if (!block) {
                        get(this.resolverFn)();
                    }
                }
            };
            window.requestAnimationFrame(step);
            this.resolverFn.set(() => {
                done = true;
                resolve();
            });
        });
    }

    async dateFadeOut(duration = 1000, o?: { block?: boolean }) {
        let block = o?.block ?? true;
        return new Promise<void>((resolve) => {
            let start = performance.now();
            let done = false;
            this.dateOpacity.set(1);
            const step = (timestamp: number) => {
                if (done) {
                    this.dateOpacity.set(0);
                    return;
                }
                const progress = timestamp - start;
                this.dateOpacity.set(1 - progress / duration);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    this.dateOpacity.set(0);
                    if (!block) {
                        get(this.resolverFn)();
                    }
                }
            };
            window.requestAnimationFrame(step);
            this.resolverFn.set(() => {
                done = true;
                resolve();
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
        }
    ) {
        this.currentSpeaker.set(o?.name ?? "");
        let speed = o?.speed ?? 25;
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
        });
    }

    async typewrite(text: string) {
        return "";
    }
}

export class WebDateManager {
    busyInAction = writable(false);

    constructor(private dateInfo: DialogManager) {}

    async playDate(date: DialogSequence) {}
}
