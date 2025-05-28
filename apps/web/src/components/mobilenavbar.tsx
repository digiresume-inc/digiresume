'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

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
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[90%] shadow-lg z-[1000] p-4 bg-background"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Navigation</h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <a href="/" className="">
                Home
              </a>
              <a href="/about" className="">
                About
              </a>
              <a href="/contact" className="">
                Contact
              </a>
            </nav>
          </motion.aside>
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
