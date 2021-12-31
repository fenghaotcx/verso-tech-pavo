import { Suspense } from "react"
import ErrorBoundary from "./ErrorBoundary"
// import Card from "./Card"

const Boundary = ({ children, fallback }) => {
  const renderError = (error) => (
    <div title="Error">{error?.message}</div>
  )

  return (
    <ErrorBoundary fallback={renderError}>
      <Suspense fallback={fallback||null}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default Boundary

/* utils */
export const bound = (children, fallback) => (
  <Boundary fallback={fallback}>{children}</Boundary>
)
