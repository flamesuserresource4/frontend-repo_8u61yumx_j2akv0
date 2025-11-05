import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer({
  mode,
  timeLeft,
  isRunning,
  onStartPause,
  onReset,
  onSkip,
}) {
  const isWork = mode === 'work';
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isWork
              ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
          }`}
        >
          {isWork ? 'Focus' : 'Break'}
        </span>
      </div>

      <div className="text-6xl font-bold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-100">
        {formatTime(timeLeft)}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onStartPause}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
            isWork
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          onClick={onSkip}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <SkipForward className="h-4 w-4" />
          Skip
        </button>
      </div>
    </div>
  );
}
