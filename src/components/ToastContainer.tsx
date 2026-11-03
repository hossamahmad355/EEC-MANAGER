import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Power,
  Server,
  Trash2,
  Wifi,
  X,
  XCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  clearAllToasts,
  dismissToast,
  setServiceStatus,
  toggleSiteConnection,
} from '../store/dashboardSlice';
import { ToastNotificationItem } from '../types/dashboard';

interface SingleToastProps {
  toast: ToastNotificationItem;
  onDismiss: (id: string) => void;
}

const statusBadgeStyle = (code?: 'UP' | 'WARN' | 'DOWN') => {
  if (code === 'UP') {
    return 'bg-[#d4f4dc] dark:bg-emerald-950 text-[#147a36] dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800';
  }
  if (code === 'WARN') {
    return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300/80 dark:border-amber-800';
  }
  return 'bg-[#fad5d8] dark:bg-rose-950 text-[#c81e1e] dark:text-rose-300 border-rose-300/80 dark:border-rose-800';
};

const statusDotStyle = (code?: 'UP' | 'WARN' | 'DOWN') => {
  if (code === 'UP') return 'bg-[#16a34a]';
  if (code === 'WARN') return 'bg-[#f59e0b]';
  return 'bg-[#dc2626]';
};

const SingleToastCard: React.FC<SingleToastProps> = ({ toast, onDismiss }) => {
  const dispatch = useAppDispatch();
  const [isPaused, setIsPaused] = useState(false);
  const duration = toast.durationMs || 5500;

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, isPaused, onDismiss]);

  const handleQuickRestore = () => {
    if (toast.targetType === 'server' && toast.targetId) {
      dispatch(setServiceStatus({ id: toast.targetId, status: 'running' }));
      onDismiss(toast.id);
    } else if (toast.targetType === 'site' && toast.targetId) {
      dispatch(toggleSiteConnection(toast.targetId));
      onDismiss(toast.id);
    }
  };

  const themeConfig =
    toast.type === 'critical'
      ? {
          border: 'border-rose-300 dark:border-rose-800/90',
          accentBar: 'bg-gradient-to-b from-rose-500 to-red-600',
          iconBg: 'bg-rose-100 dark:bg-rose-950/90 text-rose-600 dark:text-rose-400',
          progressBg: 'bg-rose-500',
          Icon: XCircle,
        }
      : toast.type === 'warning'
      ? {
          border: 'border-amber-300 dark:border-amber-800/90',
          accentBar: 'bg-gradient-to-b from-amber-400 to-amber-600',
          iconBg: 'bg-amber-100 dark:bg-amber-950/90 text-amber-600 dark:text-amber-400',
          progressBg: 'bg-amber-500',
          Icon: AlertTriangle,
        }
      : toast.type === 'success'
      ? {
          border: 'border-emerald-300 dark:border-emerald-800/90',
          accentBar: 'bg-gradient-to-b from-emerald-500 to-green-600',
          iconBg: 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-600 dark:text-emerald-400',
          progressBg: 'bg-emerald-500',
          Icon: CheckCircle2,
        }
      : {
          border: 'border-blue-300 dark:border-blue-800/90',
          accentBar: 'bg-gradient-to-b from-blue-500 to-indigo-600',
          iconBg: 'bg-blue-100 dark:bg-blue-950/90 text-blue-600 dark:text-blue-400',
          progressBg: 'bg-blue-500',
          Icon: Activity,
        };

  const IconComponent = themeConfig.Icon;
  const canRestore =
    (toast.toStatus === 'DOWN' || toast.toStatus === 'WARN') &&
    Boolean(toast.targetId && toast.targetType);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.94 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      className={`relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border ${themeConfig.border} shadow-[0_12px_32px_rgba(9,30,58,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] p-3.5 pr-4 w-full max-w-[390px] pointer-events-auto`}
    >
      {/* Right Accent Indicator Bar (RTL) */}
      <div className={`absolute top-0 right-0 bottom-0 w-1.5 ${themeConfig.accentBar}`} />

      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`w-9 h-9 rounded-xl ${themeConfig.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
        >
          <IconComponent className="w-5 h-5 stroke-[2.3]" />
        </div>

        {/* Main Toast Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-[13px] font-black text-[#091e3a] dark:text-white leading-snug">
              {toast.title}
            </h4>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11.5px] font-bold text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {toast.message}
          </p>

          {/* Status Transition Pill (e.g., UP ➔ DOWN) + IP/Location Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              {toast.fromStatus && toast.toStatus && (
                <div
                  dir="ltr"
                  className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700"
                >
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-black border ${statusBadgeStyle(
                      toast.fromStatus
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyle(toast.fromStatus)}`} />
                    {toast.fromStatus}
                  </span>
                  <ArrowLeft className="w-3 h-3 text-slate-400 rotate-180" />
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-black border ${statusBadgeStyle(
                      toast.toStatus
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotStyle(toast.toStatus)}`} />
                    {toast.toStatus}
                  </span>
                </div>
              )}

              {toast.ipOrLocation && (
                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10.5px] font-mono font-bold text-slate-600 dark:text-slate-300"
                >
                  {toast.targetType === 'site' ? (
                    <Wifi className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Server className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  )}
                  {toast.ipOrLocation}
                </span>
              )}
            </div>

            <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500">
              {toast.timestamp}
            </span>
          </div>

          {/* Quick Action to Restore Server/Node directly from the Toast */}
          {canRestore && (
            <div className="mt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={handleQuickRestore}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-2xs transition-colors cursor-pointer"
              >
                <Power className="w-3 h-3" />
                <span>إعادة تشغيل فورية (Restore UP)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animated Auto-Dismiss Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {!isPaused && (
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
            className={`h-full ${themeConfig.progressBg}`}
          />
        )}
      </div>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.dashboard.toasts || []);

  return (
    <div
      dir="rtl"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex flex-col-reverse items-start gap-2.5 w-[calc(100vw-2rem)] max-w-[390px] pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <SingleToastCard
            key={toast.id}
            toast={toast}
            onDismiss={(id) => dispatch(dismissToast(id))}
          />
        ))}
      </AnimatePresence>

      {toasts.length > 1 && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          type="button"
          onClick={() => dispatch(clearAllToasts())}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#091e3a]/90 dark:bg-slate-800/95 hover:bg-[#091e3a] text-white text-[11px] font-extrabold shadow-md backdrop-blur-xs transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>إغلاق كل التنبيهات ({toasts.length})</span>
        </motion.button>
      )}
    </div>
  );
};
