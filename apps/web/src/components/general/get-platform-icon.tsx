import { Link2 } from "lucide-react";
import { socialIconMap } from "@/lib/utils/socials-icon-map";

type PlatformIconProps = {
  url: string;
  size?: number;
  className?: string;
};

export function PlatformIcon({ url, size = 18, className }: PlatformIconProps) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    const platform = Object.keys(socialIconMap).find((key) =>
      host.includes(key.toLowerCase())
    );
    const Icon = socialIconMap[platform || ""];

    if (!Icon) return <Link2 size={size} className={className} />;
    return <Icon size={size} className={className} />;
  } catch {
    return <Link2 size={size} className={className} />;
  }
}
