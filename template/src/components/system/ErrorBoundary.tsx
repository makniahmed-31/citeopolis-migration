import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children?: ReactNode;
  error?: Error | null;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * React error boundary — replaces Next.js error.ts convention.
 * Can be used as a wrapper component or as a route errorComponent.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: props.error ?? null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    const error = this.state.error ?? this.props.error;

    if (error) {
      return (
        <div className={styles.wrapper} role="alert">
          <h1 className={styles.title}>Une erreur est survenue</h1>
          <p className={styles.message}>
            {error.message || "Veuillez réessayer ultérieurement."}
          </p>
          <button
            className={styles.retry}
            onClick={() => this.setState({ error: null })}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
