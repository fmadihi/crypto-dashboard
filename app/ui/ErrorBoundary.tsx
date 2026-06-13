"use client";
import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        this.props.fallback ?? (
          <div className="p-6 text-center text-red-500">
            <p className="font-semibold">Something went wrong.</p>
            <button className="mt-2 text-sm underline" onClick={() => this.setState({ hasError: false })}>
              Retry
            </button>
          </div>
        )
      );
    return this.props.children;
  }
}
