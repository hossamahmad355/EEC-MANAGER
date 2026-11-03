/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppSelector } from './store/store';
import { HeaderBanner } from './components/HeaderBanner';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './components/DashboardHome';
import { SubPages } from './components/SubPages';

export default function App() {
  const { activePage, theme } = useAppSelector((state) => state.dashboard);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col bg-[#e5eef7] dark:bg-[#071120] text-[#0c2340] dark:text-slate-100 transition-colors duration-300"
    >
      {/* Top Panoramic Header Banner */}
      <HeaderBanner onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

      {/* Main RTL Body: Right Curved Sidebar + Left Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch max-w-[1920px] w-full mx-auto">
        {/* Right Sidebar (First child in dir="rtl" sits on the RIGHT) */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Viewport (Left of Sidebar in RTL) */}
        <main className="flex-1 min-w-0 px-3 sm:px-4 lg:px-4 py-3 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {activePage === 'dashboard' ? <DashboardHome /> : <SubPages />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
