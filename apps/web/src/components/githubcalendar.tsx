'use client';

import { useEffect } from 'react';

export default function GitHubCalendarClient({ username }: { username: string }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore – ignore TS error for global function
      GitHubCalendar('.calendar', username, { responsive: true });
    };
    document.body.appendChild(script);
  }, [username]);

  return <div className="calendar" />;
}
