import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react"

type ErrorBoundaryProps = {
    children: ReactNode
}

type State = {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return <h1>Something went wrong</h1>
        }

        return this.props.children
    }
}
