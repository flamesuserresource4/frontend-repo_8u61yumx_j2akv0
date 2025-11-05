import React from 'react';

// growth: 0..1
export default function FlowerGrowth({ growth = 0 }) {
  const clamped = Math.max(0, Math.min(1, growth));
  const stemHeight = 160 * clamped;
  const petalScale = 0.4 + clamped * 0.6; // 0.4..1
  const glowOpacity = 0.2 + clamped * 0.5; // 0.2..0.7

  return (
    <div className="relative w-full max-w-md">
      <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-rose-50 to-rose-100 p-4 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/40">
        <svg viewBox="0 0 240 300" className="h-full w-full">
          <defs>
            <radialGradient id="glow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={glowOpacity} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft glow */}
          <circle cx="120" cy={110 - (1 - clamped) * 40} r={80} fill="url(#glow)" />

          {/* Stem */}
          <g transform="translate(120, 260)">
            <rect x="-3" y={-stemHeight} width="6" height={stemHeight} rx="3" fill="#16a34a" />

            {/* Leaves */}
            <path
              d={`M -3 ${-stemHeight * 0.6} C -40 ${-stemHeight * 0.7}, -50 ${-stemHeight * 0.2}, -6 ${-stemHeight * 0.15}`}
              fill="none"
              stroke="#16a34a"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={0.8 * clamped}
            />
            <path
              d={`M 3 ${-stemHeight * 0.45} C 38 ${-stemHeight * 0.55}, 50 ${-stemHeight * 0.15}, 6 ${-stemHeight * 0.1}`}
              fill="none"
              stroke="#16a34a"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={0.8 * clamped}
            />

            {/* Flower head */}
            <g transform={`translate(0, ${-stemHeight}) scale(${petalScale})`}>
              {/* Center */}
              <circle cx="0" cy="0" r="10" fill="#7f1d1d" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" />

              {/* Petals (stylized spider lily feel) */}
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i * 36 * Math.PI) / 180;
                const x = Math.cos(angle) * 28;
                const y = Math.sin(angle) * 28;
                const cp1x = Math.cos(angle) * 18;
                const cp1y = Math.sin(angle) * 18 - 14;
                const cp2x = Math.cos(angle) * 24;
                const cp2y = Math.sin(angle) * 24 - 24;
                return (
                  <path
                    key={i}
                    d={`M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity={0.6 + clamped * 0.4}
                  />
                );
              })}

              {/* Stamen */}
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (i * 36 * Math.PI) / 180 + 0.18;
                const x = Math.cos(angle) * 36;
                const y = Math.sin(angle) * 36;
                return (
                  <g key={`s-${i}`}>
                    <line x1="0" y1="0" x2={x} y2={y} stroke="#f87171" strokeWidth="1.5" opacity={0.6 + clamped * 0.4} />
                    <circle cx={x} cy={y} r="3" fill="#ef4444" opacity={0.7 + clamped * 0.3} />
                  </g>
                );
              })}
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 dark:from-black/30 dark:to-black/10" />
      </div>
      <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Growth: {(clamped * 100).toFixed(0)}%
      </p>
    </div>
  );
}
