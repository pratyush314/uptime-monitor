"use client";

import { useEffect, useState, useCallback } from "react";
import { UptimeLog } from "@/app/types";
import { logsApi } from "@/app/lib/api/logs";

export function useLogs(monitorId: string) {
  const [logs, setLogs] = useState<UptimeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await logsApi.getMonitorLogs(monitorId);
      setLogs(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch logs";
      setError(errorMessage);
      console.error("Failed to fetch logs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [monitorId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    isLoading,
    error,
    refetch: fetchLogs,
  };
}
