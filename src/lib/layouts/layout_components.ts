import type { ComponentType } from "svelte";
import IntroLayout from "./IntroLayout.svelte";
import DefaultLayout from "./DefaultLayout.svelte";

export const ui_layouts = {
    IntroLayout,
    DefaultLayout,
} as const;
