import { Provider } from "react-redux"
import { AppRouterProvider } from "../router"
import { store } from "../store/store"
import { ToastContainer } from "react-toastify"
import { ErrorBoundary } from "@appShared/components/error-boundary"

export const App = () => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <AppRouterProvider />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </ErrorBoundary>
    )
}
