import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';

// Decorative mock "meeting window" used on the landing hero.
const tiles = [
  { initials: 'AK', from: '#8b5cf6', to: '#6d28d9', label: 'You' },
  { initials: 'JS', from: '#22d3ee', to: '#0ea5e9', label: 'Jordan' },
  { initials: 'MR', from: '#e879f9', to: '#c026d3', label: 'Maya' },
  { initials: 'TP', from: '#f59e0b', to: '#ea580c', label: 'Theo' },
];

const ctrl = (bg) => ({
  width: 42,
  height: 42,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  background: bg,
  color: '#fff',
});

export default function HeroArt() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 540,
        background: 'rgba(20,20,31,0.7)',
        border: '1px solid var(--border)',
        borderRadius: 22,
        padding: 16,
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-lg), var(--glow)',
        animation: 'fadeUp 0.8s ease both',
      }}
    >
      {/* window chrome */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 14, paddingLeft: 4 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: 12 }}>
          meetly.app / a3f-92k-x7
        </span>
      </div>

      {/* video grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map((t) => (
          <div
            key={t.initials}
            style={{
              position: 'relative',
              aspectRatio: '16 / 10',
              borderRadius: 14,
              background: `linear-gradient(135deg, ${t.from}22, ${t.to}33)`,
              border: '1px solid var(--border)',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
              }}
            >
              {t.initials}
            </div>
            <span
              style={{
                position: 'absolute',
                left: 8,
                bottom: 8,
                fontSize: 11,
                color: '#fff',
                background: 'rgba(0,0,0,0.45)',
                padding: '2px 8px',
                borderRadius: 8,
              }}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>

      {/* control bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
        <div style={ctrl('rgba(255,255,255,0.08)')}><MicIcon fontSize="small" /></div>
        <div style={ctrl('rgba(255,255,255,0.08)')}><VideocamIcon fontSize="small" /></div>
        <div style={ctrl('rgba(255,255,255,0.08)')}><ScreenShareIcon fontSize="small" /></div>
        <div style={ctrl('linear-gradient(135deg,#ef4444,#b91c1c)')}><CallEndIcon fontSize="small" /></div>
      </div>
    </div>
  );
}
