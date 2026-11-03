import React from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckSquare,
  Database,
  Folder,
  Globe,
  Info,
  Mail,
  MapPin,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Wifi,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setActivePage,
  toggleAlertResolved,
  toggleServiceStatus,
  toggleSiteConnection,
} from '../store/dashboardSlice';
import { ServiceIconType } from '../types/dashboard';
import { KpiStrip } from './KpiStrip';

export const DashboardHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    metrics,
    projects,
    services,
    alerts,
    tasks,
    sites,
    network,
    searchQuery,
  } = useAppSelector((state) => state.dashboard);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filter items if search query is active, otherwise show the exact dashboard items
  const displayedProjects = projects
    .filter((p) =>
      normalizedQuery ? p.name.toLowerCase().includes(normalizedQuery) : p.featuredOnDashboard
    )
    .slice(0, 4);

  const displayedSites = sites
    .filter((s) =>
      normalizedQuery ? s.name.toLowerCase().includes(normalizedQuery) : s.featuredOnDashboard
    )
    .slice(0, 5);

  const displayedServices = services.filter((s) =>
    normalizedQuery ? s.name.toLowerCase().includes(normalizedQuery) : true
  );

  const displayedAlerts = alerts.slice(0, 3);

  const renderServiceIcon = (type: ServiceIconType) => {
    switch (type) {
      case 'active_directory':
        return (
          <svg className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5.5L10.5 4.3V11.2H3V5.5ZM11.8 4.1L21 2.7V11.2H11.8V4.1ZM3 12.6H10.5V19.6L3 18.4V12.6ZM11.8 12.6H21V21.3L11.8 19.8V12.6Z" />
          </svg>
        );
      case 'file_server':
        return <Folder className="w-5 h-5 text-[#1565c0] dark:text-blue-400 fill-[#1565c0]/20 shrink-0" />;
      case 'sql_server':
        return <Database className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
      case 'portal':
        return <Monitor className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
      case 'email':
        return <Mail className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
      case 'auth_nps':
        return <ShieldCheck className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
      case 'dhcp':
        return <Network className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
      case 'dns':
        return <Globe className="w-5 h-5 text-[#1565c0] dark:text-blue-400 shrink-0" />;
    }
  };

  // Donut Chart Calculations for Projects Progress (Total = 27)
  const totalCount =
    metrics.projectCounts.completed +
    metrics.projectCounts.inProgress +
    metrics.projectCounts.delayed +
    metrics.projectCounts.atRisk;

  const completedPct = Number(((metrics.projectCounts.completed / totalCount) * 100).toFixed(1));
  const inProgressPct = Number(((metrics.projectCounts.inProgress / totalCount) * 100).toFixed(1));
  const delayedPct = Number(((metrics.projectCounts.delayed / totalCount) * 100).toFixed(1));
  const atRiskPct = Number(((metrics.projectCounts.atRisk / totalCount) * 100).toFixed(1));

  // SVG Circle circumference for r=44 is 2 * PI * 44 = 276.46
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  const segBlue = (inProgressPct / 100) * circumference;
  const segGreen = (completedPct / 100) * circumference;
  const segAmber = (delayedPct / 100) * circumference;
  const segRed = (atRiskPct / 100) * circumference;

  // Internet Usage circular gauge (r=38, C=238.76)
  const gaugeRadius = 38;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeDash = (network.averageUsage / 100) * gaugeCircumference;

  return (
    <div className="space-y-3">
      {/* Row 1: 7 Summary KPI Cards */}
      <KpiStrip />

      {/* Row 2: Middle 3-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Right Column in RTL (4 cols): تقدم المشاريع + التنبيهات والإنذارات */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Card 1: تقدم المشاريع */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="7" r="3" />
                    <path d="M3 19v-1.5A4.5 4.5 0 0 1 7.5 13h3A4.5 4.5 0 0 1 15 17.5V19" />
                    <path d="M16 11h5m-5 4h5m-5-8h5" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  تقدم المشاريع
                </h2>
              </div>
            </div>

            {/* Card Content: Legend on Right, Donut on Left */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {/* Right side in RTL: Legend List */}
              <div className="flex-1 space-y-2.5 pr-1">
                {/* مكتملة */}
                <div className="grid grid-cols-12 items-center text-[13.5px] font-bold">
                  <div className="col-span-6 flex items-center gap-2 text-[#0f294d] dark:text-slate-200">
                    <span className="w-3 h-3 rounded-[3px] bg-[#16a34a] shrink-0" />
                    <span>مكتملة</span>
                  </div>
                  <span className="col-span-2 text-center font-black text-[15px] text-[#091e3a] dark:text-white tabular-nums">
                    {metrics.projectCounts.completed}
                  </span>
                  <span
                    dir="ltr"
                    className="col-span-4 text-left font-extrabold text-[13px] text-slate-700 dark:text-slate-300 tabular-nums"
                  >
                    ({completedPct}%)
                  </span>
                </div>

                {/* قيد التنفيذ */}
                <div className="grid grid-cols-12 items-center text-[13.5px] font-bold">
                  <div className="col-span-6 flex items-center gap-2 text-[#0f294d] dark:text-slate-200">
                    <span className="w-3 h-3 rounded-[3px] bg-[#0070f3] shrink-0" />
                    <span>قيد التنفيذ</span>
                  </div>
                  <span className="col-span-2 text-center font-black text-[15px] text-[#091e3a] dark:text-white tabular-nums">
                    {metrics.projectCounts.inProgress}
                  </span>
                  <span
                    dir="ltr"
                    className="col-span-4 text-left font-extrabold text-[13px] text-slate-700 dark:text-slate-300 tabular-nums"
                  >
                    ({inProgressPct}%)
                  </span>
                </div>

                {/* مؤجلة */}
                <div className="grid grid-cols-12 items-center text-[13.5px] font-bold">
                  <div className="col-span-6 flex items-center gap-2 text-[#0f294d] dark:text-slate-200">
                    <span className="w-3 h-3 rounded-[3px] bg-[#f59e0b] shrink-0" />
                    <span>مؤجلة</span>
                  </div>
                  <span className="col-span-2 text-center font-black text-[15px] text-[#091e3a] dark:text-white tabular-nums">
                    {metrics.projectCounts.delayed}
                  </span>
                  <span
                    dir="ltr"
                    className="col-span-4 text-left font-extrabold text-[13px] text-slate-700 dark:text-slate-300 tabular-nums"
                  >
                    ({delayedPct}%)
                  </span>
                </div>

                {/* معرضة للمخاطر */}
                <div className="grid grid-cols-12 items-center text-[13.5px] font-bold">
                  <div className="col-span-6 flex items-center gap-2 text-[#0f294d] dark:text-slate-200">
                    <span className="w-3 h-3 rounded-[3px] bg-[#dc2626] shrink-0" />
                    <span className="whitespace-nowrap">معرضة للمخاطر</span>
                  </div>
                  <span className="col-span-2 text-center font-black text-[15px] text-[#091e3a] dark:text-white tabular-nums">
                    {metrics.projectCounts.atRisk}
                  </span>
                  <span
                    dir="ltr"
                    className="col-span-4 text-left font-extrabold text-[13px] text-slate-700 dark:text-slate-300 tabular-nums"
                  >
                    ({atRiskPct}%)
                  </span>
                </div>
              </div>

              {/* Left side in RTL: Multi-Segment SVG Donut Chart */}
              <div className="relative w-[132px] h-[132px] flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                  {/* Background track */}
                  <circle
                    cx="55"
                    cy="55"
                    r={radius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="17"
                    className="dark:stroke-slate-700"
                  />
                  {/* Blue Segment (In Progress - 66.7%) */}
                  <circle
                    cx="55"
                    cy="55"
                    r={radius}
                    fill="none"
                    stroke="#0070f3"
                    strokeWidth="17"
                    strokeDasharray={`${segBlue} ${circumference}`}
                    strokeDashoffset={0}
                  />
                  {/* Green Segment (Completed - 22.2%) */}
                  <circle
                    cx="55"
                    cy="55"
                    r={radius}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="17"
                    strokeDasharray={`${segGreen} ${circumference}`}
                    strokeDashoffset={-segBlue}
                  />
                  {/* Amber Segment (Delayed - 7.4%) */}
                  <circle
                    cx="55"
                    cy="55"
                    r={radius}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="17"
                    strokeDasharray={`${segAmber} ${circumference}`}
                    strokeDashoffset={-(segBlue + segGreen)}
                  />
                  {/* Red Segment (At Risk - 3.7%) */}
                  <circle
                    cx="55"
                    cy="55"
                    r={radius}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="17"
                    strokeDasharray={`${segRed} ${circumference}`}
                    strokeDashoffset={-(segBlue + segGreen + segAmber)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                  <span className="text-[23px] font-black text-[#091e3a] dark:text-white tabular-nums">
                    {metrics.totalProjects}
                  </span>
                  <span className="text-[12px] font-extrabold text-[#0f294d] dark:text-slate-300">
                    مشروعاً
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: التنبيهات والإنذارات */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="flex-1 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#dc2626] text-white flex items-center justify-center shadow-xs">
                    <Bell className="w-4 h-4 fill-white" />
                  </div>
                  <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                    التنبيهات والإنذارات
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setActivePage('alerts'))}
                  className="text-[13px] font-extrabold text-[#1560bd] dark:text-blue-400 hover:underline cursor-pointer"
                >
                  عرض الكل
                </button>
              </div>

              {/* Alert Rows */}
              <div className="divide-y divide-slate-200/75 dark:divide-slate-700/70">
                {displayedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => dispatch(toggleAlertResolved(alert.id))}
                    title="انقر لتغيير حالة المعالجة"
                    className={`py-2.5 flex items-center gap-3 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/60 px-1 rounded-lg transition-colors ${
                      alert.resolved ? 'opacity-55 line-through' : ''
                    }`}
                  >
                    {alert.severity === 'critical' && (
                      <AlertTriangle className="w-5 h-5 text-[#dc2626] shrink-0 stroke-[2.3]" />
                    )}
                    {alert.severity === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 stroke-[2.3]" />
                    )}
                    {alert.severity === 'info' && (
                      <div className="w-5 h-5 rounded-full bg-[#0284c7] text-white flex items-center justify-center shrink-0">
                        <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                    <span className="text-[13px] font-extrabold text-[#0c2340] dark:text-slate-100 leading-snug">
                      {alert.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Column in RTL (4 cols): حالة الأنظمة والخدمات */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                <Server className="w-4 h-4" />
              </div>
              <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                حالة الأنظمة والخدمات
              </h2>
            </div>
          </div>

          {/* 8 System Services List */}
          <div className="flex-1 flex flex-col justify-around divide-y divide-slate-200/75 dark:divide-slate-700/70">
            {displayedServices.map((srv) => {
              const isRunning = srv.status === 'running';
              const isMaintenance = srv.status === 'maintenance';
              return (
                <div
                  key={srv.id}
                  onClick={() => dispatch(toggleServiceStatus(srv.id))}
                  title="انقر لتبديل حالة الخدمة"
                  className="py-2 flex items-center justify-between gap-2 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 px-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {/* Right side in RTL: Service Icon + Name */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    {renderServiceIcon(srv.iconType)}
                    <span className="text-[13.5px] font-extrabold text-[#0c2340] dark:text-slate-100 truncate">
                      {srv.name}
                    </span>
                  </div>

                  {/* Left side in RTL: Status Pill */}
                  <span
                    className={`px-3.5 py-0.5 rounded-full text-[12px] font-extrabold shrink-0 transition-colors ${
                      isRunning
                        ? 'bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800'
                        : isMaintenance
                        ? 'bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 border border-amber-300/60'
                        : 'bg-rose-100 dark:bg-rose-950/90 text-rose-700 dark:text-rose-300 border border-rose-300/60'
                    }`}
                  >
                    {isRunning ? 'يعمل' : isMaintenance ? 'صيانة' : 'متوقف'}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Left Column in RTL (4 cols): حالة البنية التحتية للشبكة + استخدام الإنترنت */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.11 }}
          className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between gap-3"
        >
          {/* Top Sub-section: حالة البنية التحتية للشبكة */}
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  <Network className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  حالة البنية التحتية للشبكة
                </h2>
              </div>
            </div>

            {/* 5 Columns Infrastructure Status Grid (Right to Left: نقاط الاتصال | المفاتيح | الموجهات | جدار الحماية | الإنترنت) */}
            <div className="grid grid-cols-5 divide-x divide-x-reverse divide-slate-200/80 dark:divide-slate-700/70 text-center py-1">
              {/* 1. نقاط الاتصال */}
              <div className="px-1 flex flex-col items-center justify-between gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-[#1259c3] dark:text-blue-400">
                  <Wifi className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0c2340] dark:text-slate-200 whitespace-nowrap">
                  نقاط الاتصال
                </span>
                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11px] font-extrabold tabular-nums whitespace-nowrap"
                >
                  <span>{network.accessPointsActive} / {network.accessPointsTotal}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </span>
              </div>

              {/* 2. المفاتيح */}
              <div className="px-1 flex flex-col items-center justify-between gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-[#1259c3] dark:text-blue-400">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="7" width="20" height="10" rx="2.5" />
                    <circle cx="6" cy="12" r="1.2" fill="white" />
                    <circle cx="9.5" cy="12" r="1.2" fill="white" />
                    <circle cx="13" cy="12" r="1.2" fill="white" />
                    <rect x="16" y="10.8" width="3.5" height="2.4" rx="0.5" fill="white" />
                  </svg>
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0c2340] dark:text-slate-200 whitespace-nowrap">
                  المفاتيح
                </span>
                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11px] font-extrabold tabular-nums whitespace-nowrap"
                >
                  <span>{network.switchesActive} / {network.switchesTotal}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </span>
              </div>

              {/* 3. الموجهات */}
              <div className="px-1 flex flex-col items-center justify-between gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-[#1259c3] dark:text-blue-400">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a1 1 0 0 1 1 1v6h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h5V4a1 1 0 0 1 1-1z" />
                    <circle cx="8" cy="14.5" r="1.2" fill="white" />
                    <circle cx="12" cy="14.5" r="1.2" fill="white" />
                    <circle cx="16" cy="14.5" r="1.2" fill="white" />
                    <path d="M8.5 6.5a5 5 0 0 1 7 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0c2340] dark:text-slate-200 whitespace-nowrap">
                  الموجهات
                </span>
                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11px] font-extrabold tabular-nums whitespace-nowrap"
                >
                  <span>{network.routersActive} / {network.routersTotal}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </span>
              </div>

              {/* 4. جدار الحماية */}
              <div className="px-1 flex flex-col items-center justify-between gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-[#1259c3] dark:text-blue-400">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 5.5v6c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5v-6L12 2z" />
                    <path
                      d="M9 12l2 2 4-4"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0c2340] dark:text-slate-200 whitespace-nowrap">
                  جدار الحماية
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11px] font-extrabold whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>يعمل</span>
                </span>
              </div>

              {/* 5. الإنترنت */}
              <div className="px-1 flex flex-col items-center justify-between gap-2">
                <div className="w-10 h-10 flex items-center justify-center text-[#1259c3] dark:text-blue-400">
                  <Globe className="w-8 h-8 stroke-[2]" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#0c2340] dark:text-slate-200 whitespace-nowrap">
                  الإنترنت
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11px] font-extrabold whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>متصل</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Sub-section: استخدام الإنترنت */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 4v16m0-16L3 8m4-4l4 4m6 12V4m0 16l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  استخدام الإنترنت
                </h3>
              </div>
            </div>

            {/* Gauge on Right + Area Line Chart on Left */}
            <div className="flex items-center justify-between gap-2">
              {/* Right side in RTL: 72% Circular Gauge */}
              <div className="flex flex-col items-center justify-center shrink-0 px-1">
                <div className="relative w-[104px] h-[104px] flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <circle
                      cx="48"
                      cy="48"
                      r={gaugeRadius}
                      fill="none"
                      stroke="#bfd9f8"
                      strokeWidth="12"
                      className="dark:stroke-slate-700"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r={gaugeRadius}
                      fill="none"
                      stroke="#0a58ca"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${gaugeDash} ${gaugeCircumference}`}
                    />
                  </svg>
                  <span
                    dir="ltr"
                    className="absolute text-[22px] font-black text-[#091e3a] dark:text-white tabular-nums"
                  >
                    {network.averageUsage}%
                  </span>
                </div>
                <span className="text-[12px] font-extrabold text-[#0c2340] dark:text-slate-300 mt-0.5">
                  متوسط الاستخدام
                </span>
              </div>

              {/* Left side in RTL: Smooth Area Line Chart (00:00 to 20:00) */}
              <div dir="ltr" className="flex-1 min-w-0 pt-1">
                <svg className="w-full h-[120px] overflow-visible" viewBox="0 0 265 115">
                  <defs>
                    <linearGradient id="internetAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1d75f8" stopOpacity="0.48" />
                      <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines & Y-Axis Labels */}
                  {[
                    { label: '100%', y: 10 },
                    { label: '80%', y: 26 },
                    { label: '60%', y: 42 },
                    { label: '40%', y: 58 },
                    { label: '20%', y: 74 },
                    { label: '0%', y: 90 },
                  ].map((row) => (
                    <g key={row.label}>
                      <text
                        x="30"
                        y={row.y + 3.5}
                        textAnchor="end"
                        className="fill-[#0c2340] dark:fill-slate-300 text-[9.5px] font-extrabold tabular-nums"
                      >
                        {row.label}
                      </text>
                      <line
                        x1="36"
                        y1={row.y}
                        x2="255"
                        y2={row.y}
                        stroke="#cbd5e1"
                        strokeWidth="0.7"
                        className="dark:stroke-slate-700"
                      />
                    </g>
                  ))}

                  {/* Vertical Grid Lines & X-Axis Time Labels */}
                  {[
                    { time: '00:00', x: 36 },
                    { time: '04:00', x: 78 },
                    { time: '08:00', x: 120 },
                    { time: '12:00', x: 162 },
                    { time: '16:00', x: 204 },
                    { time: '20:00', x: 246 },
                  ].map((col) => (
                    <g key={col.time}>
                      <line
                        x1={col.x}
                        y1="10"
                        x2={col.x}
                        y2="90"
                        stroke="#e2e8f0"
                        strokeWidth="0.6"
                        className="dark:stroke-slate-800"
                      />
                      <text
                        x={col.x + 8}
                        y="105"
                        textAnchor="middle"
                        className="fill-[#0c2340] dark:fill-slate-300 text-[9.5px] font-extrabold tabular-nums"
                      >
                        {col.time}
                      </text>
                    </g>
                  ))}

                  {/* Area under curve matching the image wave */}
                  <path
                    d="M36,58 C50,58 65,50 78,51 C92,52 100,56 112,48 C124,40 130,36 142,41 C154,46 164,56 176,56 C188,56 202,34 215,35 C228,36 235,44 255,41 L255,90 L36,90 Z"
                    fill="url(#internetAreaGrad)"
                  />

                  {/* Smooth Line Stroke */}
                  <path
                    d="M36,58 C50,58 65,50 78,51 C92,52 100,56 112,48 C124,40 130,36 142,41 C154,46 164,56 176,56 C188,56 202,34 215,35 C228,36 235,44 255,41"
                    fill="none"
                    stroke="#0d6efd"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 3: Bottom 3-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Right Column in RTL (5 cols): أهم المشاريع الجارية */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.14 }}
          className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  {/* Construction Tower Crane Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3v18M5 21h8M4 7h16M9 3l7 4M9 3L5 7m12 0v6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  أهم المشاريع الجارية
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setActivePage('projects'))}
                className="text-[13px] font-extrabold text-[#1560bd] dark:text-blue-400 hover:underline cursor-pointer"
              >
                عرض الكل
              </button>
            </div>

            {/* Table Column Headers */}
            <div className="grid grid-cols-12 items-center px-3 py-1.5 rounded-lg bg-[#dce8f5] dark:bg-slate-800 text-[12px] font-extrabold text-[#0c2340] dark:text-slate-200 mb-1">
              <div className="col-span-4 text-right">المشروع</div>
              <div className="col-span-3 text-center">نسبة التنفيذ</div>
              <div className="col-span-3 text-center">التسليم الإبتدائي</div>
              <div className="col-span-2 text-left">التسليم النهائي</div>
            </div>

            {/* Project Rows */}
            <div className="divide-y divide-slate-200/75 dark:divide-slate-700/70">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => dispatch(setActivePage('projects'))}
                  className="grid grid-cols-12 items-center px-2 py-2.5 text-[13px] font-extrabold text-[#0c2340] dark:text-slate-100 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
                >
                  {/* المشروع */}
                  <div className="col-span-4 text-right truncate pr-1">{project.name}</div>

                  {/* نسبة التنفيذ */}
                  <div dir="ltr" className="col-span-3 flex items-center justify-center gap-1.5 px-1">
                    <span className="text-[12.5px] font-black tabular-nums w-8 text-right">
                      {project.executionRate}%
                    </span>
                    <div className="w-14 h-3 rounded-full bg-[#cedbe9] dark:bg-slate-700 overflow-hidden p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a]"
                        style={{ width: `${project.executionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* التسليم الإبتدائي */}
                  <div dir="ltr" className="col-span-3 flex items-center justify-center gap-1.5 px-1">
                    <span className="text-[12.5px] font-black tabular-nums w-8 text-right">
                      {project.initialHandover}%
                    </span>
                    <div className="w-12 h-3 rounded-full bg-[#cedbe9] dark:bg-slate-700 overflow-hidden p-[1px]">
                      {project.initialHandover > 0 && (
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]"
                          style={{ width: `${project.initialHandover}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* التسليم النهائي */}
                  <div dir="ltr" className="col-span-2 text-left pl-2 font-black text-[12.5px] tabular-nums">
                    {project.finalHandover}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center Column in RTL (3 cols): المهام والإجراءات */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.17 }}
          className="lg:col-span-3 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  المهام والإجراءات
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setActivePage('requests'))}
                className="text-[13px] font-extrabold text-[#1560bd] dark:text-blue-400 hover:underline cursor-pointer"
              >
                عرض الكل
              </button>
            </div>

            {/* 4 Tasks Rows */}
            <div className="divide-y divide-slate-200/75 dark:divide-slate-700/70">
              {tasks.map((task) => {
                const badgeStyles =
                  task.badgeColor === 'red'
                    ? 'bg-[#fad5d8] dark:bg-rose-950/90 text-[#c81e1e] dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    : task.badgeColor === 'amber'
                    ? 'bg-[#fde7c0] dark:bg-amber-950/90 text-[#d97706] dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    : 'bg-[#d0e5fb] dark:bg-blue-950/90 text-[#1560bd] dark:text-blue-300 border border-blue-200 dark:border-blue-800';

                return (
                  <div
                    key={task.id}
                    onClick={() => dispatch(setActivePage(task.targetPage))}
                    className="py-2.5 px-1 flex items-center justify-between gap-2 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-[13.5px] font-extrabold text-[#0c2340] dark:text-slate-100">
                      {task.title}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[14px] tabular-nums shrink-0 ${badgeStyles}`}
                    >
                      {task.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Left Column in RTL (4 cols): حالة المواقع (الفروع والمشروعات) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="lg:col-span-4 rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-3.5 flex flex-col justify-between"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                  حالة المواقع (الفروع والمشروعات)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setActivePage('sites'))}
                className="text-[13px] font-extrabold text-[#1560bd] dark:text-blue-400 hover:underline cursor-pointer"
              >
                عرض الكل
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 items-center px-3 py-1.5 rounded-lg bg-[#dce8f5] dark:bg-slate-800 text-[12px] font-extrabold text-[#0c2340] dark:text-slate-200 mb-1">
              <div className="col-span-3 text-right">الموقع</div>
              <div className="col-span-3 text-center">حالة الاتصال</div>
              <div className="col-span-4 text-center">استخدام الإنترنت</div>
              <div className="col-span-2 text-center">الأجهزة</div>
            </div>

            {/* 5 Site Status Rows */}
            <div className="divide-y divide-slate-200/75 dark:divide-slate-700/70">
              {displayedSites.map((site) => (
                <div
                  key={site.id}
                  onClick={() => dispatch(toggleSiteConnection(site.id))}
                  title="انقر لتبديل حالة اتصال الموقع"
                  className="grid grid-cols-12 items-center px-2 py-2 text-[13px] font-extrabold text-[#0c2340] dark:text-slate-100 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
                >
                  {/* الموقع */}
                  <div className="col-span-3 text-right truncate">{site.name}</div>

                  {/* حالة الاتصال */}
                  <div className="col-span-3 flex justify-center">
                    {site.connected ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4f4dc] dark:bg-emerald-950/90 text-[#147a36] dark:text-emerald-300 text-[11.5px] font-extrabold">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>متصل</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fad5d8] dark:bg-rose-950/90 text-[#c81e1e] dark:text-rose-300 text-[11px] font-extrabold whitespace-nowrap">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#dc2626] shrink-0 stroke-[2.5]" />
                        <span>غير متصل</span>
                      </span>
                    )}
                  </div>

                  {/* استخدام الإنترنت */}
                  <div dir="ltr" className="col-span-4 flex items-center justify-center gap-1.5 px-1">
                    <span className="text-[12.5px] font-black tabular-nums w-8 text-right">
                      {site.internetUsage}%
                    </span>
                    <div className="w-16 h-3 rounded-full bg-[#cedbe9] dark:bg-slate-700 overflow-hidden p-[1px]">
                      {site.internetUsage > 0 && (
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0284c7] to-[#2563eb]"
                          style={{ width: `${site.internetUsage}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* الأجهزة */}
                  <div className="col-span-2 text-center font-black text-[13.5px] tabular-nums">
                    {site.devicesCount !== null ? site.devicesCount : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
