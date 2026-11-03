import React, { useEffect, useRef, useState } from 'react';
import { User } from 'firebase/auth';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  HardDrive,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  deleteDriveFile,
  downloadDriveFileText,
  DriveFileItem,
  getCurrentUser,
  googleSignIn,
  initAuth,
  listDriveFiles,
  logoutGoogle,
  updateDriveFileContent,
  uploadFileToDrive,
} from '../services/googleDriveService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { importDashboardState, setActivePage } from '../store/dashboardSlice';

export const GoogleSignInButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
}> = ({ onClick, disabled, compact }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    dir="ltr"
    className={`inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#1f1f1f] border border-[#747775]/40 rounded-full font-medium shadow-xs transition-all cursor-pointer disabled:opacity-60 ${
      compact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
    }`}
  >
    <div className={compact ? 'w-4 h-4 shrink-0' : 'w-5 h-5 shrink-0'}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-full h-full block"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
    </div>
    <span className="font-bold whitespace-nowrap">Sign in with Google</span>
  </button>
);

interface PendingConfirmation {
  type: 'delete' | 'overwrite';
  file: DriveFileItem;
}

export const GoogleDrivePanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.dashboard);

  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [driveSearch, setDriveSearch] = useState<string>('');
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirmation | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFiles = async (query = driveSearch) => {
    setIsLoadingFiles(true);
    setStatusBanner(null);
    try {
      const result = await listDriveFiles(query);
      setFiles(result);
      setNeedsAuth(false);
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') {
        setNeedsAuth(true);
      } else {
        setStatusBanner({
          type: 'error',
          text: err?.message || 'حدث خطأ أثناء تحميل ملفات Google Drive',
        });
      }
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser) => {
        setUser(authedUser);
        setNeedsAuth(false);
        loadFiles('');
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusBanner(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        await loadFiles('');
        setStatusBanner({
          type: 'success',
          text: 'تم تسجيل الدخول وربط Google Drive بنجاح',
        });
      }
    } catch (err: any) {
      setStatusBanner({
        type: 'error',
        text: err?.message || 'تعذر تسجيل الدخول عبر Google',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setNeedsAuth(true);
    setFiles([]);
  };

  // Upload full JSON backup of dashboard state to Google Drive
  const handleBackupDashboardToDrive = async () => {
    setIsSubmitting(true);
    setStatusBanner(null);
    try {
      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `نسخة_احتياطية_لوحة_التحكم_${dateStr}.json`;
      const jsonContent = JSON.stringify(dashboardState, null, 2);
      const created = await uploadFileToDrive(fileName, jsonContent, 'application/json');
      setStatusBanner({
        type: 'success',
        text: `تم حفظ النسخة الاحتياطية "${created.name}" في Google Drive بنجاح`,
      });
      await loadFiles(driveSearch);
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') setNeedsAuth(true);
      else
        setStatusBanner({
          type: 'error',
          text: err?.message || 'فشل في رفع النسخة الاحتياطية إلى Google Drive',
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload Projects & Sites CSV report to Google Drive
  const handleExportCsvReportToDrive = async () => {
    setIsSubmitting(true);
    setStatusBanner(null);
    try {
      const headers = 'المشروع,الموقع,مدير المشروع,نسبة التنفيذ,التسليم الابتدائي,التسليم النهائي,الميزانية\n';
      const rows = dashboardState.projects
        .map(
          (p) =>
            `"${p.name}","${p.siteName}","${p.manager}",${p.executionRate}%,${p.initialHandover}%,${p.finalHandover}%,${p.budget}`
        )
        .join('\n');
      const csvContent = '\uFEFF' + headers + rows;
      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `تقرير_المشاريع_الهندسية_${dateStr}.csv`;
      const created = await uploadFileToDrive(fileName, csvContent, 'text/csv;charset=utf-8');
      setStatusBanner({
        type: 'success',
        text: `تم تصدير تقرير المشاريع "${created.name}" إلى Google Drive بنجاح`,
      });
      await loadFiles(driveSearch);
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') setNeedsAuth(true);
      else
        setStatusBanner({
          type: 'error',
          text: err?.message || 'فشل في تصدير التقرير إلى Google Drive',
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upload any local file chosen by user
  const handleLocalFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSubmitting(true);
    setStatusBanner(null);
    try {
      const created = await uploadFileToDrive(
        file.name,
        file,
        file.type || 'application/octet-stream'
      );
      setStatusBanner({
        type: 'success',
        text: `تم رفع الملف "${created.name}" إلى Google Drive بنجاح`,
      });
      await loadFiles(driveSearch);
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') setNeedsAuth(true);
      else
        setStatusBanner({
          type: 'error',
          text: err?.message || 'فشل في رفع الملف المحدد',
        });
    } finally {
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Restore dashboard state from a JSON file in Google Drive
  const handleRestoreFromDriveJson = async (file: DriveFileItem) => {
    setIsSubmitting(true);
    setStatusBanner(null);
    try {
      const rawText = await downloadDriveFileText(file.id);
      const parsed = JSON.parse(rawText);
      dispatch(importDashboardState(parsed));
      setStatusBanner({
        type: 'success',
        text: `تمت استعادة بيانات لوحة التحكم من الملف "${file.name}" بنجاح`,
      });
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') setNeedsAuth(true);
      else
        setStatusBanner({
          type: 'error',
          text: 'تعذر استيراد البيانات: تأكد من أن الملف عبارة عن نسخة احتياطية صالحة بصيغة JSON',
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirmed destructive/mutating action handler
  const handleExecuteConfirmedAction = async () => {
    if (!pendingConfirm) return;
    const { type, file } = pendingConfirm;
    setPendingConfirm(null);
    setIsSubmitting(true);
    setStatusBanner(null);

    try {
      if (type === 'delete') {
        await deleteDriveFile(file.id);
        setFiles((prev) => prev.filter((f) => f.id !== file.id));
        setStatusBanner({
          type: 'success',
          text: `تم حذف الملف "${file.name}" من Google Drive`,
        });
      } else if (type === 'overwrite') {
        const jsonContent = JSON.stringify(dashboardState, null, 2);
        await updateDriveFileContent(file.id, jsonContent, 'application/json');
        setStatusBanner({
          type: 'success',
          text: `تم تحديث محتوى الملف "${file.name}" بأحدث بيانات اللوحة`,
        });
        await loadFiles(driveSearch);
      }
    } catch (err: any) {
      if (err?.message === 'NEEDS_AUTH') setNeedsAuth(true);
      else
        setStatusBanner({
          type: 'error',
          text: err?.message || 'فشلت العملية على Google Drive',
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytesStr?: string) => {
    if (!bytesStr) return '—';
    const bytes = Number(bytesStr);
    if (isNaN(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e4da4] text-white flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#091e3a] dark:text-white">
              تكامل Google Drive وإدارة الملفات والنسخ الاحتياطي
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              استعراض ملفات المشاريع والعقود الهندسية وحفظ واستعادة بيانات لوحة التحكم عبر Google Drive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!needsAuth && user && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">● متصل:</span>
              <span>{user.displayName || user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1 mr-1 cursor-pointer"
                title="تسجيل الخروج من Google"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => dispatch(setActivePage('dashboard'))}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e4da4] hover:bg-[#0b3d82] text-white text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى لوحة التحكم</span>
          </button>
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusBanner && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-extrabold ${
            statusBanner.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusBanner.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{statusBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="text-xs underline opacity-75 hover:opacity-100 cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Unauthenticated State: Prompt Sign in with Google */}
      {needsAuth ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center max-w-xl mx-auto my-4 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 text-[#0e4da4] dark:text-blue-400 flex items-center justify-center mx-auto">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-[#091e3a] dark:text-white">
              ربط حساب Google Drive
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
              قم بتسجيل الدخول باستخدام حساب Google للوصول إلى ملفات المشاريع الهندسية، ورفع المستندات، وحفظ نسخ احتياطية فورية من بيانات لوحة التحكم الشاملة في حسابك على Google Drive.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <GoogleSignInButton onClick={handleLogin} disabled={isLoggingIn} />
          </div>
        </div>
      ) : (
        <>
          {/* Action Toolbar: Upload, Cloud Backup, Export CSV, Search */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleBackupDashboardToDrive}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0e4da4] hover:bg-blue-800 text-white text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50"
              >
                <CloudUpload className="w-4 h-4" />
                <span>حفظ نسخة احتياطية للوحة (JSON)</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleExportCsvReportToDrive}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>تصدير جدول المشاريع (CSV)</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleLocalFileSelected}
                className="hidden"
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#091e3a] dark:text-slate-100 text-xs font-extrabold transition-colors cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>رفع ملف من الجهاز</span>
              </button>
            </div>

            {/* Search & Refresh Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loadFiles(driveSearch);
              }}
              className="flex items-center gap-2 flex-1 sm:flex-initial min-w-[260px]"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={driveSearch}
                  onChange={(e) => setDriveSearch(e.target.value)}
                  placeholder="ابحث في ملفات Google Drive..."
                  className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                disabled={isLoadingFiles}
                className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-slate-800 text-[#0e4da4] dark:text-blue-400 text-xs font-extrabold hover:bg-blue-100 cursor-pointer"
              >
                بحث
              </button>
              <button
                type="button"
                disabled={isLoadingFiles}
                onClick={() => loadFiles(driveSearch)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                title="تحديث القائمة"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
              </button>
            </form>
          </div>

          {/* Files Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs font-bold">
                <thead className="bg-[#dce8f5] dark:bg-slate-800 text-[#0c2340] dark:text-slate-200 font-black">
                  <tr>
                    <th className="py-3 px-4">اسم الملف</th>
                    <th className="py-3 px-3">النوع</th>
                    <th className="py-3 px-3">الحجم</th>
                    <th className="py-3 px-3">آخر تعديل</th>
                    <th className="py-3 px-4 text-left">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {isLoadingFiles ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        جاري تحميل الملفات من Google Drive...
                      </td>
                    </tr>
                  ) : files.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        لا توجد ملفات مطابقة في Google Drive حالياً. يمكنك رفع ملف أو حفظ نسخة احتياطية الآن.
                      </td>
                    </tr>
                  ) : (
                    files.map((file) => {
                      const isJson =
                        file.mimeType.includes('json') || file.name.toLowerCase().endsWith('.json');
                      return (
                        <tr
                          key={file.id}
                          className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-black text-sm text-[#091e3a] dark:text-white">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#1560bd] dark:text-blue-400 shrink-0" />
                              <span className="truncate max-w-xs sm:max-w-md">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {file.mimeType.replace('application/vnd.google-apps.', 'google/')}
                          </td>
                          <td dir="ltr" className="py-3 px-3 text-right tabular-nums text-slate-600 dark:text-slate-300">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="py-3 px-3 tabular-nums text-slate-500">
                            {file.modifiedTime
                              ? new Date(file.modifiedTime).toLocaleString('ar-EG')
                              : '—'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-1.5">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px]"
                                  title="فتح في Google Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>فتح</span>
                                </a>
                              )}

                              {isJson && (
                                <>
                                  <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => handleRestoreFromDriveJson(file)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] cursor-pointer"
                                    title="استعادة بيانات لوحة التحكم من هذا الملف"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>استعادة</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() =>
                                      setPendingConfirm({ type: 'overwrite', file })
                                    }
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] cursor-pointer"
                                    title="تحديث هذا الملف بأحدث بيانات لوحة التحكم"
                                  >
                                    <CloudUpload className="w-3.5 h-3.5" />
                                    <span>تحديث</span>
                                  </button>
                                </>
                              )}

                              <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setPendingConfirm({ type: 'delete', file })}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[11px] cursor-pointer"
                                title="حذف الملف من Google Drive"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>حذف</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Explicit User Confirmation Modal for Destructive / Mutating Operations */}
      {pendingConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div
            dir="rtl"
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full p-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  pendingConfirm.type === 'delete'
                    ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                    : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#091e3a] dark:text-white">
                  {pendingConfirm.type === 'delete'
                    ? 'تأكيد حذف الملف من Google Drive'
                    : 'تأكيد استبدال محتوى الملف على Google Drive'}
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  يتطلب هذا الإجراء موافقتك الصريحة قبل التنفيذ
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
              {pendingConfirm.type === 'delete' ? (
                <p>
                  هل أنت متأكد من رغبتك في حذف الملف{' '}
                  <span className="font-black text-rose-600 dark:text-rose-400">
                    "{pendingConfirm.file.name}"
                  </span>{' '}
                  نهائياً من حسابك في Google Drive؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
              ) : (
                <p>
                  هل أنت متأكد من رغبتك في تحديث واستبدال محتوى الملف{' '}
                  <span className="font-black text-amber-600 dark:text-amber-400">
                    "{pendingConfirm.file.name}"
                  </span>{' '}
                  بالبيانات الحالية للوحة التحكم؟
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPendingConfirm(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleExecuteConfirmedAction}
                className={`px-4 py-2 rounded-xl text-white text-xs font-extrabold cursor-pointer ${
                  pendingConfirm.type === 'delete'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {pendingConfirm.type === 'delete' ? 'تأكيد الحذف النهائي' : 'تأكيد التحديث'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
