export interface Monitor {
  id: string;
  url: string;
  status: "up" | "down" | "unknown";
  responseTime: number | null;
  isActive: boolean;
  lastCheckedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UptimeLog {
  id: string;
  monitorId: string;
  status: "up" | "down" | "unknown";
  responseTime: number | null;
  statusCode: number | null;
  checkedAt: string;
}

export interface CreateMonitorPayload {
  url: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string | string[];
  error?: string;
}

export interface MonitorsResponse extends ApiResponse<Monitor[]> {}
export interface MonitorResponse extends ApiResponse<Monitor> {}
export interface LogsResponse extends ApiResponse<UptimeLog[]> {}
