import MarkdownParser from "@/components/general/markdownparser";
import React from "react";

/**
 * TimelineItem represents a timeline entry with type, title, description, and dates.
 */
type TimelineItem = {
  type: "education" | "experience" | "startup";
  title: string;
  description: string;
  start: string;
  end?: string;
};

/**
 * Icon mapping for timeline types.
 */
const iconMap = {
  education: "🎓",
  experience: "💼",
  startup: "🚀",
};

/**
 * Timeline component rendering educational, experience, and startup milestones.
 */
const Timeline = ({ profile }: { profile: any }) => {
  const buildTimeline = (profile: any) => {
    const timeline: TimelineItem[] = [];

    // Education
    if (profile.education) {
      timeline.push({
        type: "education",
        title: profile.education.branch,
        description: `Studying at ${profile.education.university} with a grade of ${profile.education.grade}.`,
        start: profile.education.start_date,
        end: profile.education.end_date,
      });
    }

    // Experience
    profile.experience?.forEach((exp: any) => {
      exp.roles?.forEach((role: any) => {
        timeline.push({
          type: "experience",
          title: role.headline,
          description: `${role.location_type} at ${exp.company}`,
          start: role.start_date,
          end: role.currently_working ? undefined : role.end_date,
        });
      });
    });

    // Startups
    profile.startups?.forEach((startup: any) => {
      timeline.push({
        type: "startup",
        title: startup.name,
        description: startup.description,
        start: startup.created_at,
      });
    });

    return timeline.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  };

  const timelineItems = buildTimeline(profile);

  const formatMonthShortYear = (input: string) => {
    if (!input) return "";
    const [month, year] = input.split("/");
    if (!month || !year) return "";
    const date = new Date(`${year}-${month}-01`);
    const shortMonth = date.toLocaleString("en-US", { month: "short" });
    const shortYear = year.slice(-2);
    return `${shortMonth} ${shortYear}`;
  };

  return (
    <div className="scroll-container relative border-s w-[90%] mx-auto" role="list" aria-label="User Timeline">
      <ol className="scroll-content">
        {timelineItems.map((item, index) => (
          <li className="mb-6 ms-4" key={index} role="listitem">
            <div
              className="absolute w-3 h-3 bg-primary border border-foreground rounded-full mt-1.5 -start-1.5"
              aria-hidden="true"
            ></div>
            {item.type !== "startup" && (
              <time
                className="mb-1 text-sm font-normal leading-none text-foreground/70"
                dateTime={item.start}
              >
                {formatMonthShortYear(item.start)}
                {item.end ? ` - ${formatMonthShortYear(item.end)}` : " - Present"}
              </time>
            )}
            <h3 className="inline-flex font-semibold text-foreground">
              <span aria-hidden="true">{iconMap[item.type]}</span>
              <span className="ml-1">{item.title}</span>
            </h3>
            <span className="mb-4 text-sm font-normal text-foreground/70">
              <MarkdownParser text={item.description} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
