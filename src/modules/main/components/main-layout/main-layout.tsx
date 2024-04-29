import { AppTitle } from "../app-title"
import { NavPanel } from "../nav-panel"

export const MainLayout = () => {
    return (
        <>
            <header>
                <AppTitle />
                <NavPanel />
            </header>
            <main>
                <div>Main</div>
            </main>
        </>
    )
}
