'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { SiLinkedin } from 'react-icons/si';
import Image from 'next/image';
import { blurFade, extractTextFromPDF, processLinkedinData } from '@lf/utils';
import { FileWarning, Loader2 } from 'lucide-react';
import { Input } from '@lf/ui/components/base/input';
import { updateLinkedinData } from '@/app/onboarding/action';
import { ToastSuccess } from '@/components/general/toast';
import { useRouter } from 'next/navigation';

const LinkedinImport = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [finalOutput, setFinalOutput] = useState<any>(null);
  const [error, setError] = useState('');
  const loadingMessages = ['Processing... ', 'Analyzing...  ', 'Structuring...'];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select PDF File');
      return;
    }

    setLoading(true);
    setError('');
    setFinalOutput('');

    try {
      const extractedText = await extractTextFromPDF(file);
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: extractedText,
        }),
      });
      const json = await apiResponse.json();
      const finalOutput = json.data['choices'][0]['message']['content'];
      const cleaned = finalOutput.replace(/```json\s*|\s*```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const finalData = processLinkedinData(parsed);
      setFinalOutput(finalData);

      console.log(finalData);

      const result = await updateLinkedinData(finalData);
      if (!result.success) {
        setError(result.message);
        return;
      }

      ToastSuccess({ message: 'Profile updated successfully.' });
      setModal('none');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {modal && (
        <div
          className="px-5 z-[10001] fixed h-full w-full flex items-center justify-center top-0 left-0 pointer-events-none bg-black/20 backdrop-blur"
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            className="select-none relative z-50 w-full border border-foreground/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] rounded-lg md:w-full bg-background sm:align-middle sm:w-full sm:max-w-lg p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b">
              <h2 id="radix-:r9q:" className="text-base lm:eading-none font-normal">
                <span className="break-words flex items-center gap-2">
                  Linkedin Import <SiLinkedin />
                </span>
              </h2>
            </div>
            <motion.div
              variants={blurFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="py-4 px-5 overflow-hidden"
            >
              {finalOutput ? (
                <div className="space-y-4">
                  <p className="text-sm">Review your info</p>
                  {finalOutput && (
                    <div className="p-4 bg-muted rounded-xl">
                      <h2 className="text-lg font-semibold">{finalOutput.full_name}</h2>
                      <p className="text-sm text-muted-foreground">{finalOutput.headline}</p>

                      <div className="mt-2">
                        <h3 className="font-medium text-sm">Skills:</h3>
                        <ul className="list-disc list-inside text-xs">
                          {finalOutput.skills?.map((skill: any, i: number) => (
                            <li key={i}>
                              {skill.label} ({skill.category})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <span className="border border-destructive w-full px-2.5 py-1.5 h-fit bg-destructive/80 flex items-center rounded-md text-xs gap-2">
                      <FileWarning size={18} strokeWidth={1} /> {error}
                    </span>
                  )}
                  <p className="text-sm">Download your PDF from Linkedin</p>
                  <Image
                    height={384}
                    width={1000}
                    className="w-full object-cover h-48 rounded-lg border"
                    src="/linkedinpdf.png"
                    alt="Linkedin Import Guide"
                  />
                  {loading ? (
                    <span className="flex items-center w-full justify-center opacity-70 gap-2 bg-secondary rounded-full py-2">
                      <Loader2 size={18} className="animate-spin" />

                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={loadingMessages[currentMessageIndex]}
                          variants={blurFade}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3 }}
                        >
                          {loadingMessages[currentMessageIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  ) : (
                    <span className="text-sm flex flex-col gap-2">
                      <span>Upload PDF</span>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="block inset-2 file:mr-2 w-full text-xs file:text-xs file:bg-secondary file:px-2 file:py-0.5 file:rounded-full file:cursor-pointer"
                        disabled={loading}
                      />
                    </span>
                  )}
                </div>
              )}
            </motion.div>
            <div className="w-full h-px" />
            <button
              disabled={loading}
              onClick={() => setModal('none')}
              className="cursor-pointer disabled:cursor-not-allowed absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LinkedinImport;
