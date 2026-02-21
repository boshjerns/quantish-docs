interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  className?: string;
}

const methodStyles: Record<string, string> = {
  GET: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function MethodBadge({ method, className = '' }: MethodBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold border ${methodStyles[method]} ${className}`}
    >
      {method}
    </span>
  );
}
