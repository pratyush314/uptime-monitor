import { UptimeLog } from "@/app/types";
import { apiCall } from "./client";

export const logsApi = {
  /**
   * Fetch logs for a specific monitor
   */
  async getMonitorLogs(monitorId: string): Promise<UptimeLog[]> {
    const response = await apiCall<UptimeLog[]>(`/monitors/${monitorId}/logs`);
    return Array.isArray(response) ? response : response;
  },
};
