import { type Writable, writable } from "svelte/store";

export type Typewriter = Writable<string> & {
    setDelay: (newDelay: number) => void;
    getDelay: () => number;
};

export function typewriter(str: string, delay: number = 100): Typewriter {
    let interval = -1;
    let nextFn = (s: string) => {};
    let i = 0;
    const writer = writable("", (next) => {
        i = 0;
        nextFn = next;
        interval = setInterval(() => {
            if (i >= str.length) {
                clearInterval(interval);
                return;
            }
            next(str.slice(0, ++i));
        }, delay);
        return () => clearInterval(interval);
    });
    return {
        ...writer,
        setDelay: (newDelay: number) => {
            clearInterval(interval);
            interval = setInterval(() => {
                if (i >= str.length) {
                    clearInterval(interval);
                    return;
                }
                nextFn(str.slice(0, ++i));
            }, newDelay);
            delay = newDelay;
        },
        getDelay: () => delay,
    };
}
