import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Box,
  Check,
  ClipboardCheck,
  Cpu,
  HardDrive,
  Layers,
  MapPin,
  Network,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Server,
  Settings,
  ShieldCheck,
  Sliders,
  Users,
  Wifi,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  addAlert,
  addAsset,
  addEmployee,
  addProject,
  addSite,
  resetToDefaults,
  setActivePage,
  setAutoSaveEnabled,
  setTheme,
  toggleAlertResolved,
  toggleServiceStatus,
  toggleSiteConnection,
  updateNetworkAverage,
  updateProjectProgress,
  updateServiceAllRunning,
  updateSiteUsage,
  updateTaskCount,
} from '../store/dashboardSlice';
import { ProjectCategoryStatus } from '../types/dashboard';

export const SubPages: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.dashboard);
  const { activePage } = state;

  // Local form states for interactive additions
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectManager, setNewProjectManager] = useState('م. كريم عادل');
  const [newProjectSite, setNewProjectSite] = useState('الموقع الرئيسي');
  const [newProjectBudget, setNewProjectBudget] = useState('120000000');
  const [newProjectStatus, setNewProjectStatus] = useState<ProjectCategoryStatus>('in_progress');

  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteCity, setNewSiteCity] = useState('القاهرة الجديدة');
  const [newSiteManager, setNewSiteManager] = useState('م. عمر فاروق');

  const [newAlertText, setNewAlertText] = useState('');
  const [newAlertSeverity, setNewAlertSeverity] = useState<'critical' | 'warning' | 'info'>('warning');
  const [newAlertLocation, setNewAlertLocation] = useState('الموقع الرئيسي');

  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpTitle, setNewEmpTitle] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('الإدارة الهندسية');

  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCode, setNewAssetCode] = useState('');
  const [newAssetSite, setNewAssetSite] = useState('الموقع الرئيسي');

  const renderBackToDashboardButton = () => (
    <button
      type="button"
      onClick={() => dispatch(setActivePage('dashboard'))}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e4da4] hover:bg-[#0b3d82] text-white text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
    >
      <ArrowRight className="w-4 h-4" />
      <span>العودة إلى لوحة التحكم</span>
    </button>
  );

  // 1. إدارة المشاريع
  if (activePage === 'projects') {
    const handleCreateProject = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProjectName.trim()) return;
      const budgetVal = Number(newProjectBudget) || 85000000;
      dispatch(
        addProject({
          name: newProjectName.trim(),
          executionRate: newProjectStatus === 'completed' ? 100 : 35,
          initialHandover: newProjectStatus === 'completed' ? 100 : 10,
          finalHandover: newProjectStatus === 'completed' ? 100 : 0,
          status: newProjectStatus,
          budget: budgetVal,
          spent: Math.round(budgetVal * 0.35),
          manager: newProjectManager,
          siteName: newProjectSite,
          featuredOnDashboard: true,
        })
      );
      setNewProjectName('');
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                إدارة المشاريع الهندسية والإنشائية ({state.metrics.totalProjects} مشروعاً)
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                تحديث نسب التنفيذ والتسليم الابتدائي والنهائي مع حفظ تلقائي فوري في المتصفح
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        {/* Add New Project Form */}
        <form
          onSubmit={handleCreateProject}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end"
        >
          <div className="lg:col-span-2">
            <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
              اسم المشروع الجديد
            </label>
            <input
              type="text"
              required
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="مثال: إنشاء مبنى المختبرات المركزية"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
              مدير المشروع
            </label>
            <input
              type="text"
              value={newProjectManager}
              onChange={(e) => setNewProjectManager(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
              الموقع
            </label>
            <input
              type="text"
              value={newProjectSite}
              onChange={(e) => setNewProjectSite(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
              حالة المشروع
            </label>
            <select
              value={newProjectStatus}
              onChange={(e) => setNewProjectStatus(e.target.value as ProjectCategoryStatus)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            >
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
              <option value="delayed">مؤجل</option>
              <option value="at_risk">معرض للمخاطر</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مشروع</span>
          </button>
        </form>

        {/* Interactive Projects Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#dce8f5] dark:bg-slate-800 text-[#0c2340] dark:text-slate-200 font-black">
                <tr>
                  <th className="py-3 px-4">المشروع</th>
                  <th className="py-3 px-3">الموقع / المدير</th>
                  <th className="py-3 px-3">الحالة</th>
                  <th className="py-3 px-3">نسبة التنفيذ (تفاعلي)</th>
                  <th className="py-3 px-3">التسليم الإبتدائي</th>
                  <th className="py-3 px-3">التسليم النهائي</th>
                  <th className="py-3 px-4">الميزانية (ج.م)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800 font-bold">
                {state.projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-black text-sm text-[#091e3a] dark:text-white">
                      {proj.name}
                    </td>
                    <td className="py-3 px-3">
                      <div>{proj.siteName}</div>
                      <div className="text-[11px] text-slate-500">{proj.manager}</div>
                    </td>
                    <td className="py-3 px-3">
                      {proj.status === 'completed' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          مكتملة
                        </span>
                      )}
                      {proj.status === 'in_progress' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          قيد التنفيذ
                        </span>
                      )}
                      {proj.status === 'delayed' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                          مؤجلة
                        </span>
                      )}
                      {proj.status === 'at_risk' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                          معرضة للمخاطر
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={proj.executionRate}
                          onChange={(e) =>
                            dispatch(
                              updateProjectProgress({
                                id: proj.id,
                                executionRate: Number(e.target.value),
                                initialHandover: proj.initialHandover,
                                finalHandover: proj.finalHandover,
                              })
                            )
                          }
                          className="w-24 accent-emerald-600 cursor-pointer"
                        />
                        <span className="font-black tabular-nums w-9">{proj.executionRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={proj.initialHandover}
                          onChange={(e) =>
                            dispatch(
                              updateProjectProgress({
                                id: proj.id,
                                executionRate: proj.executionRate,
                                initialHandover: Number(e.target.value),
                                finalHandover: proj.finalHandover,
                              })
                            )
                          }
                          className="w-20 accent-blue-600 cursor-pointer"
                        />
                        <span className="font-black tabular-nums w-9">{proj.initialHandover}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={proj.finalHandover}
                          onChange={(e) =>
                            dispatch(
                              updateProjectProgress({
                                id: proj.id,
                                executionRate: proj.executionRate,
                                initialHandover: proj.initialHandover,
                                finalHandover: Number(e.target.value),
                              })
                            )
                          }
                          className="w-20 accent-indigo-600 cursor-pointer"
                        />
                        <span className="font-black tabular-nums w-9">{proj.finalHandover}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-black tabular-nums">
                      {proj.budget.toLocaleString('en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 2. إدارة المواقع
  if (activePage === 'sites') {
    const handleCreateSite = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newSiteName.trim()) return;
      dispatch(
        addSite({
          name: newSiteName.trim(),
          city: newSiteCity,
          manager: newSiteManager,
          connected: true,
          internetUsage: 52,
          devicesCount: 25,
          bandwidthMbps: 200,
          featuredOnDashboard: true,
        })
      );
      setNewSiteName('');
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                إدارة المواقع والفروع الهندسية ({state.metrics.totalSites} موقعاً)
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                مراقبة حالة الربط الشبكي واستهلاك الإنترنت وعدد الأجهزة المتصلة في كل موقع
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <form
          onSubmit={handleCreateSite}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div>
            <label className="block text-xs font-extrabold mb-1">اسم الموقع</label>
            <input
              type="text"
              required
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              placeholder="مثال: موقع 8 - شرق القاهرة"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">المدينة / المنطقة</label>
            <input
              type="text"
              value={newSiteCity}
              onChange={(e) => setNewSiteCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">مسؤول الموقع</label>
            <input
              type="text"
              value={newSiteManager}
              onChange={(e) => setNewSiteManager(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e4da4] hover:bg-blue-800 text-white text-xs font-extrabold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة موقع جديد</span>
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {state.sites.map((site) => (
            <div
              key={site.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-[#091e3a] dark:text-white">{site.name}</h3>
                  <p className="text-xs font-bold text-slate-500">
                    {site.city} · {site.manager}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(toggleSiteConnection(site.id))}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold cursor-pointer transition-colors ${
                    site.connected
                      ? 'bg-[#d4f4dc] text-[#147a36] dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-[#fad5d8] text-[#c81e1e] dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {site.connected ? '✓ متصل (انقر للفصل)' : '⚠ غير متصل (انقر للربط)'}
                </button>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">استخدام الإنترنت:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      disabled={!site.connected}
                      value={site.internetUsage}
                      onChange={(e) =>
                        dispatch(updateSiteUsage({ id: site.id, usage: Number(e.target.value) }))
                      }
                      className="w-24 accent-blue-600 cursor-pointer"
                    />
                    <span className="font-black tabular-nums w-9">{site.internetUsage}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">عدد الأجهزة المتصلة:</span>
                  <span className="font-black tabular-nums">
                    {site.devicesCount !== null ? `${site.devicesCount} جهاز` : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">سعة الخط:</span>
                  <span className="font-black tabular-nums">{site.bandwidthMbps} Mbps</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. البنية التحتية للشبكة
  if (activePage === 'network') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                البنية التحتية للشبكة واستخدام الإنترنت
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                إدارة نقاط الاتصال (28/28)، المفاتيح (4/4)، الموجهات (3/3)، وجدار الحماية
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-[#0e4da4] dark:text-blue-400 font-black">
              <Wifi className="w-5 h-5" />
              <span>محاكاة متوسط استخدام الإنترنت</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              قم بتحريك المؤشر لتعديل متوسط استهلاك الإنترنت العام في لوحة التحكم الرئيسية:
            </p>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="range"
                min={10}
                max={98}
                value={state.network.averageUsage}
                onChange={(e) => dispatch(updateNetworkAverage(Number(e.target.value)))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
              <span className="text-xl font-black text-[#091e3a] dark:text-white tabular-nums">
                {state.network.averageUsage}%
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-600 font-black">
              <ShieldCheck className="w-5 h-5" />
              <span>جدار الحماية والأمان (FortiGate HA)</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
              حالة الفلترة وحماية IPS/IDS: <span className="text-emerald-600 font-black">يعمل بكفاءة</span>
            </p>
            <p className="text-xs font-bold text-slate-500">
              أنفاق VPN النشطة بين المواقع: 13 / 14 نفق متصل
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5 text-blue-600 font-black">
              <Sliders className="w-5 h-5" />
              <span>توزيع الأجهزة الشبكية</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
              نقاط الاتصال اللاسلكية: {state.network.accessPointsActive} / {state.network.accessPointsTotal}
            </p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
              المفاتيح المركزية (Core Switches): {state.network.switchesActive} / {state.network.switchesTotal}
            </p>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
              الموجهات الحدودية (Edge Routers): {state.network.routersActive} / {state.network.routersTotal}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 4. الخوادم والأنظمة
  if (activePage === 'servers') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                الخوادم والأنظمة والخدمات المركزية
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                انقر على أي خدمة لتبديل حالتها (يعمل / صيانة / متوقف) ومعاينة التزامن في لوحة التحكم
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(updateServiceAllRunning())}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تشغيل جميع الخدمات</span>
            </button>
            {renderBackToDashboardButton()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {state.services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => dispatch(toggleServiceStatus(srv.id))}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-400 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-black text-sm text-[#091e3a] dark:text-white">{srv.name}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                    srv.status === 'running'
                      ? 'bg-[#d4f4dc] text-[#147a36]'
                      : srv.status === 'maintenance'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {srv.status === 'running' ? 'يعمل' : srv.status === 'maintenance' ? 'صيانة' : 'متوقف'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>عنوان IP:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{srv.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" /> المعالج:
                  </span>
                  <span className="tabular-nums">{srv.cpuUsage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5" /> الذاكرة:
                  </span>
                  <span className="tabular-nums">{srv.ramUsage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. المستخدمون والصلاحيات
  if (activePage === 'users') {
    const handleCreateEmployee = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newEmpName.trim()) return;
      dispatch(
        addEmployee({
          name: newEmpName.trim(),
          title: newEmpTitle.trim() || 'مهندس مشروع',
          department: newEmpDept,
          site: 'الموقع الرئيسي',
          role: 'مهندس موقع',
          active: true,
        })
      );
      setNewEmpName('');
      setNewEmpTitle('');
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                المستخدمون والصلاحيات ({state.metrics.totalEmployees} موظفاً)
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                إدارة حسابات الدومين (Active Directory) وصلاحيات مديري المشاريع والشبكة
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <form
          onSubmit={handleCreateEmployee}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div>
            <label className="block text-xs font-extrabold mb-1">اسم الموظف</label>
            <input
              type="text"
              required
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
              placeholder="مثال: م. زياد طارق"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">المسمى الوظيفي</label>
            <input
              type="text"
              value={newEmpTitle}
              onChange={(e) => setNewEmpTitle(e.target.value)}
              placeholder="مهندس تنفيذ أول"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">الإدارة</label>
            <input
              type="text"
              value={newEmpDept}
              onChange={(e) => setNewEmpDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e4da4] text-white text-xs font-extrabold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة موظف</span>
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-right text-xs font-bold">
            <thead className="bg-[#dce8f5] dark:bg-slate-800 text-[#0c2340] dark:text-slate-200 font-black">
              <tr>
                <th className="py-3 px-4">الاسم</th>
                <th className="py-3 px-4">المسمى الوظيفي</th>
                <th className="py-3 px-4">الإدارة</th>
                <th className="py-3 px-4">الموقع</th>
                <th className="py-3 px-4">الصلاحية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="py-3 px-4 font-black text-sm">{emp.name}</td>
                  <td className="py-3 px-4">{emp.title}</td>
                  <td className="py-3 px-4">{emp.department}</td>
                  <td className="py-3 px-4">{emp.site}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {emp.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 6. المراقبة والتنبيهات
  if (activePage === 'alerts') {
    const handleCreateAlert = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newAlertText.trim()) return;
      dispatch(
        addAlert({
          message: newAlertText.trim(),
          severity: newAlertSeverity,
          location: newAlertLocation,
          timestamp: 'الآن',
        })
      );
      setNewAlertText('');
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dc2626] text-white flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                المراقبة والتنبيهات والإنذارات
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                إدارة الإنذارات الفورية للشبكة والخوادم والمواقع الهندسية
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <form
          onSubmit={handleCreateAlert}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div className="sm:col-span-2">
            <label className="block text-xs font-extrabold mb-1">نص التنبيه الجديد</label>
            <input
              type="text"
              required
              value={newAlertText}
              onChange={(e) => setNewAlertText(e.target.value)}
              placeholder="مثال: ارتفاع درجة حرارة غرفة الخوادم في موقع 2"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">مستوى الأهمية</label>
            <select
              value={newAlertSeverity}
              onChange={(e) => setNewAlertSeverity(e.target.value as 'critical' | 'warning' | 'info')}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            >
              <option value="critical">حرج (أحمر)</option>
              <option value="warning">تحذير (برتقالي)</option>
              <option value="info">معلومات (أزرق)</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#dc2626] hover:bg-red-700 text-white text-xs font-extrabold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة تنبيه</span>
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 divide-y divide-slate-200/70 dark:divide-slate-800">
          {state.alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => dispatch(toggleAlertResolved(alert.id))}
              className="py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className={`w-5 h-5 ${
                    alert.severity === 'critical'
                      ? 'text-red-600'
                      : alert.severity === 'warning'
                      ? 'text-amber-500'
                      : 'text-blue-500'
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-extrabold ${
                      alert.resolved ? 'line-through text-slate-400' : 'text-[#091e3a] dark:text-white'
                    }`}
                  >
                    {alert.message}
                  </p>
                  <span className="text-xs text-slate-500">
                    {alert.location} · {alert.timestamp}
                  </span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  alert.resolved
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {alert.resolved ? 'تمت المعالجة ✓' : 'نشط (انقر للمعالجة)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. التقارير والتحليل
  if (activePage === 'reports') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                التقارير والتحليل المالي والهندسي
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                ملخص العقود والتكلفة الفعلية والمتبقي من الميزانية لكافة مشاريع الشركة
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-extrabold text-slate-500">إجمالي قيمة العقود</span>
            <p className="text-2xl font-black text-[#091e3a] dark:text-white mt-1 tabular-nums">
              {state.metrics.totalContractValue.toLocaleString('en-US')} ج.م
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-extrabold text-slate-500">
              التكلفة الفعلية المنصرفة ({state.metrics.actualCostPercent}%)
            </span>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
              {state.metrics.actualCost.toLocaleString('en-US')} ج.م
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-extrabold text-slate-500">
              المتبقي من الميزانية ({state.metrics.remainingBudgetPercent}%)
            </span>
            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
              {state.metrics.remainingBudget.toLocaleString('en-US')} ج.م
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 8. إدارة الطلبات (المهام والإجراءات)
  if (activePage === 'requests') {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                إدارة الطلبات والمهام والإجراءات
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                تحديث أعداد الموافقات المعلقة وطلبات الدعم الفني ومهام الصيانة
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <h3 className="font-black text-sm text-[#091e3a] dark:text-white">{task.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">العدد الحالي المسجل في اللوحة: {task.count}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(updateTaskCount({ id: task.id, delta: -1 }))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 font-black hover:bg-slate-200 cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-black text-base tabular-nums">{task.count}</span>
                <button
                  type="button"
                  onClick={() => dispatch(updateTaskCount({ id: task.id, delta: 1 }))}
                  className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black hover:bg-blue-700 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. إدارة الأصول
  if (activePage === 'assets') {
    const handleAddAsset = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newAssetName.trim()) return;
      dispatch(
        addAsset({
          name: newAssetName.trim(),
          code: newAssetCode.trim() || `AST-${Date.now().toString().slice(-3)}`,
          category: 'خوادم وشبكات',
          site: newAssetSite,
          status: 'يعمل بكفاءة',
          value: 450000,
        })
      );
      setNewAssetName('');
      setNewAssetCode('');
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
                إدارة الأصول الهندسية والتقنية
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                سجل المعدات الهندسية والخوادم وأجهزة الشبكات في المواقع
              </p>
            </div>
          </div>
          {renderBackToDashboardButton()}
        </div>

        <form
          onSubmit={handleAddAsset}
          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div>
            <label className="block text-xs font-extrabold mb-1">اسم الأصل / المعدة</label>
            <input
              type="text"
              required
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              placeholder="مثال: مولد كهربائي Caterpillar 500kVA"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">الرقم الكودي</label>
            <input
              type="text"
              value={newAssetCode}
              onChange={(e) => setNewAssetCode(e.target.value)}
              placeholder="GEN-CAT-09"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold mb-1">الموقع</label>
            <input
              type="text"
              value={newAssetSite}
              onChange={(e) => setNewAssetSite(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0e4da4] text-white text-xs font-extrabold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أصل</span>
          </button>
        </form>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-right text-xs font-bold">
            <thead className="bg-[#dce8f5] dark:bg-slate-800 text-[#0c2340] dark:text-slate-200 font-black">
              <tr>
                <th className="py-3 px-4">اسم الأصل</th>
                <th className="py-3 px-4">الكود</th>
                <th className="py-3 px-4">التصنيف</th>
                <th className="py-3 px-4">الموقع</th>
                <th className="py-3 px-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.assets.map((ast) => (
                <tr key={ast.id}>
                  <td className="py-3 px-4 font-black text-sm">{ast.name}</td>
                  <td className="py-3 px-4 font-mono">{ast.code}</td>
                  <td className="py-3 px-4">{ast.category}</td>
                  <td className="py-3 px-4">{ast.site}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {ast.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 10. الإعدادات
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
              إعدادات النظام والمظهر والحفظ التلقائي
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              التحكم في الوضع الليلي/الفاتح ومزامنة Redux Toolkit مع التخزين المحلي (LocalStorage)
            </p>
          </div>
        </div>
        {renderBackToDashboardButton()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-black text-base text-[#091e3a] dark:text-white">المظهر (الوضع الفاتح / الداكن)</h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setTheme('light'))}
              className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs border cursor-pointer transition-all ${
                state.theme === 'light'
                  ? 'bg-[#0e4da4] text-white border-[#0e4da4]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              الوضع الفاتح (الافتراضي)
            </button>
            <button
              type="button"
              onClick={() => dispatch(setTheme('dark'))}
              className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs border cursor-pointer transition-all ${
                state.theme === 'dark'
                  ? 'bg-[#0e4da4] text-white border-[#0e4da4]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              الوضع الليلي الداكن
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-[#091e3a] dark:text-white flex items-center gap-2">
                <Save className="w-4 h-4 text-blue-600" />
                <span>الحفظ التلقائي في التخزين المحلي</span>
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                آخر حفظ مسجل: {state.lastSavedAt}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(setAutoSaveEnabled(!state.autoSaveEnabled))}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold cursor-pointer ${
                state.autoSaveEnabled
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {state.autoSaveEnabled ? 'مفعّل ✓' : 'معطّل'}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => dispatch(resetToDefaults())}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>استعادة البيانات الأصلية للصورة المرفقة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
