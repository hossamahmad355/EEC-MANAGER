import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  Cpu,
  HardDrive,
  Network,
  Power,
  RefreshCw,
  Server,
  ShieldCheck,
  Wifi,
  WifiOff,
  XCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setServiceStatus,
  toggleServiceStatus,
  toggleSiteConnection,
  updateServiceAllRunning,
} from '../store/dashboardSlice';

export const ServerNetworkMonitor: React.FC = () => {
  const dispatch = useAppDispatch();
  const { services, sites, network } = useAppSelector((state) => state.dashboard);

  const [filterMode, setFilterMode] = useState<'all' | 'servers' | 'network' | 'down'>('all');
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string>('منذ لحظات');

  // Counts for Servers
  const upServersCount = services.filter((s) => s.status === 'running').length;
  const maintServersCount = services.filter((s) => s.status === 'maintenance').length;
  const downServersCount = services.filter((s) => s.status === 'stopped').length;

  // Counts for Network Site Links
  const upSitesCount = sites.filter((s) => s.connected).length;
  const downSitesCount = sites.filter((s) => !s.connected).length;

  const totalUp = upServersCount + upSitesCount;
  const totalDown = downServersCount + downSitesCount;

  const handleRunPingCheck = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setLastPingTime(new Date().toLocaleTimeString('ar-EG'));
    }, 450);
  };

  const handleSimulateDownAlert = () => {
    const runningServers = services.filter((s) => s.status === 'running');
    if (runningServers.length > 0) {
      const randomSrv = runningServers[Math.floor(Math.random() * runningServers.length)];
      dispatch(setServiceStatus({ id: randomSrv.id, status: 'stopped' }));
    } else if (services.length > 0) {
      dispatch(setServiceStatus({ id: services[0].id, status: 'stopped' }));
    }
  };

  const displayedServers = services.filter((s) => {
    if (filterMode === 'network') return false;
    if (filterMode === 'down') return s.status !== 'running';
    return true;
  });

  const displayedSites = sites.filter((s) => {
    if (filterMode === 'servers') return false;
    if (filterMode === 'down') return !s.connected;
    return true;
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.22 }}
      aria-label="نظام مراقبة الخوادم والشبكات"
      className="rounded-2xl bg-gradient-to-b from-white via-[#fafdff] to-[#f0f6fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 border border-white dark:border-slate-700/80 shadow-[0_4px_16px_rgba(12,35,64,0.07)] p-4 space-y-3.5"
    >
      {/* Top Header & Status Summary Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-black text-[#0a2246] dark:text-white">
                نظام مراقبة الخوادم والبنية التحتية للشبكة (Up / Down Monitor)
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-slate-800 text-[#1560bd] dark:text-blue-400 text-[11px] font-extrabold">
                آخر فحص: {lastPingTime}
              </span>
            </div>
            <p className="text-[11.5px] font-bold text-slate-500 dark:text-slate-400">
              مؤشرات لونية حية وتنبيهات فورية (Toast Alerts) عند تغير حالة أي خادم أو موقع بين UP و DOWN
            </p>
          </div>
        </div>

        {/* Color-Coded Status Counters + Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* UP Indicator Summary */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d4f4dc]/80 dark:bg-emerald-950/80 border border-emerald-300/70 dark:border-emerald-800 text-[#147a36] dark:text-emerald-300 text-xs font-black">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            <span>UP / يعمل:</span>
            <span className="tabular-nums">{totalUp}</span>
          </div>

          {/* MAINTENANCE Indicator Summary */}
          {maintServersCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300/70 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>WARN / صيانة:</span>
              <span className="tabular-nums">{maintServersCount}</span>
            </div>
          )}

          {/* DOWN Indicator Summary */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fad5d8]/90 dark:bg-rose-950/80 border border-rose-300/70 dark:border-rose-800 text-[#c81e1e] dark:text-rose-300 text-xs font-black">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span>DOWN / متوقف:</span>
            <span className="tabular-nums">{totalDown}</span>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#dce8f5] dark:bg-slate-800">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'servers', label: `الخوادم (${services.length})` },
              { id: 'network', label: `عُقد المواقع (${sites.length})` },
              { id: 'down', label: `المتوقفة (${totalDown + maintServersCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterMode(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-colors cursor-pointer whitespace-nowrap ${
                  filterMode === tab.id
                    ? 'bg-[#0e4da4] text-white shadow-xs'
                    : 'text-[#0c2340] dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Simulate Real-Time UP -> DOWN Alert Button */}
          <button
            type="button"
            onClick={handleSimulateDownAlert}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-colors cursor-pointer shadow-2xs"
            title="محاكاة سقوط خادم (UP ➔ DOWN) لإظهار تنبيه فوري"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>محاكاة توقف (UP ➔ DOWN)</span>
          </button>

          {/* Ping Check Button */}
          <button
            type="button"
            onClick={handleRunPingCheck}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0e4da4] hover:bg-[#0b3b7d] text-white text-xs font-extrabold transition-colors cursor-pointer"
            title="إجراء فحص اتصال فوري"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>فحص الآن</span>
          </button>

          {(downServersCount > 0 || maintServersCount > 0) && (
            <button
              type="button"
              onClick={() => dispatch(updateServiceAllRunning())}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              <span>تشغيل كل الخوادم</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 1: Core Servers Status Grid (Up / Maintenance / Down) */}
      {displayedServers.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#0a2246] dark:text-slate-200 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#0e4da4] dark:text-blue-400" />
              <span>حالة الخوادم المركزية (Core Servers — {upServersCount}/{services.length} UP)</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              اختر الحالة مباشرة (UP / WARN / DOWN) لإطلاق تنبيه لحظي
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {displayedServers.map((srv) => {
              const isUp = srv.status === 'running';
              const isMaint = srv.status === 'maintenance';

              const cardBorder = isUp
                ? 'border-emerald-200/90 dark:border-emerald-900/70 bg-white dark:bg-slate-900/90'
                : isMaint
                ? 'border-amber-300/90 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20'
                : 'border-rose-300/90 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/25';

              return (
                <div
                  key={srv.id}
                  onClick={() => dispatch(toggleServiceStatus(srv.id))}
                  className={`p-3 rounded-xl border ${cardBorder} hover:shadow-md transition-all duration-150 cursor-pointer flex flex-col justify-between gap-2.5`}
                >
                  {/* Top Row: Server Name + UP/DOWN Color Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isUp
                              ? 'bg-[#16a34a] ring-4 ring-emerald-500/20'
                              : isMaint
                              ? 'bg-[#f59e0b] ring-4 ring-amber-500/20'
                              : 'bg-[#dc2626] ring-4 ring-rose-500/25'
                          }`}
                        />
                        <h4 className="text-[13px] font-black text-[#091e3a] dark:text-white truncate">
                          {srv.name}
                        </h4>
                      </div>
                      <p
                        dir="ltr"
                        className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 text-right mt-0.5"
                      >
                        IP: {srv.ipAddress} · Uptime: {isUp ? srv.uptime : '0.00%'}
                      </p>
                    </div>

                    {/* Direct Quick-Switch UP / WARN / DOWN Pill Controls */}
                    <div
                      dir="ltr"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shrink-0"
                    >
                      <button
                        type="button"
                        onClick={() => dispatch(setServiceStatus({ id: srv.id, status: 'running' }))}
                        className={`px-1.5 py-0.5 rounded text-[9.5px] font-black transition-colors cursor-pointer ${
                          isUp
                            ? 'bg-[#16a34a] text-white shadow-2xs'
                            : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400'
                        }`}
                        title="تحويل إلى UP (يعمل)"
                      >
                        UP
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(setServiceStatus({ id: srv.id, status: 'maintenance' }))
                        }
                        className={`px-1.5 py-0.5 rounded text-[9.5px] font-black transition-colors cursor-pointer ${
                          isMaint
                            ? 'bg-[#f59e0b] text-white shadow-2xs'
                            : 'text-slate-500 hover:text-amber-600 dark:text-slate-400'
                        }`}
                        title="تحويل إلى WARN (صيانة)"
                      >
                        WARN
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(setServiceStatus({ id: srv.id, status: 'stopped' }))}
                        className={`px-1.5 py-0.5 rounded text-[9.5px] font-black transition-colors cursor-pointer ${
                          !isUp && !isMaint
                            ? 'bg-[#dc2626] text-white shadow-2xs'
                            : 'text-slate-500 hover:text-rose-600 dark:text-slate-400'
                        }`}
                        title="تحويل مباشر إلى DOWN (متوقف)"
                      >
                        DOWN
                      </button>
                    </div>
                  </div>

                  {/* Bottom Row: CPU & RAM Bars */}
                  <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold">
                    <div>
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                        <span className="inline-flex items-center gap-1">
                          <Cpu className="w-3 h-3" /> CPU
                        </span>
                        <span className="tabular-nums font-black text-[#0c2340] dark:text-slate-200">
                          {isUp ? `${srv.cpuUsage}%` : '0%'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            !isUp
                              ? 'w-0'
                              : srv.cpuUsage > 75
                              ? 'bg-rose-500'
                              : srv.cpuUsage > 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: isUp ? `${srv.cpuUsage}%` : '0%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                        <span className="inline-flex items-center gap-1">
                          <HardDrive className="w-3 h-3" /> RAM
                        </span>
                        <span className="tabular-nums font-black text-[#0c2340] dark:text-slate-200">
                          {isUp ? `${srv.ramUsage}%` : '0%'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            !isUp
                              ? 'w-0'
                              : srv.ramUsage > 80
                              ? 'bg-rose-500'
                              : srv.ramUsage > 60
                              ? 'bg-blue-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: isUp ? `${srv.ramUsage}%` : '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 2: Network Nodes & Site Connectivity Links (Up / Down) */}
      {displayedSites.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200/75 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#0a2246] dark:text-slate-200 flex items-center gap-1.5">
              <Network className="w-4 h-4 text-[#0e4da4] dark:text-blue-400" />
              <span>
                مراقبة عُقد الشبكة وخطوط ربط المواقع (Network Nodes — {upSitesCount}/{sites.length} UP)
              </span>
            </h3>
            <div className="hidden md:flex items-center gap-3 text-[11px] font-extrabold text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                جدار الحماية: {network.firewallActive ? 'UP' : 'DOWN'}
              </span>
              <span>·</span>
              <span>
                المفاتيح: {network.switchesActive}/{network.switchesTotal} UP
              </span>
              <span>·</span>
              <span>
                الموجهات: {network.routersActive}/{network.routersTotal} UP
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2">
            {displayedSites.map((site, idx) => {
              const simulatedPing = site.connected ? 11 + idx * 4 : null;

              return (
                <div
                  key={site.id}
                  onClick={() => dispatch(toggleSiteConnection(site.id))}
                  title="انقر لتبديل حالة خط ربط الموقع (UP / DOWN)"
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    site.connected
                      ? 'bg-white dark:bg-slate-900/90 border-emerald-200/80 dark:border-emerald-900/60 hover:border-emerald-400'
                      : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 hover:border-rose-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          site.connected ? 'bg-[#16a34a]' : 'bg-[#dc2626]'
                        }`}
                      />
                      <span className="text-xs font-black text-[#091e3a] dark:text-white truncate">
                        {site.name}
                      </span>
                    </div>

                    <span
                      dir="ltr"
                      className={`px-1.5 py-0.5 rounded text-[10px] font-black shrink-0 ${
                        site.connected
                          ? 'bg-[#d4f4dc] dark:bg-emerald-950 text-[#147a36] dark:text-emerald-300'
                          : 'bg-[#fad5d8] dark:bg-rose-950 text-[#c81e1e] dark:text-rose-300'
                      }`}
                    >
                      {site.connected ? 'UP' : 'DOWN'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      {site.connected ? (
                        <Wifi className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-rose-600" />
                      )}
                      <span dir="ltr" className="font-mono tabular-nums">
                        {simulatedPing !== null ? `${simulatedPing} ms` : 'TIMEOUT'}
                      </span>
                    </span>
                    <span dir="ltr" className="font-black text-[#0c2340] dark:text-slate-200 tabular-nums">
                      {site.internetUsage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
};
