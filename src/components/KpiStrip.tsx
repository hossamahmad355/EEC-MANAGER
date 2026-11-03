import React from 'react';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setActivePage } from '../store/dashboardSlice';
import { NavSectionId } from '../types/dashboard';

export const KpiStrip: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics } = useAppSelector((state) => state.dashboard);

  const formatMoney = (num: number) => num.toLocaleString('en-US');

  const cards: {
    id: string;
    label: string;
    targetPage: NavSectionId;
    renderValue: () => React.ReactNode;
    iconBgClass: string;
    renderIcon: () => React.ReactNode;
  }[] = [
    // 1. Rightmost Card (in RTL): المتبقي من الميزانية
    {
      id: 'remaining-budget',
      label: 'المتبقي من الميزانية',
      targetPage: 'reports',
      iconBgClass:
        'bg-[#fae2e4] dark:bg-rose-950/70 text-[#d9383a] dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/50',
      renderValue: () => (
        <div className="flex flex-col items-start text-right leading-tight mt-0.5 w-full">
          <div className="flex items-baseline gap-0.5 font-black text-[12px] xl:text-[12.5px] 2xl:text-[14px] text-[#091e3a] dark:text-white tabular-nums whitespace-nowrap">
            <span>{formatMoney(metrics.remainingBudget)}</span>
            <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">ج.م</span>
          </div>
          <span
            dir="ltr"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tabular-nums"
          >
            ({metrics.remainingBudgetPercent}%)
          </span>
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M22 12A10 10 0 0 0 12 2v10z"
            fill="currentColor"
            fillOpacity="0.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    // 2. التكلفة الفعلية
    {
      id: 'actual-cost',
      label: 'التكلفة الفعلية',
      targetPage: 'reports',
      iconBgClass:
        'bg-[#dcebfa] dark:bg-blue-950/70 text-[#1560bd] dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/50',
      renderValue: () => (
        <div className="flex flex-col items-start text-right leading-tight mt-0.5 w-full">
          <div className="flex items-baseline gap-0.5 font-black text-[12px] xl:text-[12.5px] 2xl:text-[14px] text-[#091e3a] dark:text-white tabular-nums whitespace-nowrap">
            <span>{formatMoney(metrics.actualCost)}</span>
            <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">ج.م</span>
          </div>
          <span
            dir="ltr"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tabular-nums"
          >
            ({metrics.actualCostPercent}%)
          </span>
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="13" width="3.5" height="7" rx="0.8" />
          <rect x="8.5" y="9" width="3.5" height="11" rx="0.8" />
          <rect x="14" y="6" width="3.5" height="14" rx="0.8" />
          <path
            d="M3 10L9 5.5L14 7.5L20 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    // 3. إجمالي قيمة العقود
    {
      id: 'contracts-value',
      label: 'إجمالي قيمة العقود',
      targetPage: 'projects',
      iconBgClass:
        'bg-[#dcebfa] dark:bg-blue-950/70 text-[#1560bd] dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/50',
      renderValue: () => (
        <div className="flex items-baseline gap-0.5 font-black text-[12px] xl:text-[12.5px] 2xl:text-[14px] text-[#091e3a] dark:text-white tabular-nums whitespace-nowrap mt-1">
          <span>{formatMoney(metrics.totalContractValue)}</span>
          <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">ج.م</span>
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="6" rx="7" ry="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M5 6v5c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 11v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
        </svg>
      ),
    },
    // 4. نسبة الإنجاز العامة
    {
      id: 'overall-completion',
      label: 'نسبة الإنجاز العامة',
      targetPage: 'projects',
      iconBgClass:
        'bg-[#dcfce7] dark:bg-emerald-950/70 text-[#16a34a] dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50',
      renderValue: () => (
        <div className="flex items-center justify-start gap-1 mt-1 w-full">
          <span
            dir="ltr"
            className="font-black text-[18px] xl:text-[20px] 2xl:text-[22px] text-[#091e3a] dark:text-white tabular-nums leading-none"
          >
            {metrics.overallCompletion}%
          </span>
          <span
            dir="ltr"
            className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-emerald-100/90 dark:bg-emerald-950/90 text-[#15803d] dark:text-emerald-400 text-[9.5px] font-extrabold tabular-nums whitespace-nowrap"
          >
            ↑ {metrics.overallCompletionDelta}
          </span>
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M8.5 12.5l2.5 2.5 5-5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    // 5. إجمالي المشاريع (Hard hat icon)
    {
      id: 'total-projects',
      label: 'إجمالي المشاريع',
      targetPage: 'projects',
      iconBgClass:
        'bg-[#fdeccf] dark:bg-amber-950/70 text-[#ee9b11] dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50',
      renderValue: () => (
        <div className="w-full text-center font-black text-[20px] xl:text-[22px] 2xl:text-[25px] text-[#091e3a] dark:text-white tabular-nums leading-none mt-1">
          {metrics.totalProjects}
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5 2xl:w-6 2xl:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4c-4.42 0-8 3.58-8 8v2h16v-2c0-4.42-3.58-8-8-8zm-1-1h2v4h-2V3zm-9 13h20v2.5c0 .83-.67 1.5-1.5 1.5h-17c-.83 0-1.5-.67-1.5-1.5V16z" />
        </svg>
      ),
    },
    // 6. إجمالي المواقع
    {
      id: 'total-sites',
      label: 'إجمالي المواقع',
      targetPage: 'sites',
      iconBgClass:
        'bg-[#dcebfa] dark:bg-blue-950/70 text-[#1560bd] dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/50',
      renderValue: () => (
        <div className="w-full text-center font-black text-[20px] xl:text-[22px] 2xl:text-[25px] text-[#091e3a] dark:text-white tabular-nums leading-none mt-1">
          {metrics.totalSites}
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
          <rect x="9" y="3" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="3" y="16" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="9.5" y="16" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
          <rect x="16" y="16" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 8v4m0 0H5.5v4M12 12v4m0-4h6.5v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    // 7. Far Left Card (in RTL): إجمالي الموظفين
    {
      id: 'total-employees',
      label: 'إجمالي الموظفين',
      targetPage: 'users',
      iconBgClass:
        'bg-[#dcebfa] dark:bg-blue-950/70 text-[#1560bd] dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/50',
      renderValue: () => (
        <div className="w-full text-center font-black text-[20px] xl:text-[22px] 2xl:text-[25px] text-[#091e3a] dark:text-white tabular-nums leading-none mt-1">
          {metrics.totalEmployees}
        </div>
      ),
      renderIcon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M6.5 18.5c0-2.6 2.5-4.5 5.5-4.5s5.5 1.9 5.5 4.5v1H6.5v-1z" />
          <circle cx="5.5" cy="9.5" r="2.2" opacity="0.75" />
          <path d="M1.5 18.5c0-1.9 1.6-3.4 3.8-3.6-.5.9-.8 2-.8 3.2v.9H1.5v-.5z" opacity="0.75" />
          <circle cx="18.5" cy="9.5" r="2.2" opacity="0.75" />
          <path d="M22.5 18.5c0-1.9-1.6-3.4-3.8-3.6.5.9.8 2 .8 3.2v.9h3v-.5z" opacity="0.75" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="المؤشرات الرئيسية" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-[1.06fr_1.02fr_1.06fr_1.03fr_0.95fr_0.93fr_0.95fr] gap-2">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            type="button"
            dir="ltr"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.03 }}
            onClick={() => dispatch(setActivePage(card.targetPage))}
            className="group flex items-center justify-between gap-1.5 px-2.5 py-2.5 rounded-2xl bg-gradient-to-b from-white via-[#f9fcff] to-[#eef5fc] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/95 border border-white dark:border-slate-700/80 shadow-[0_4px_14px_rgba(12,35,64,0.08)] hover:shadow-[0_6px_20px_rgba(21,96,189,0.16)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            {/* Left side of card: Circular Icon */}
            <div
              className={`w-8 h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${card.iconBgClass}`}
            >
              {card.renderIcon()}
            </div>

            {/* Right side of card: Label on top, Metric below */}
            <div dir="rtl" className="flex flex-col items-start text-right min-w-0 flex-1">
              <span className="w-full text-right text-[10.5px] xl:text-[11px] 2xl:text-[12px] font-extrabold text-[#102a4c] dark:text-slate-200 whitespace-nowrap leading-snug">
                {card.label}
              </span>
              {card.renderValue()}
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
