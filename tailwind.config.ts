import type { Config } from "tailwindcss";
import headlessUI from "@headlessui/tailwindcss";

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                blue: {
                    50: "#e8e9ff",
                    100: "#b9bcff",
                    200: "#8b8fff",
                    300: "#5d63ff",
                    400: "#2e36ff",
                    500: "#0009ff",
                    600: "#0008d1",
                    700: "#0006a2",
                    800: "#000474",
                    900: "#000474",
                    950: "#000117"
                }
            },

            fontFamily: {
                bahnscrift: ["Bahnscrift", "sans-serif"]
            }
        }
    },
    plugins: [headlessUI],
    safelist: []
} satisfies Config;