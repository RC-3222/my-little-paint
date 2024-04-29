import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"

import "react-toastify/dist/ReactToastify.css"
import "./index.scss"

const container = document.getElementById("root")

if (!container)
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )

const root = createRoot(container)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
