import {
    type Action,
    type ThunkAction,
    combineSlices,
    configureStore,
} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "@appModules/auth"
import { editorSlice } from "@appModules/editor"

const rootReducer = combineSlices(authSlice, editorSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    })
    setupListeners(store.dispatch)
    return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]

export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
