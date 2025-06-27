"use client";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Activity } from "react-github-calendar";

const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <div className="h-[159px] w-full" />,
});

function GithubCalender({ username }: { username: string }) {
  const [totalCount, setTotalCount] = useState(0);

  const processContributions = useCallback((contributions: Activity[]) => {
    setTimeout(() => {
      const total = contributions
        .map((el) => el.count)
        .reduce((acc, curr) => acc + curr, 0);

      setTotalCount(total);
    }, 0);

    return contributions.slice(200, 365);
  }, []);

  return (
    <Link
      target="_blank"
      href={`https://github.com/${username}`}
      className="w-full h-full flex items-center justify-center px-2 lg:px-0"
    >
      <GitHubCalendar
        username={username}
        transformData={processContributions}
        totalCount={totalCount}
      />
    </Link>
  );
}

export default GithubCalender;
