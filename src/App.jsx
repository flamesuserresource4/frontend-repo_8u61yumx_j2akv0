import React, { useEffect, useMemo, useRef, useState } from 'react';
import HeroSpline from './components/HeroSpline.jsx';
import PomodoroTimer from './components/PomodoroTimer.jsx';
import FlowerGrowth from './components/FlowerGrowth.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';

export default function App() {
  // Settings in minutes
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [mode, setMode] = useState('work'); // 'work' | 'break'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);

  const currentDuration = useMemo(() => (mode === 'work' ? workMinutes * 60 : breakMinutes * 60), [mode, workMinutes, breakMinutes]);

  // Sync timeLeft when settings change and timer is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(mode === 'work' ? workMinutes * 60 : breakMinutes * 60);
    }
  }, [workMinutes, breakMinutes, mode, isRunning]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch modes
          if (mode === 'work') {
            setCompletedFocusSessions((c) => c + 1);
            setMode('break');
            return breakMinutes * 60;
          } else {
            setMode('work');
            return workMinutes * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, mode, workMinutes, breakMinutes]);

  const handleStartPause = () => setIsRunning((v) => !v);
  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(workMinutes * 60);
  };
  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setCompletedFocusSessions((c) => c + 1);
      setMode('break');
      setTimeLeft(breakMinutes * 60);
    } else {
      setMode('work');
      setTimeLeft(workMinutes * 60);
    }
  };

  const progress = 1 - timeLeft / currentDuration; // 0..1 within current phase
  const growth = mode === 'work' ? progress : 1; // fully bloom on break

  const updateSettings = ({ work, break: brk }) => {
    setWorkMinutes(work);
    setBreakMinutes(brk);
    setIsRunning(false);
    setMode('work');
    setTimeLeft(work * 60);
  };

  return (
    <div className="min-h-screen bg-rose-50/50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <HeroSpline />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:grid-cols-2">
        <div className="flex flex-col items-center gap-6">
          <PomodoroTimer
            mode={mode}
            timeLeft={timeLeft}
            isRunning={isRunning}
            onStartPause={handleStartPause}
            onReset={handleReset}
            onSkip={handleSkip}
          />

          <SettingsPanel
            workMinutes={workMinutes}
            breakMinutes={breakMinutes}
            onUpdate={updateSettings}
          />

          <div className="w-full rounded-xl border border-zinc-200 bg-white/70 p-4 text-center text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
            Completed focus sessions: {completedFocusSessions}
          </div>
        </div>

        <div className="flex items-start justify-center">
          <FlowerGrowth growth={growth} />
        </div>
      </main>
    </div>
  );
}
