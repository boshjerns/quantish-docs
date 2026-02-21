'use client';

import { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ApiKeyInput({ value, onChange, className = '' }: ApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('quantish-api-key');
    if (stored && !value) {
      onChange(stored);
    }
  }, []);

  // Save to localStorage when value changes
  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (newValue) {
      localStorage.setItem('quantish-api-key', newValue);
    } else {
      localStorage.removeItem('quantish-api-key');
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm text-zinc-400 shrink-0">API Key:</label>
      <div className="relative flex-1">
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter your API key"
          className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
        >
          {showKey ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
