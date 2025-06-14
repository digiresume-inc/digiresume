'use client';
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@dr/ui/components/base/avatar';
import type { User } from '@supabase/supabase-js';
import { Popover, PopoverContent, PopoverTrigger } from '@dr/ui/components/base/popover';
import { Button } from '@dr/ui/components/base/button';
import { CircleFadingArrowUp, HelpCircle, LogOut } from 'lucide-react';

const Navbar = ({
  user,
  setLogoutModel,
}: {
  user: User;
  setLogoutModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="z-[49] w-full h-fit px-6 py-2 sticky top-0 left-0 max-w-5xl rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm border bg-secondary/10">
      <div className="flex items-center justify-between w-full">
        {/* <h1 className="text-xl lg:text-2xl font-extrabold">
          digiresu.<span className="text-primary">me</span>
        </h1> */}
        <img src='/word-mark.png' className='h-10 w-10 object-cover' />
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage referrerPolicy="no-referrer" src={user?.user_metadata.avatar_url} />
              <AvatarFallback className="font-bold text-sm">DR</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-fit h-fit max-w-60 mr-1 lg:mr-15 mt-4 relative z-[1000] flex flex-col gap-3">
            <div className="absolute z-0 -top-2 left-[78%] lg:left-[63%] -translate-x-1/2 w-4 h-4 rotate-45 border-t border-l bg-popover" />
            <span title={user.email} className="truncate max-w-[95%] text-sm">
              {user.email}
            </span>
            <div className="flex flex-col items-center justify-center divide-y-2 gap-2">
              <div className="flex text-sm gap-1 items-center w-full pb-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage referrerPolicy="no-referrer" src={user?.user_metadata.avatar_url} />
                  <AvatarFallback className="font-bold text-sm">DR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <p className="text-sm font-medium text-foreground">Personal</p>
                  <p className="text-xs text-foreground/70">Free plan</p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-1 w-full pb-2">
                <span className="font-medium cursor-pointer bg-transparent hover:bg-background rounded-md px-2 py-1 flex items-center justify-between gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 w-full">
                  Upgrade plan <CircleFadingArrowUp size={16} />
                </span>
                <span className="font-medium cursor-pointer bg-transparent hover:bg-background rounded-md px-2 py-1 flex items-center justify-between gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 w-full">
                  Get help <HelpCircle size={16} />
                </span>
              </div>
              <span
                onClick={() => {
                  setLogoutModel(true);
                  setMenuOpen(false);
                }}
                className="font-medium cursor-pointer bg-transparent hover:bg-destructive rounded-md px-2 py-1 flex items-center justify-between gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200 w-full"
              >
                Logout <LogOut size={16} />
              </span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
