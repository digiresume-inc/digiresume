"use client";
import React from 'react';
import { generateResumeDoc } from '@/lib/utils/resume';
import { Packer } from 'docx';
import { Download } from 'lucide-react';

const ResumeDownload = ({data, profile}: {data: any; profile: any}) => {
  return (
    <span
      onClick={async () => {
        const doc = generateResumeDoc(data);
        const blob = await Packer.toBlob(doc);

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profile.full_name.replace(/\s+/g, '_')}_Resume.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // cleanup
        URL.revokeObjectURL(url); // free memory
      }}
      className="cursor-pointer text-black text-xs flex items-center justify-center border border-black/30 gap-2 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors mt-2"
    >
      download <Download size={16} strokeWidth={1.5} />
    </span>
  );
};

export default ResumeDownload;
