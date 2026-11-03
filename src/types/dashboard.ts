export type NavSectionId =
  | 'dashboard'
  | 'projects'
  | 'sites'
  | 'network'
  | 'servers'
  | 'users'
  | 'alerts'
  | 'reports'
  | 'requests'
  | 'assets'
  | 'drive'
  | 'settings';

export type ProjectCategoryStatus = 'completed' | 'in_progress' | 'delayed' | 'at_risk';

export interface ProjectItem {
  id: string;
  name: string;
  executionRate: number;
  initialHandover: number;
  finalHandover: number;
  status: ProjectCategoryStatus;
  budget: number;
  spent: number;
  manager: string;
  siteName: string;
  featuredOnDashboard: boolean;
}

export type ServiceIconType =
  | 'active_directory'
  | 'file_server'
  | 'sql_server'
  | 'portal'
  | 'email'
  | 'auth_nps'
  | 'dhcp'
  | 'dns';

export interface SystemServiceItem {
  id: string;
  name: string;
  iconType: ServiceIconType;
  status: 'running' | 'maintenance' | 'stopped';
  uptime: string;
  cpuUsage: number;
  ramUsage: number;
  ipAddress: string;
}

export interface AlertItem {
  id: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  location: string;
  resolved: boolean;
}

export interface TaskActionItem {
  id: string;
  title: string;
  count: number;
  badgeColor: 'red' | 'amber' | 'blue';
  targetPage: NavSectionId;
}

export interface SiteStatusItem {
  id: string;
  name: string;
  connected: boolean;
  internetUsage: number;
  devicesCount: number | null;
  bandwidthMbps: number;
  manager: string;
  city: string;
  featuredOnDashboard: boolean;
}

export interface InternetUsagePoint {
  time: string;
  value: number;
}

export interface NetworkInfrastructureState {
  accessPointsActive: number;
  accessPointsTotal: number;
  switchesActive: number;
  switchesTotal: number;
  routersActive: number;
  routersTotal: number;
  firewallActive: boolean;
  internetConnected: boolean;
  averageUsage: number;
  usageHistory: InternetUsagePoint[];
}

export interface EmployeeItem {
  id: string;
  name: string;
  title: string;
  department: string;
  site: string;
  role: 'مدير النظام' | 'مدير مشروع' | 'مهندس موقع' | 'مهندس شبكات' | 'مستخدم';
  active: boolean;
}

export interface AssetItem {
  id: string;
  name: string;
  category: 'خوادم وشبكات' | 'معدات هندسية' | 'أجهزة حاسب' | 'أنظمة أمنية';
  code: string;
  site: string;
  status: 'يعمل بكفاءة' | 'تحت الصيانة' | 'مخزن';
  value: number;
}

export interface DashboardSummaryMetrics {
  totalEmployees: number;
  totalSites: number;
  totalProjects: number;
  overallCompletion: number;
  overallCompletionDelta: string;
  totalContractValue: number;
  actualCost: number;
  actualCostPercent: number;
  remainingBudget: number;
  remainingBudgetPercent: number;
  projectCounts: {
    completed: number;
    inProgress: number;
    delayed: number;
    atRisk: number;
  };
}

export interface DashboardState {
  activePage: NavSectionId;
  theme: 'light' | 'dark';
  autoSaveEnabled: boolean;
  lastSavedAt: string;
  searchQuery: string;
  currentDateLabel: string;
  userRoleLabel: string;
  metrics: DashboardSummaryMetrics;
  projects: ProjectItem[];
  services: SystemServiceItem[];
  alerts: AlertItem[];
  tasks: TaskActionItem[];
  sites: SiteStatusItem[];
  network: NetworkInfrastructureState;
  employees: EmployeeItem[];
  assets: AssetItem[];
}
