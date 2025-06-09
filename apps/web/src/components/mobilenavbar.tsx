'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { blurFade } from '@lf/utils';

export default function SlideInNavbar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={blurFade}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-full z-[1000] pt-20 pb-4 bg-background pl-12 pr-8"
          >
            <nav className="flex flex-col divide-y-2 divide-muted font-medium">
              <a href="/" className="py-3">
                Home
              </a>
              <a href="/about" className="py-3">
                About
              </a>
              <a href="/contact" className="py-3">
                Contact
              </a>
            </nav>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}
    </div>
  );
}
