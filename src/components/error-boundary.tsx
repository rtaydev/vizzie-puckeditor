"use client";

import { Component, ReactNode, ErrorInfo } from "react";
import { cn } from "../utils/cn";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return <DefaultFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      role="alert"
      className={cn(
        "p-6 bg-red-500 text-white rounded-md flex flex-col gap-4 items-center justify-center"
      )}
    >
      <p>Something went wrong when rendering</p>
      <pre className="text-sm bg-red-600 p-2 rounded max-w-full overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={reset}
        className="px-4 py-2 bg-white text-red-500 rounded-md hover:bg-gray-100 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

