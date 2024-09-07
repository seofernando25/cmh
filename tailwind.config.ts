import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    // --color-red: #751d1d;
    // --color-brown: #46281a;
    // --color-white: #ece9e8;
    // --color-gray: #816459;
    // --color-yellow: #c1945d;
    // --color-orange: #a05830;

    theme: {
        extend: {
            colors: {
                "theme-red": "#751d1d",
                "theme-brown": "#46281a",
                "theme-white": "#ece9e8",
                "theme-gray": "#816459",
                "theme-yellow": "#c1945d",
                "theme-orange": "#a05830",
            },
        },
    },

    plugins: [],
} as Config;
