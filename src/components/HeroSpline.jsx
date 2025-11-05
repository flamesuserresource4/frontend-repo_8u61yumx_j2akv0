import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Pomodoro Flower
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300">
              Focus in short bursts. Watch your flower grow with every minute of deep work.
            </p>
          </div>
          <div className="relative h-[360px] w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
            <Spline
              scene="https://prod.spline.design/Tu-wEVxfDuICpwJI/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40 dark:from-black/40 dark:to-black/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
