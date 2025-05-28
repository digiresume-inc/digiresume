import { Eye } from 'lucide-react';
import React from 'react';

const PreviewButton = ({
  setPreview,
}: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setPreview(true)}
      className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center  rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
    >
      <Eye strokeWidth={1} className="mr-1" />
      <p className="font-semibold text-base">Preview</p>
    </div>
  );
};

export default PreviewButton;
