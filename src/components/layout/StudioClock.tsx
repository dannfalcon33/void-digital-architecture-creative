'use client';

import { useEffect, useState } from 'react';
import { STUDIO_META } from '@/data/studio';

export function StudioClock() {
  const [timeString, setTimeString] = useState<string>('--:-- CET');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: STUDIO_META.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const update = () => setTimeString(`${formatter.format(new Date())} ZRH`);
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="type-mono-xs tabular-nums text-void-ink">
      {timeString}
    </span>
  );
}
