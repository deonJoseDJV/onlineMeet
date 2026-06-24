import React from 'react';

/**
 * Meetly brand logo — gradient "video" mark + wordmark.
 * Props: size (mark px), withWordmark (bool), onClick.
 */
export default function Logo({ size = 34, withWordmark = true, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="Meetly logo">
        <defs>
          <linearGradient id="meetlyMark" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="0.55" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#meetlyMark)" />
        <rect x="14" y="22" width="24" height="20" rx="6" fill="#fff" />
        <path d="M42 30 L52 24 V40 L42 34 Z" fill="#fff" />
      </svg>
      {withWordmark && (
        <span
          style={{
            fontSize: size * 0.62,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Meet<span style={{ color: 'var(--brand-400)' }}>ly</span>
        </span>
      )}
    </div>
  );
}
