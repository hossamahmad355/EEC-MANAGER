import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Layers,
  MapPin,
  Network,
  Server,
  Users,
  Bell,
  BarChart3,
  ClipboardCheck,
  Box,
  Settings,
  ChevronDown,
  X,
} from 'lucide-react';
import { NavSectionId } from '../types/dashboard';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setActivePage } from '../store/dashboardSlice';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  id: NavSectionId;
  label: string;
  icon: React.FC<{ className?: string }>;
  hasSubmenu?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
  { id: 'projects', label: 'إدارة المشاريع', icon: Layers },
  { id: 'sites', label: 'إدارة المواقع', icon: MapPin },
  { id: 'network', label: 'البنية التحتية للشبكة', icon: Network, hasSubmenu: true },
  { id: 'servers', label: 'الخوادم والأنظمة', icon: Server },
  { id: 'users', label: 'المستخدمون والصلاحيات', icon: Users },
  { id: 'alerts', label: 'المراقبة والتنبيهات', icon: Bell },
  { id: 'reports', label: 'التقارير والتحليل', icon: BarChart3 },
  { id: 'requests', label: 'إدارة الطلبات', icon: ClipboardCheck },
  { id: 'assets', label: 'إدارة الأصول', icon: Box },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.dashboard.activePage);
  const [networkExpanded, setNetworkExpanded] = useState(false);

  const handleSelect = (id: NavSectionId) => {
    dispatch(setActivePage(id));
    if (id === 'network') {
      setNetworkExpanded((prev) => !prev);
    }
    onCloseMobile();
  };

  const renderNavContent = () => (
    <div className="flex flex-col h-full pt-7 pb-5 px-3 text-white select-none">
      <nav className="flex-1 space-y-1.5" aria-label="القائمة الرئيسية">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-right transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'text-white font-extrabold shadow-[0_4px_15px_rgba(37,99,235,0.55)]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10 font-bold'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarPill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#1d6bf3] via-[#185adb] to-[#0f46b6] border border-blue-300/35"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-white scale-105' : 'text-blue-200 group-hover:text-white'
                    }`}
                  />
                  <span className="text-[14px] leading-snug truncate">{item.label}</span>
                </div>

                {item.hasSubmenu && (
                  <ChevronDown
                    className={`relative z-10 w-3.5 h-3.5 text-blue-200 transition-transform duration-200 shrink-0 ${
                      networkExpanded ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Optional expandable quick-links under Network Infrastructure */}
              <AnimatePresence>
                {item.hasSubmenu && networkExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pr-8 pl-2 pt-1 space-y-1 text-xs text-blue-200/90"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(setActivePage('network'));
                        onCloseMobile();
                      }}
                      className="w-full text-right py-1 px-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                      • نقاط الاتصال والمفاتيح (Switches)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(setActivePage('network'));
                        onCloseMobile();
                      }}
                      className="w-full text-right py-1 px-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                    >
                      • الموجهات وجدار الحماية (Firewall)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Right Curved Navy Sidebar (Matches Image Right Sidebar) */}
      <aside className="hidden lg:block w-[205px] xl:w-[218px] shrink-0 relative z-20 -mt-7">
        <div className="sticky top-0 min-h-[calc(100vh-76px)] h-full rounded-tr-[54px] bg-gradient-to-b from-[#07234b] via-[#051b3b] to-[#031229] dark:from-[#061836] dark:via-[#041126] dark:to-[#020b1a] shadow-[-6px_0_24px_rgba(3,18,41,0.28)] border-l border-blue-400/15">
          {renderNavContent()}
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative mr-0 ml-auto w-72 max-w-[82vw] h-full bg-gradient-to-b from-[#07234b] via-[#051b3b] to-[#031229] shadow-2xl z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-white/10 text-white">
                <span className="font-extrabold text-sm">القائمة الرئيسية</span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-blue-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">{renderNavContent()}</div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
