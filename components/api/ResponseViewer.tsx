interface ResponseViewerProps {
  response: string | null;
  error: string | null;
  loading: boolean;
  className?: string;
}

export function ResponseViewer({ response, error, loading, className = '' }: ResponseViewerProps) {
  if (loading) {
    return (
      <div className={`bg-zinc-900 border border-zinc-700 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 text-zinc-400">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm">Executing request...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-950/30 border border-red-500/30 rounded-lg p-4 ${className}`}>
        <div className="text-red-400 text-sm font-medium mb-1">Error</div>
        <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap overflow-x-auto">{error}</pre>
      </div>
    );
  }

  if (!response) {
    return (
      <div className={`bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 ${className}`}>
        <p className="text-zinc-500 text-sm text-center">
          Click "Execute" to see the response
        </p>
      </div>
    );
  }

  // Try to pretty-print JSON
  let displayContent = response;
  try {
    const parsed = JSON.parse(response);
    displayContent = JSON.stringify(parsed, null, 2);
  } catch {
    // Not JSON, show as-is
  }

  return (
    <div className={`bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <span className="text-xs text-zinc-400 font-medium">Response</span>
        <button
          onClick={() => navigator.clipboard.writeText(displayContent)}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap">
        {displayContent}
      </pre>
    </div>
  );
}
