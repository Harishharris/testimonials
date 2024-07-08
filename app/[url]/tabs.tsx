'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

export default function Tabs({ currentTab, setCurrentTab }: Props) {
  const tabs = ['all', 'text', 'video', 'liked'];
  const withColors = [];

  return (
    <div className="w-[30%]">
      <div className="flex gap-2 flex-col">
        {tabs.map((tab) => (
          <div
            className={cn(
              'text-xl px-2 pl-4 py-1 rounded-md cursor-pointer',
              currentTab === tab && 'bg-gray-800',
              currentTab !== tab && 'hover:bg-gray-700 transition'
            )}
            onClick={() => setCurrentTab(tab)}
          >
            <div className="flex gap-2 items-center">
              {/* TODO: add colors to the balls here */}
              <div className="h-[3px] w-[3px] bg-white rounded-full "></div>
              {tab[0].toUpperCase() + tab.substring(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
