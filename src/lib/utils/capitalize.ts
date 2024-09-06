import { writable, type Writable } from "svelte/store";

export function capitalize(str: string) {
    if (typeof str !== "string" || str.length === 0) {
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}
