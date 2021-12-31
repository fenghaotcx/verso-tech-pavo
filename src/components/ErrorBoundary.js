import { Component } from "react"


class ErrorBoundary extends Component {
  state = { error: undefined, hasError: false }
  static getDerivedStateFromError = () => ({ hasError: true })

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    this.props.handleError?.(error, errorInfo)
  }

  render() {
    const { fallback, children } = this.props
    const { error } = this.state
    return error ? fallback?.(error)||null : children
  }
}

export default ErrorBoundary
