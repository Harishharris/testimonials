'use client';

import CurrentTabSection from './tabs-section';
import Tabs from './tabs';
import { useState } from 'react';

export default function MainPage() {
  const [currentTab, setCurrentTab] = useState('all');
  const tabs = ['all', 'text', 'video', 'liked'];
  const withColors = [];

  return (
    <div className="max-w-[80%] m-auto mt-8">
      <div className="mb-2 font-semibold">INBOX</div>
      <div className="flex gap-8">
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <CurrentTabSection currentTab={currentTab} />
      </div>
    </div>
  );
}
