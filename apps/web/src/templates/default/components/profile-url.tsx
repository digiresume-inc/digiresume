'use client';
import React from 'react';
import { Link2 } from 'lucide-react';
import { hexToHSL } from '@dr/utils';

const ProfileUrl = ({ t, profile }: { t: any; profile: any }) => {
  return (
    <>
      {profile.profile_link?.url && profile.profile_link.text && (
        <a
          href={profile.profile_link?.url}
          target="_blank"
          style={
            {
              '--inactive-border-color': hexToHSL(t?.primary!, 0.7),
              '--inactive-text-color': hexToHSL(t?.foreground!, 0.7),
              '--active-border-color': t?.primary,
              '--active-text-color': t?.foreground,
            } as React.CSSProperties
          }
          className="cursor-pointer font-medium flex !border-[color:var(--inactive-border-color)] hover:!border-[var(--active-border-color)] !text-[color:var(--inactive-text-color)] hover:!text-[var(--active-text-color)] items-center gap-1 text-sm lg:text-base border-b-2 border-dashed transition"
        >
          <Link2 strokeWidth={1} size={16} />
          {profile.profile_link.text}
        </a>
      )}
    </>
  );
};

export default ProfileUrl;
