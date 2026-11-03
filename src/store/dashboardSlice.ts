import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AlertItem,
  AssetItem,
  DashboardState,
  EmployeeItem,
  NavSectionId,
  ProjectItem,
  SiteStatusItem,
  SystemServiceItem,
  ToastNotificationItem,
} from '../types/dashboard';

export const STORAGE_KEY = 'eec_operations_dashboard_state_v1';

export const initialDashboardState: DashboardState = {
  activePage: 'dashboard',
  theme: 'light',
  autoSaveEnabled: true,
  lastSavedAt: 'الثلاثاء، 2 نوفمبر 2026 - 10:25 ص',
  searchQuery: '',
  currentDateLabel: 'الثلاثاء، 2 نوفمبر 2026',
  userRoleLabel: 'المدير العام / مدير الشبكة',
  metrics: {
    totalEmployees: 317,
    totalSites: 14,
    totalProjects: 27,
    overallCompletion: 78,
    overallCompletionDelta: '+6%',
    totalContractValue: 1250000000,
    actualCost: 870000000,
    actualCostPercent: 69.6,
    remainingBudget: 380000000,
    remainingBudgetPercent: 30.4,
    projectCounts: {
      completed: 6,
      inProgress: 18,
      delayed: 2,
      atRisk: 1,
    },
  },
  projects: [
    {
      id: 'proj-1',
      name: 'مبنى إداري جديد',
      executionRate: 82,
      initialHandover: 70,
      finalHandover: 0,
      status: 'in_progress',
      budget: 240000000,
      spent: 196800000,
      manager: 'م. أحمد عبد العزيز',
      siteName: 'الموقع الرئيسي',
      featuredOnDashboard: true,
    },
    {
      id: 'proj-2',
      name: 'تشطيب المقر الرئيسي',
      executionRate: 76,
      initialHandover: 45,
      finalHandover: 0,
      status: 'in_progress',
      budget: 180000000,
      spent: 136800000,
      manager: 'م. طارق المنشاوي',
      siteName: 'الموقع الرئيسي',
      featuredOnDashboard: true,
    },
    {
      id: 'proj-3',
      name: 'مركز بيانات (تيار خفيف)',
      executionRate: 79,
      initialHandover: 0,
      finalHandover: 0,
      status: 'in_progress',
      budget: 95000000,
      spent: 75050000,
      manager: 'م. حسام أحمد',
      siteName: 'موقع 1',
      featuredOnDashboard: true,
    },
    {
      id: 'proj-4',
      name: 'تطوير نظام التكييف',
      executionRate: 80,
      initialHandover: 0,
      finalHandover: 0,
      status: 'in_progress',
      budget: 65000000,
      spent: 52000000,
      manager: 'م. محمود الشافعي',
      siteName: 'موقع 2',
      featuredOnDashboard: true,
    },
    {
      id: 'proj-5',
      name: 'محطة المحولات الكهربائية الفرعية',
      executionRate: 100,
      initialHandover: 100,
      finalHandover: 100,
      status: 'completed',
      budget: 145000000,
      spent: 141000000,
      manager: 'م. كريم عادل',
      siteName: 'موقع 3',
      featuredOnDashboard: false,
    },
    {
      id: 'proj-6',
      name: 'شبكة الألياف الضوئية للمجمع الهندسي',
      executionRate: 92,
      initialHandover: 85,
      finalHandover: 40,
      status: 'in_progress',
      budget: 54000000,
      spent: 48200000,
      manager: 'م. سارة الجندي',
      siteName: 'موقع 1',
      featuredOnDashboard: false,
    },
    {
      id: 'proj-7',
      name: 'توسعة المستودعات اللوجستية (المرحلة 2)',
      executionRate: 38,
      initialHandover: 0,
      finalHandover: 0,
      status: 'delayed',
      budget: 110000000,
      spent: 44000000,
      manager: 'م. ياسر علام',
      siteName: 'موقع 4',
      featuredOnDashboard: false,
    },
    {
      id: 'proj-8',
      name: 'تأهيل البنية التحتية لموقع 7',
      executionRate: 29,
      initialHandover: 0,
      finalHandover: 0,
      status: 'at_risk',
      budget: 88000000,
      spent: 31500000,
      manager: 'م. وائل درويش',
      siteName: 'موقع 7',
      featuredOnDashboard: false,
    },
  ],
  services: [
    {
      id: 'srv-1',
      name: 'الدومين (Active Directory)',
      iconType: 'active_directory',
      status: 'running',
      uptime: '99.99%',
      cpuUsage: 24,
      ramUsage: 48,
      ipAddress: '10.10.1.10',
    },
    {
      id: 'srv-2',
      name: 'خادم الملفات',
      iconType: 'file_server',
      status: 'running',
      uptime: '99.95%',
      cpuUsage: 32,
      ramUsage: 64,
      ipAddress: '10.10.1.15',
    },
    {
      id: 'srv-3',
      name: 'قاعدة البيانات (SQL Server)',
      iconType: 'sql_server',
      status: 'running',
      uptime: '99.98%',
      cpuUsage: 58,
      ramUsage: 76,
      ipAddress: '10.10.1.20',
    },
    {
      id: 'srv-4',
      name: 'خادم البورتال (EEC Portal)',
      iconType: 'portal',
      status: 'running',
      uptime: '99.94%',
      cpuUsage: 41,
      ramUsage: 55,
      ipAddress: '10.10.1.25',
    },
    {
      id: 'srv-5',
      name: 'خدمة البريد الإلكتروني',
      iconType: 'email',
      status: 'running',
      uptime: '99.97%',
      cpuUsage: 29,
      ramUsage: 61,
      ipAddress: '10.10.1.30',
    },
    {
      id: 'srv-6',
      name: 'خدمة المصادقة (NPS / 802.1X)',
      iconType: 'auth_nps',
      status: 'running',
      uptime: '100%',
      cpuUsage: 18,
      ramUsage: 34,
      ipAddress: '10.10.1.35',
    },
    {
      id: 'srv-7',
      name: 'خدمة DHCP',
      iconType: 'dhcp',
      status: 'running',
      uptime: '100%',
      cpuUsage: 12,
      ramUsage: 28,
      ipAddress: '10.10.1.11',
    },
    {
      id: 'srv-8',
      name: 'خدمة DNS',
      iconType: 'dns',
      status: 'running',
      uptime: '100%',
      cpuUsage: 14,
      ramUsage: 30,
      ipAddress: '10.10.1.12',
    },
  ],
  alerts: [
    {
      id: 'alt-1',
      message: 'ارتفاع استخدام الإنترنت (85%) في الموقع الرئيسي',
      severity: 'critical',
      timestamp: 'منذ 10 دقائق',
      location: 'الموقع الرئيسي',
      resolved: false,
    },
    {
      id: 'alt-2',
      message: 'فشل في الاتصال بموقع (موقع 7)',
      severity: 'warning',
      timestamp: 'منذ 25 دقيقة',
      location: 'موقع 7',
      resolved: false,
    },
    {
      id: 'alt-3',
      message: 'تحديثات مطلوبة لخوادم النظام (2)',
      severity: 'info',
      timestamp: 'منذ ساعة',
      location: 'مركز البيانات الرئيسي',
      resolved: false,
    },
    {
      id: 'alt-4',
      message: 'تجاوز سعة التخزين الاحتياطي نسبة (80%) في خادم الملفات',
      severity: 'warning',
      timestamp: 'منذ ساعتين',
      location: 'الموقع الرئيسي',
      resolved: false,
    },
    {
      id: 'alt-5',
      message: 'اكتمال الفحص الدوري لجدار الحماية (FortiGate HA) بنجاح',
      severity: 'info',
      timestamp: 'منذ 3 ساعات',
      location: 'الشبكة المركزية',
      resolved: true,
    },
    {
      id: 'alt-6',
      message: 'انخفاض سرعة استجابة رابط الـ VPN في موقع 3',
      severity: 'warning',
      timestamp: 'منذ 4 ساعات',
      location: 'موقع 3',
      resolved: false,
    },
  ],
  tasks: [
    {
      id: 'tsk-1',
      title: 'موافقات معلقة على المشاريع',
      count: 12,
      badgeColor: 'red',
      targetPage: 'projects',
    },
    {
      id: 'tsk-2',
      title: 'طلبات دعم فني مفتوحة',
      count: 5,
      badgeColor: 'amber',
      targetPage: 'requests',
    },
    {
      id: 'tsk-3',
      title: 'مهام صيانة مجدولة',
      count: 7,
      badgeColor: 'blue',
      targetPage: 'servers',
    },
    {
      id: 'tsk-4',
      title: 'تحديثات الأنظمة',
      count: 3,
      badgeColor: 'blue',
      targetPage: 'alerts',
    },
  ],
  sites: [
    {
      id: 'site-main',
      name: 'الموقع الرئيسي',
      connected: true,
      internetUsage: 72,
      devicesCount: 120,
      bandwidthMbps: 500,
      manager: 'م. حسام أحمد',
      city: 'القاهرة الجديدة',
      featuredOnDashboard: true,
    },
    {
      id: 'site-1',
      name: 'موقع 1',
      connected: true,
      internetUsage: 58,
      devicesCount: 36,
      bandwidthMbps: 200,
      manager: 'م. عمر فاروق',
      city: 'العاصمة الإدارية',
      featuredOnDashboard: true,
    },
    {
      id: 'site-2',
      name: 'موقع 2',
      connected: true,
      internetUsage: 64,
      devicesCount: 28,
      bandwidthMbps: 200,
      manager: 'م. مصطفى كمال',
      city: 'السادس من أكتوبر',
      featuredOnDashboard: true,
    },
    {
      id: 'site-3',
      name: 'موقع 3',
      connected: true,
      internetUsage: 49,
      devicesCount: 31,
      bandwidthMbps: 150,
      manager: 'م. خالد فوزي',
      city: 'العلمين الجديدة',
      featuredOnDashboard: true,
    },
    {
      id: 'site-7',
      name: 'موقع 7',
      connected: false,
      internetUsage: 0,
      devicesCount: null,
      bandwidthMbps: 100,
      manager: 'م. وائل درويش',
      city: 'العين السخنة',
      featuredOnDashboard: true,
    },
    {
      id: 'site-4',
      name: 'موقع 4',
      connected: true,
      internetUsage: 53,
      devicesCount: 24,
      bandwidthMbps: 150,
      manager: 'م. ياسر علام',
      city: 'الإسكندرية',
      featuredOnDashboard: false,
    },
    {
      id: 'site-5',
      name: 'موقع 5',
      connected: true,
      internetUsage: 41,
      devicesCount: 19,
      bandwidthMbps: 100,
      manager: 'م. تامر نبيل',
      city: 'المنصورة الجديدة',
      featuredOnDashboard: false,
    },
    {
      id: 'site-6',
      name: 'موقع 6',
      connected: true,
      internetUsage: 62,
      devicesCount: 23,
      bandwidthMbps: 150,
      manager: 'م. شريف حسن',
      city: 'العاشر من رمضان',
      featuredOnDashboard: false,
    },
  ],
  network: {
    accessPointsActive: 28,
    accessPointsTotal: 28,
    switchesActive: 4,
    switchesTotal: 4,
    routersActive: 3,
    routersTotal: 3,
    firewallActive: true,
    internetConnected: true,
    averageUsage: 72,
    usageHistory: [
      { time: '00:00', value: 40 },
      { time: '02:00', value: 41 },
      { time: '04:00', value: 48 },
      { time: '06:00', value: 44 },
      { time: '08:00', value: 57 },
      { time: '09:30', value: 62 },
      { time: '12:00', value: 43 },
      { time: '14:00', value: 52 },
      { time: '16:00', value: 64 },
      { time: '18:00', value: 58 },
      { time: '20:00', value: 61 },
    ],
  },
  employees: [
    {
      id: 'emp-1',
      name: 'م. حسام أحمد',
      title: 'المدير العام / مدير الشبكة',
      department: 'البنية التحتية وتكنولوجيا المعلومات',
      site: 'الموقع الرئيسي',
      role: 'مدير النظام',
      active: true,
    },
    {
      id: 'emp-2',
      name: 'م. أحمد عبد العزيز',
      title: 'مدير التنفيذ الهندسي',
      department: 'إدارة المشاريع',
      site: 'الموقع الرئيسي',
      role: 'مدير مشروع',
      active: true,
    },
    {
      id: 'emp-3',
      name: 'م. طارق المنشاوي',
      title: 'كبير مهندسي التشطيبات',
      department: 'إدارة المشاريع',
      site: 'الموقع الرئيسي',
      role: 'مدير مشروع',
      active: true,
    },
    {
      id: 'emp-4',
      name: 'م. سارة الجندي',
      title: 'مهندس أول شبكات وأمن معلومات',
      department: 'البنية التحتية للشبكة',
      site: 'موقع 1',
      role: 'مهندس شبكات',
      active: true,
    },
    {
      id: 'emp-5',
      name: 'م. محمود الشافعي',
      title: 'مدير الأعمال الكهروميكانيكية MEP',
      department: 'الإدارة الهندسية',
      site: 'موقع 2',
      role: 'مدير مشروع',
      active: true,
    },
    {
      id: 'emp-6',
      name: 'م. وائل درويش',
      title: 'مدير موقع 7',
      department: 'إدارة المواقع',
      site: 'موقع 7',
      role: 'مهندس موقع',
      active: true,
    },
  ],
  assets: [
    {
      id: 'ast-1',
      name: 'جدار الحماية الرئيسي FortiGate 600F',
      category: 'خوادم وشبكات',
      code: 'NET-FW-001',
      site: 'الموقع الرئيسي',
      status: 'يعمل بكفاءة',
      value: 950000,
    },
    {
      id: 'ast-2',
      name: 'عنقود خوادم Dell PowerEdge R760 (4 وحدات)',
      category: 'خوادم وشبكات',
      code: 'SRV-CL-002',
      site: 'الموقع الرئيسي',
      status: 'يعمل بكفاءة',
      value: 3400000,
    },
    {
      id: 'ast-3',
      name: 'رافعة برجية Liebherr 280 EC-H',
      category: 'معدات هندسية',
      code: 'CRN-LB-014',
      site: 'الموقع الرئيسي',
      status: 'يعمل بكفاءة',
      value: 14500000,
    },
    {
      id: 'ast-4',
      name: 'موجه سيسكو Cisco Catalyst 8300 SD-WAN',
      category: 'خوادم وشبكات',
      code: 'NET-RT-007',
      site: 'موقع 7',
      status: 'تحت الصيانة',
      value: 480000,
    },
    {
      id: 'ast-5',
      name: 'نظام UPS المركزي APC Symmetra PX 100kW',
      category: 'أنظمة أمنية',
      code: 'PWR-UP-003',
      site: 'موقع 1',
      status: 'يعمل بكفاءة',
      value: 2100000,
    },
  ],
  toasts: [],
};

function mapServiceStatusToCode(status: SystemServiceItem['status']): 'UP' | 'WARN' | 'DOWN' {
  if (status === 'running') return 'UP';
  if (status === 'maintenance') return 'WARN';
  return 'DOWN';
}

function pushToast(state: DashboardState, toast: Omit<ToastNotificationItem, 'id' | 'timestamp'>) {
  const nowStr = new Date().toLocaleTimeString('ar-EG');
  const newToast: ToastNotificationItem = {
    ...toast,
    id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: nowStr,
  };
  if (!Array.isArray(state.toasts)) {
    state.toasts = [];
  }
  state.toasts = [newToast, ...state.toasts].slice(0, 5);
}

function loadPersistedState(): DashboardState {
  if (typeof window === 'undefined') return initialDashboardState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialDashboardState;
    const parsed = JSON.parse(raw) as Partial<DashboardState>;
    return {
      ...initialDashboardState,
      ...parsed,
      toasts: [],
      metrics: {
        ...initialDashboardState.metrics,
        ...(parsed.metrics || {}),
        projectCounts: {
          ...initialDashboardState.metrics.projectCounts,
          ...(parsed.metrics?.projectCounts || {}),
        },
      },
      network: {
        ...initialDashboardState.network,
        ...(parsed.network || {}),
      },
    };
  } catch {
    return initialDashboardState;
  }
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: loadPersistedState(),
  reducers: {
    setActivePage(state, action: PayloadAction<NavSectionId>) {
      state.activePage = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setAutoSaveEnabled(state, action: PayloadAction<boolean>) {
      state.autoSaveEnabled = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    updateProjectProgress(
      state,
      action: PayloadAction<{
        id: string;
        executionRate: number;
        initialHandover: number;
        finalHandover: number;
      }>
    ) {
      const proj = state.projects.find((p) => p.id === action.payload.id);
      if (proj) {
        proj.executionRate = Math.min(100, Math.max(0, action.payload.executionRate));
        proj.initialHandover = Math.min(100, Math.max(0, action.payload.initialHandover));
        proj.finalHandover = Math.min(100, Math.max(0, action.payload.finalHandover));
        if (proj.executionRate === 100 && proj.finalHandover === 100) {
          proj.status = 'completed';
        }
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addProject(state, action: PayloadAction<Omit<ProjectItem, 'id'>>) {
      const newProj: ProjectItem = {
        ...action.payload,
        id: `proj-${Date.now()}`,
      };
      state.projects.unshift(newProj);
      state.metrics.totalProjects += 1;
      if (newProj.status === 'completed') state.metrics.projectCounts.completed += 1;
      else if (newProj.status === 'in_progress') state.metrics.projectCounts.inProgress += 1;
      else if (newProj.status === 'delayed') state.metrics.projectCounts.delayed += 1;
      else state.metrics.projectCounts.atRisk += 1;
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    toggleServiceStatus(state, action: PayloadAction<string>) {
      const srv = state.services.find((s) => s.id === action.payload);
      if (srv) {
        const prevCode = mapServiceStatusToCode(srv.status);
        if (srv.status === 'running') srv.status = 'maintenance';
        else if (srv.status === 'maintenance') srv.status = 'stopped';
        else srv.status = 'running';

        const nextCode = mapServiceStatusToCode(srv.status);
        const nowStr = new Date().toLocaleTimeString('ar-EG');

        if (nextCode === 'DOWN') {
          pushToast(state, {
            title: 'تنبيه حرج: توقف الخادم (Server DOWN)',
            message: `انقطع الاتصال بخادم «${srv.name}» وتغيرت حالته من ${prevCode} إلى DOWN.`,
            type: 'critical',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'DOWN',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 7000,
          });
          state.alerts.unshift({
            id: `alt-${Date.now()}`,
            message: `توقف خادم ${srv.name} (${srv.ipAddress}) — الحالة: DOWN`,
            severity: 'critical',
            timestamp: nowStr,
            location: 'مركز البيانات الرئيسي',
            resolved: false,
          });
        } else if (nextCode === 'WARN') {
          pushToast(state, {
            title: 'تحذير البنية التحتية: وضع الصيانة (WARN)',
            message: `تم تحويل «${srv.name}» من حالة ${prevCode} إلى وضع الصيانة المجدولة (WARN).`,
            type: 'warning',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'WARN',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 5500,
          });
        } else {
          pushToast(state, {
            title: 'استعادة الخادم بنجاح (Server UP)',
            message: `عاد خادم «${srv.name}» للعمل بكفاءة عالية (حالة UP).`,
            type: 'success',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'UP',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 4500,
          });
        }
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    setServiceStatus(
      state,
      action: PayloadAction<{ id: string; status: SystemServiceItem['status'] }>
    ) {
      const srv = state.services.find((s) => s.id === action.payload.id);
      if (srv && srv.status !== action.payload.status) {
        const prevCode = mapServiceStatusToCode(srv.status);
        srv.status = action.payload.status;
        const nextCode = mapServiceStatusToCode(srv.status);
        const nowStr = new Date().toLocaleTimeString('ar-EG');

        if (nextCode === 'DOWN') {
          pushToast(state, {
            title: 'تنبيه حرج: توقف الخادم (Server DOWN)',
            message: `تغيرت حالة «${srv.name}» فوراً من ${prevCode} إلى DOWN (متوقف عن الاستجابة).`,
            type: 'critical',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'DOWN',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 7000,
          });
          state.alerts.unshift({
            id: `alt-${Date.now()}`,
            message: `توقف مفاجئ في ${srv.name} (${srv.ipAddress}) — انتقل من ${prevCode} إلى DOWN`,
            severity: 'critical',
            timestamp: nowStr,
            location: 'مركز البيانات الرئيسي',
            resolved: false,
          });
        } else if (nextCode === 'WARN') {
          pushToast(state, {
            title: 'تحذير حالة الخادم (Server WARN)',
            message: `انتقل خادم «${srv.name}» من ${prevCode} إلى حالة الصيانة (WARN).`,
            type: 'warning',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'WARN',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 5500,
          });
        } else {
          pushToast(state, {
            title: 'استعادة عمل الخادم (Server UP)',
            message: `تم تشغيل «${srv.name}» بنجاح وعاد من ${prevCode} إلى UP.`,
            type: 'success',
            sourceName: srv.name,
            ipOrLocation: srv.ipAddress,
            fromStatus: prevCode,
            toStatus: 'UP',
            targetType: 'server',
            targetId: srv.id,
            durationMs: 4500,
          });
        }
        state.lastSavedAt = nowStr;
      }
    },
    updateServiceAllRunning(state) {
      const affectedCount = state.services.filter((s) => s.status !== 'running').length;
      state.services.forEach((s) => {
        s.status = 'running';
      });
      if (affectedCount > 0) {
        pushToast(state, {
          title: 'استعادة شاملة للخوادم (All Servers UP)',
          message: `تمت إعادة تشغيل ${affectedCount} خوادم بنجاح؛ جميع الأنظمة (8/8) تعمل الآن بحالة UP.`,
          type: 'success',
          sourceName: 'مركز البيانات الرئيسي',
          ipOrLocation: '10.10.1.0/24',
          fromStatus: 'DOWN',
          toStatus: 'UP',
          durationMs: 5000,
        });
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    toggleSiteConnection(state, action: PayloadAction<string>) {
      const site = state.sites.find((s) => s.id === action.payload);
      if (site) {
        const wasConnected = site.connected;
        site.connected = !site.connected;
        const nowStr = new Date().toLocaleTimeString('ar-EG');

        if (site.connected) {
          site.internetUsage = site.internetUsage === 0 ? 45 : site.internetUsage;
          site.devicesCount = site.devicesCount === null ? 18 : site.devicesCount;
          pushToast(state, {
            title: 'استعادة اتصال الموقع (Node UP)',
            message: `عاد خط الربط الشبكي في «${site.name}» (${site.city}) للعمل بحالة UP.`,
            type: 'success',
            sourceName: site.name,
            ipOrLocation: site.city,
            fromStatus: wasConnected ? 'UP' : 'DOWN',
            toStatus: 'UP',
            targetType: 'site',
            targetId: site.id,
            durationMs: 4500,
          });
        } else {
          site.internetUsage = 0;
          site.devicesCount = null;
          pushToast(state, {
            title: 'انقطاع اتصال الشبكة (Node DOWN)',
            message: `فشل الاتصال بعقدة «${site.name}» (${site.city}) — انتقلت الحالة من UP إلى DOWN.`,
            type: 'critical',
            sourceName: site.name,
            ipOrLocation: site.city,
            fromStatus: 'UP',
            toStatus: 'DOWN',
            targetType: 'site',
            targetId: site.id,
            durationMs: 7000,
          });
          state.alerts.unshift({
            id: `alt-${Date.now()}`,
            message: `انقطاع اتصال الشبكة في (${site.name} - ${site.city}) — الحالة: DOWN`,
            severity: 'critical',
            timestamp: nowStr,
            location: site.name,
            resolved: false,
          });
        }
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    updateSiteUsage(state, action: PayloadAction<{ id: string; usage: number }>) {
      const site = state.sites.find((s) => s.id === action.payload.id);
      if (site && site.connected) {
        site.internetUsage = Math.min(100, Math.max(0, action.payload.usage));
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addSite(state, action: PayloadAction<Omit<SiteStatusItem, 'id'>>) {
      state.sites.push({
        ...action.payload,
        id: `site-${Date.now()}`,
      });
      state.metrics.totalSites += 1;
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    toggleAlertResolved(state, action: PayloadAction<string>) {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert) {
        alert.resolved = !alert.resolved;
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    markAllAlertsResolved(state) {
      state.alerts.forEach((a) => {
        a.resolved = true;
      });
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addAlert(state, action: PayloadAction<Omit<AlertItem, 'id' | 'resolved'>>) {
      state.alerts.unshift({
        ...action.payload,
        id: `alt-${Date.now()}`,
        resolved: false,
      });
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    updateTaskCount(state, action: PayloadAction<{ id: string; delta: number }>) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.count = Math.max(0, task.count + action.payload.delta);
      }
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    updateNetworkAverage(state, action: PayloadAction<number>) {
      state.network.averageUsage = Math.min(100, Math.max(5, action.payload));
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addEmployee(state, action: PayloadAction<Omit<EmployeeItem, 'id'>>) {
      state.employees.unshift({
        ...action.payload,
        id: `emp-${Date.now()}`,
      });
      state.metrics.totalEmployees += 1;
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addAsset(state, action: PayloadAction<Omit<AssetItem, 'id'>>) {
      state.assets.unshift({
        ...action.payload,
        id: `ast-${Date.now()}`,
      });
      state.lastSavedAt = new Date().toLocaleTimeString('ar-EG');
    },
    addToast(state, action: PayloadAction<Omit<ToastNotificationItem, 'id' | 'timestamp'>>) {
      pushToast(state, action.payload);
    },
    dismissToast(state, action: PayloadAction<string>) {
      if (!Array.isArray(state.toasts)) {
        state.toasts = [];
        return;
      }
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearAllToasts(state) {
      state.toasts = [];
    },
    resetToDefaults(state) {
      const currentTheme = state.theme;
      Object.assign(state, initialDashboardState, {
        theme: currentTheme,
        toasts: [],
        lastSavedAt: 'تمت استعادة البيانات الافتراضية',
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const {
  setActivePage,
  toggleTheme,
  setTheme,
  setAutoSaveEnabled,
  setSearchQuery,
  updateProjectProgress,
  addProject,
  toggleServiceStatus,
  setServiceStatus,
  updateServiceAllRunning,
  toggleSiteConnection,
  updateSiteUsage,
  addSite,
  toggleAlertResolved,
  markAllAlertsResolved,
  addAlert,
  updateTaskCount,
  updateNetworkAverage,
  addEmployee,
  addAsset,
  addToast,
  dismissToast,
  clearAllToasts,
  resetToDefaults,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

