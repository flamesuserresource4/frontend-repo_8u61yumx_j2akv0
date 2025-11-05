import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPanel({ workMinutes, breakMinutes, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [wm, setWm] = useState(workMinutes);
  const [bm, setBm] = useState(breakMinutes);

  useEffect(() => {
    setWm(workMinutes);
    setBm(breakMinutes);
  }, [workMinutes, breakMinutes]);

  const apply = () => {
    const w = Math.max(1, Math.min(120, Number(wm) || 1));
    const b = Math.max(1, Math.min(60, Number(bm) || 1));
    onUpdate({ work: w, break: b });
    setOpen(false);
  };

  const setPreset = (w, b) => {
    setWm(w);
    setBm(b);
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/70 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:bg-zinc-900"
      >
        <Settings className="h-4 w-4" />
        Timer Settings
      </button>

      {open && (
        <div className="absolute z-10 mt-3 w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">Focus (min)</label>
              <input
                type="number"
                min={1}
                max={120}
                value={wm}
                onChange={(e) => setWm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">Break (min)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={bm}
                onChange={(e) => setBm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button onClick={() => setPreset(25, 5)} className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800">25/5</button>
            <button onClick={() => setPreset(50, 10)} className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800">50/10</button>
            <button onClick={() => setPreset(1, 1)} className="rounded-lg border border-zinc-200 px-3 py-2 text-xs dark:border-zinc-800">1/1 (demo)</button>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
            <button onClick={apply} className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
