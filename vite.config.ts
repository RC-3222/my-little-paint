import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@appModules": path.resolve(__dirname, "./src/modules"),
            "@appShared": path.resolve(__dirname, "./src/shared"),
            "@appStore": path.resolve(__dirname, "./src/store"),
            "@appFirebase": path.resolve(__dirname, "./src/firebase"),
        },
    },
    plugins: [react()],
    server: {
        open: true,
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests",
        mockReset: true,
    },
})
