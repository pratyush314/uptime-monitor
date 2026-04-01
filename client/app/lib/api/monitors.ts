import { Monitor, CreateMonitorPayload } from "@/app/types";
import { apiCall } from "./client";

export const monitorsApi = {
  /**
   * Fetch all monitors
   */
  async getAll(): Promise<Monitor[]> {
    const response = await apiCall<Monitor[]>("/monitors");
    return Array.isArray(response) ? response : response;
  },

  /**
   * Create a new monitor
   */
  async create(payload: CreateMonitorPayload): Promise<Monitor> {
    return apiCall<Monitor>("/monitors", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Delete a monitor
   */
  async delete(id: string): Promise<void> {
    await apiCall<void>(`/monitors/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Stop monitoring for a monitor
   */
  async stop(id: string): Promise<Monitor> {
    return apiCall<Monitor>(`/monitors/${id}/stop`, {
      method: "PATCH",
    });
  },

  /**
   * Resume monitoring for a monitor
   */
  async resume(id: string): Promise<Monitor> {
    return apiCall<Monitor>(`/monitors/${id}/resume`, {
      method: "PATCH",
    });
  },
};
