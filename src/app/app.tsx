import { Provider } from "react-redux"
import { AppRouterProvider } from "../router"
import { store } from "../store/store"

export const App = () => (
    <Provider store={store}>
        <AppRouterProvider />
    </Provider>
)
