import { DrawingArea } from "../drawing-area"

export const EditorLayout = () => {
    return (
        <>
            <header>
                <h2>Editor</h2>
            </header>
            <main style={{ backgroundColor: "red", padding: "10px" }}>
                <DrawingArea />
            </main>
        </>
    )
}
