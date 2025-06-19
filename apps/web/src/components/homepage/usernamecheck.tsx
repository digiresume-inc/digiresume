'use client';
import React, { useState, useCallback } from 'react';
import { MoveRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import supabase from '@/supabase/supabase';
import { cn } from '@dr/ui/lib/utils';
import Loader from '../general/loader';

const UsernameCheck = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const checkUsername = async (username: string) => {
    if (!username) return;
    setUsernameLoading(true);

    const { data } = await supabase.from('profiles').select('username').eq('username', username);

    setUsernameAvailable(data?.length === 0);
    setUsernameLoading(false);
    setIsTyping(false);
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedUpdateField = useCallback(debounce(checkUsername, 800), []);

  const handleChange = (value: string) => {
    setUsernameCheck(value);
    setIsTyping(true);
    debouncedUpdateField(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[95%]">
      <div className="mb-2 flex items-center w-full max-w-lg bg-muted rounded-full border border-primary/20 p-0.5 lg:p-1">
        <span className="pl-3 lg:pl-4 font-medium text-sm lg:text-lg text-foreground">
          digiresu.me<span className="mx-1">/</span>
        </span>
        <input
          type="text"
          placeholder="username"
          autoCapitalize='off'
          value={usernameCheck}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(
            'flex-1 border-none outline-none py-1 lg:py-2 bg-transparent text-sm lg:text-lg w-[90%] transition-colors duration-300',
            {
              'text-green-500': !isTyping && usernameAvailable && usernameCheck,
              'text-red-500': !isTyping && !usernameAvailable && usernameCheck,
              'text-foreground': isTyping || !usernameCheck,
            }
          )}
        />

        <a
          style={{
            cursor: usernameAvailable && usernameCheck && !usernameLoading ? 'pointer' : 'default',
          }}
          className={`border group/home-input aria-disabled:opacity-50 bg-primary rounded-full p-2 lg:p-3 transition-all ease-out duration-200`}
          href={
            usernameAvailable && usernameCheck && !usernameLoading
              ? `/signin?username=${usernameCheck}`
              : undefined
          }
          aria-disabled={!usernameCheck || !usernameAvailable}
        >
          {usernameLoading && usernameCheck ? (
            <Loader className="text-primary-foreground w-5 h-5" />
          ) : (
            <MoveRight
              aria-disabled={!usernameCheck || !usernameAvailable}
              className="text-primary-foreground aria-disabled:group-hover/home-input:cursor-not-allowed aria-disabled:group-hover/home-input:translate-x-0 group-hover/home-input:translate-x-0.5 transition-all duration-200 ease-out"
              size={20}
            />
          )}
        </a>
      </div>
      <div
        className={cn(
          'px-3 py-2',
          'bg-[linear-gradient(to_right,transparent,var(--text-background),transparent)]'
        )}
      >
        <AnimatePresence>
          {usernameAvailable && !isTyping && usernameCheck ? (
            <motion.p
              className="text-green-500 text-sm lg:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Cheers, username available. 🤩
            </motion.p>
          ) : !usernameAvailable && !isTyping && usernameCheck ? (
            <motion.p
              className="text-red-500 text-sm lg:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Sorry, username already taken. 😔
            </motion.p>
          ) : (
            <motion.p
              className="text-foreground/70 text-xs lg:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Good usernames vanish. Be quicker.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UsernameCheck;
