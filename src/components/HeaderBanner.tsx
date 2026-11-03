import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  Moon,
  RotateCcw,
  Search,
  Sun,
  User,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  resetToDefaults,
  setActivePage,
  setSearchQuery,
  toggleAlertResolved,
  toggleTheme,
} from '../store/dashboardSlice';

interface HeaderBannerProps {
  onOpenMobileSidebar: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onOpenMobileSidebar }) => {
  const dispatch = useAppDispatch();
  const {
    theme,
    currentDateLabel,
    userRoleLabel,
    alerts,
    searchQuery,
    lastSavedAt,
  } = useAppSelector((state) => state.dashboard);

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unresolvedAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <header className="relative w-full overflow-visible select-none">
      {/* Panoramic Architectural Construction & Cranes Skyline Banner */}
      <div className="relative w-full min-h-[126px] lg:min-h-[132px] bg-gradient-to-b from-[#b4d6f7] via-[#d7ebfc] to-[#eaf3fb] dark:from-[#081528] dark:via-[#0d213d] dark:to-[#0a182e] border-b border-blue-200/70 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
        {/* Detailed SVG Construction Skyline & Tower Cranes Illustration */}
        <svg
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          viewBox="0 0 1440 150"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="skyGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#0f294a' : '#a9d1f7'} stopOpacity="0.85" />
              <stop offset="100%" stopColor={theme === 'dark' ? '#071224' : '#eef6fc'} stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="citySilhouette" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#1e3a5f' : '#8ab8e6'} stopOpacity="0.55" />
              <stop offset="100%" stopColor={theme === 'dark' ? '#0f233f' : '#b7d6f4'} stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="craneGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="buildingFacade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#1e293b' : '#334155'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#334155' : '#64748b'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#0f172a' : '#1e293b'} />
            </linearGradient>
          </defs>

          {/* Soft cloud & atmospheric rays */}
          <ellipse cx="720" cy="25" rx="460" ry="55" fill="url(#skyGlow)" />

          {/* Distant City Skyline Silhouette */}
          <g fill="url(#citySilhouette)">
            <rect x="240" y="68" width="28" height="82" />
            <rect x="272" y="82" width="24" height="68" />
            <rect x="302" y="54" width="35" height="96" />
            <rect x="342" y="74" width="26" height="76" />
            <rect x="374" y="62" width="30" height="88" />
            <rect x="410" y="85" width="42" height="65" />
            <rect x="460" y="70" width="28" height="80" />
            <rect x="495" y="88" width="38" height="62" />
            <rect x="890" y="86" width="36" height="64" />
            <rect x="932" y="68" width="30" height="82" />
            <rect x="968" y="78" width="28" height="72" />
            <rect x="1002" y="58" width="34" height="92" />
            <rect x="1042" y="76" width="26" height="74" />
            <rect x="1074" y="64" width="32" height="86" />
          </g>

          {/* LEFT CONSTRUCTION SITE: High-rise steel/concrete structures & Yellow Tower Cranes */}
          <g>
            {/* Left Tower Crane 1 (Tall Main Crane) */}
            <g stroke="url(#craneGold)" strokeWidth="2.2" fill="none">
              {/* Vertical Mast */}
              <line x1="518" y1="14" x2="518" y2="145" />
              <line x1="525" y1="14" x2="525" y2="145" />
              <path d="M518 20 L525 28 L518 36 L525 44 L518 52 L525 60 L518 68 L525 76 L518 84 L525 92 L518 100" strokeWidth="1.3" />
              {/* Horizontal Jib Boom */}
              <line x1="420" y1="22" x2="625" y2="16" strokeWidth="2.5" />
              <line x1="435" y1="16" x2="610" y2="12" strokeWidth="1.2" />
              {/* Suspension cables */}
              <line x1="521" y1="4" x2="450" y2="20" strokeWidth="1.2" />
              <line x1="521" y1="4" x2="595" y2="17" strokeWidth="1.2" />
              {/* Hook cable */}
              <line x1="585" y1="17" x2="585" y2="62" strokeWidth="1.3" strokeDasharray="2 1" />
            </g>
            <rect x="513" y="20" width="14" height="9" rx="1.5" fill="#f59e0b" />

            {/* Left Building Under Construction (Concrete Grid + Scaffolding) */}
            <g transform="translate(445, 52)">
              <rect x="0" y="0" width="68" height="98" fill="url(#buildingFacade)" opacity="0.9" />
              {/* Floor slabs */}
              <g stroke="#f8fafc" strokeWidth="1.5" opacity="0.75">
                <line x1="-3" y1="14" x2="71" y2="14" />
                <line x1="-3" y1="28" x2="71" y2="28" />
                <line x1="-3" y1="42" x2="71" y2="42" />
                <line x1="-3" y1="56" x2="71" y2="56" />
                <line x1="-3" y1="70" x2="71" y2="70" />
                <line x1="-3" y1="84" x2="71" y2="84" />
              </g>
              {/* Columns & Amber construction lights */}
              <g fill="#f59e0b" opacity="0.75">
                <rect x="8" y="4" width="10" height="8" />
                <rect x="26" y="18" width="14" height="8" />
                <rect x="46" y="32" width="12" height="8" />
                <rect x="10" y="46" width="16" height="8" />
              </g>
            </g>

            {/* Secondary Left Crane */}
            <g stroke="#d97706" strokeWidth="1.8" fill="none" opacity="0.85">
              <line x1="395" y1="36" x2="395" y2="145" />
              <line x1="400" y1="36" x2="400" y2="145" />
              <line x1="340" y1="44" x2="455" y2="38" />
              <line x1="397" y1="26" x2="355" y2="43" strokeWidth="1" />
              <line x1="397" y1="26" x2="440" y2="39" strokeWidth="1" />
            </g>
          </g>

          {/* RIGHT CONSTRUCTION SITE: High-rise structures & Yellow Tower Cranes */}
          <g>
            {/* Right Tower Crane 1 (Main Crane) */}
            <g stroke="url(#craneGold)" strokeWidth="2.4" fill="none">
              <line x1="1145" y1="8" x2="1145" y2="145" />
              <line x1="1153" y1="8" x2="1153" y2="145" />
              <path d="M1145 16 L1153 24 L1145 32 L1153 40 L1145 48 L1153 56 L1145 64 L1153 72 L1145 80" strokeWidth="1.4" />
              {/* Jib Boom */}
              <line x1="1030" y1="24" x2="1245" y2="14" strokeWidth="2.6" />
              <line x1="1149" y1="2" x2="1065" y2="22" strokeWidth="1.2" />
              <line x1="1149" y1="2" x2="1215" y2="15" strokeWidth="1.2" />
              {/* Hook */}
              <line x1="1065" y1="23" x2="1065" y2="68" strokeWidth="1.3" strokeDasharray="2 1" />
            </g>
            <rect x="1141" y="16" width="16" height="10" rx="1.5" fill="#f59e0b" />

            {/* Right Building Under Construction */}
            <g transform="translate(1090, 44)">
              <rect x="0" y="0" width="84" height="106" fill="url(#buildingFacade)" opacity="0.92" />
              <g stroke="#f8fafc" strokeWidth="1.5" opacity="0.8">
                <line x1="-4" y1="14" x2="88" y2="14" />
                <line x1="-4" y1="28" x2="88" y2="28" />
                <line x1="-4" y1="42" x2="88" y2="42" />
                <line x1="-4" y1="56" x2="88" y2="56" />
                <line x1="-4" y1="70" x2="88" y2="70" />
                <line x1="-4" y1="84" x2="88" y2="84" />
              </g>
              <g fill="#f59e0b" opacity="0.8">
                <rect x="10" y="18" width="14" height="8" />
                <rect x="34" y="4" width="18" height="8" />
                <rect x="56" y="32" width="16" height="8" />
                <rect x="16" y="46" width="20" height="8" />
                <rect x="48" y="60" width="18" height="8" />
              </g>
            </g>
          </g>
        </svg>

        {/* Top-Left Curved Dark Blue Utility Bar (Matches Image Top-Left Overlay) */}
        <div
          dir="ltr"
          className="relative lg:absolute lg:top-0 lg:left-0 z-30 flex items-center justify-between lg:justify-start gap-3 px-5 py-2.5 bg-gradient-to-r from-[#072654] via-[#0b3978] to-[#114ea1] dark:from-[#041229] dark:via-[#08224a] dark:to-[#0d336b] text-white lg:rounded-br-[38px] shadow-md border-b border-r border-blue-400/30 lg:min-w-[430px]"
        >
          {/* User Profile Selector (Left side in image) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu((prev) => !prev);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 hover:bg-white/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              title="الملف الشخصي والصلاحيات"
            >
              <ChevronDown className="w-4 h-4 text-blue-200 shrink-0" />
              <div className="w-8 h-8 rounded-full bg-white text-[#0b3978] flex items-center justify-center shadow-inner shrink-0">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span
                dir="rtl"
                className="text-sm sm:text-[15px] font-bold tracking-wide whitespace-nowrap"
              >
                {userRoleLabel}
              </span>
            </button>

            {/* Profile Quick Menu Dropdown */}
            {showProfileMenu && (
              <div
                dir="rtl"
                className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-50"
              >
                <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">المستخدم الحالي</p>
                  <p className="text-sm font-bold text-[#0b3978] dark:text-blue-400">{userRoleLabel}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    آخر حفظ تلقائي: {lastSavedAt}
                  </p>
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setActivePage('users'));
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-right px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    إدارة المستخدمين والصلاحيات
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setActivePage('drive'));
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-right px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    ملفات Google Drive والنسخ الاحتياطي
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setActivePage('settings'));
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-right px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    إعدادات النظام والحفظ التلقائي
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(resetToDefaults());
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center justify-between text-right px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <span>استعادة البيانات الافتراضية</span>
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="h-5 w-[1px] bg-white/25 mx-1 shrink-0" aria-hidden="true" />

          {/* Notification Bell Icon with Red Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfileMenu(false);
              }}
              className="relative p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="التنبيهات والإنذارات"
              title="التنبيهات والإنذارات"
            >
              <Bell className="w-5 h-5 text-white fill-white/90" />
              {unresolvedAlertsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#0b3978]" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div
                dir="rtl"
                className="absolute left-0 mt-2 w-80 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-50"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    التنبيهات النشطة ({unresolvedAlertsCount})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setActivePage('alerts'));
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    عرض الكل
                  </button>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {alerts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => dispatch(toggleAlertResolved(item.id))}
                      className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors flex items-start justify-between gap-2 ${
                        item.resolved
                          ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60 line-through'
                          : 'bg-blue-50/50 dark:bg-slate-800 border-blue-100 dark:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{item.message}</p>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                      </div>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          item.resolved ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Icon & Expandable Search Input */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowSearchInput((prev) => !prev)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="بحث سريع"
              title="بحث في المشاريع والمواقع والخدمات"
            >
              <Search className="w-5 h-5 text-white stroke-[2.4]" />
            </button>
            {showSearchInput && (
              <div dir="rtl" className="flex items-center bg-white/15 rounded-lg px-2 py-1 border border-white/25">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  placeholder="ابحث في اللوحة..."
                  className="bg-transparent text-white placeholder-blue-200 text-xs focus:outline-none w-28 sm:w-36"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => dispatch(setSearchQuery(''))}
                    className="text-blue-200 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <span className="h-5 w-[1px] bg-white/25 mx-0.5 shrink-0" aria-hidden="true" />

          {/* Google Drive Quick Access Button */}
          <button
            type="button"
            onClick={() => dispatch(setActivePage('drive'))}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold transition-colors cursor-pointer shrink-0"
            title="فتح ملفات Google Drive والنسخ الاحتياطي"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M17 6L31 6 45 30 31 30z"
              />
              <path
                fill="#1976D2"
                d="M9.875 42L16.938 30 45 30 38 42z"
              />
              <path
                fill="#4CAF50"
                d="M3 30.125L9.875 42 24 18 17 6z"
              />
            </svg>
            <span className="hidden sm:inline">Drive</span>
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer shrink-0"
            title={theme === 'dark' ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الليلي'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">فاتح</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-100" />
                <span className="hidden sm:inline">ليلي</span>
              </>
            )}
          </button>

          {/* Mobile Sidebar Hamburger Button */}
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white ml-auto"
            aria-label="فتح القائمة الجانبية"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Date Pill Card under Top-Left Bar (Matches Image: الثلاثاء، 2 نوفمبر 2026) */}
        <div
          dir="rtl"
          className="relative lg:absolute lg:top-[58px] lg:left-3 z-20 mx-4 mt-2 lg:mx-0 lg:mt-0 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-b from-white to-[#eef5fc] dark:from-slate-800 dark:to-slate-900 shadow-[0_4px_14px_rgba(11,57,120,0.12)] border border-white dark:border-slate-700/80"
        >
          <span className="text-sm sm:text-[15px] font-extrabold text-[#0b2545] dark:text-slate-100 tracking-tight whitespace-nowrap">
            {currentDateLabel}
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-[#0b3978] dark:text-blue-300">
            <Calendar className="w-4 h-4 stroke-[2.2]" />
          </div>
        </div>

        {/* Center Hero Welcome Title & Subtitle (Matches Image Center Header) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-3 pb-4 lg:pt-4 lg:pb-5 lg:pr-[240px] lg:pl-[340px]">
          <h1 className="text-2xl sm:text-3xl lg:text-[33px] font-black text-[#072448] dark:text-white tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none leading-tight">
            مرحباً بك
          </h1>
          <p className="mt-1 text-sm sm:text-base lg:text-[18px] font-extrabold text-[#0b2e59] dark:text-blue-200 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)] dark:drop-shadow-none">
            لوحة التحكم الشاملة – إدارة الشركة والمواقع والبنية التحتية
          </p>
        </div>

        {/* Top-Right Architectural Company Logo Emblem (Positioned above the Right Sidebar curve) */}
        <div className="hidden lg:flex absolute top-2.5 right-6 z-20 flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-14 text-[#07254d] dark:text-blue-300 drop-shadow-sm"
              viewBox="0 0 80 68"
              fill="currentColor"
            >
              {/* Left Tower */}
              <path d="M16 24 L28 17 L28 56 L16 56 Z" />
              <rect x="19" y="26" width="2.2" height="26" fill="#d9ecfc" className="dark:fill-slate-900" />
              <rect x="23" y="23" width="2.2" height="29" fill="#d9ecfc" className="dark:fill-slate-900" />
              {/* Center Tall Tower */}
              <path d="M31 9 L47 9 L47 56 L31 56 Z" />
              <rect x="35" y="14" width="2.5" height="38" fill="#d9ecfc" className="dark:fill-slate-900" />
              <rect x="40.5" y="14" width="2.5" height="38" fill="#d9ecfc" className="dark:fill-slate-900" />
              {/* Right Tower */}
              <path d="M50 20 L63 26 L63 56 L50 56 Z" />
              <rect x="53.5" y="27" width="2.2" height="25" fill="#d9ecfc" className="dark:fill-slate-900" />
              <rect x="57.5" y="30" width="2.2" height="22" fill="#d9ecfc" className="dark:fill-slate-900" />
              {/* Base Pedestal Lines */}
              <rect x="8" y="57" width="64" height="3.2" rx="1.5" />
              <rect x="18" y="62" width="44" height="2.4" rx="1.2" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};
