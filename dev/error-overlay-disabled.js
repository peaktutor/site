// Disable error overlay
if (typeof window !== 'undefined') {
  window.__NEXT_DATA__.props = window.__NEXT_DATA__.props || {};
  window.__NEXT_DATA__.props.pageProps = window.__NEXT_DATA__.props.pageProps || {};
  
  // Override Next.js error reporter
  const originalErrorReporter = window.__NEXT_REACT_ROOT__?.error;
  if (originalErrorReporter) {
    window.__NEXT_REACT_ROOT__.error = () => {};
  }
  
  // Disable React error overlay
  if (window.__REACT_ERROR_OVERLAY__) {
    window.__REACT_ERROR_OVERLAY__.handleRuntimeError = () => {};
    window.__REACT_ERROR_OVERLAY__.startReportingRuntimeErrors = () => {};
    window.__REACT_ERROR_OVERLAY__.dismissRuntimeErrors = () => {};
  }
}
