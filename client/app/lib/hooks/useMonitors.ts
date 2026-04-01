"use client";

import { useEffect, useState, useCallback } from "react";
import { Monitor } from "@/app/types";
import { monitorsApi } from "@/app/lib/api/monitors";

export function useMonitors() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitors = useCallback(async () => {
    try {
      setError(null);
      const data = await monitorsApi.getAll();
      setMonitors(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch monitors";
      setError(errorMessage);
      console.error("Failed to fetch monitors:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitors();

    const interval = setInterval(fetchMonitors, 30000);

    return () => clearInterval(interval);
  }, [fetchMonitors]);

  const addMonitor = useCallback(async (url: string) => {
    try {
      const newMonitor = await monitorsApi.create({ url });
      setMonitors((prev) => [newMonitor, ...prev]);
      return newMonitor;
    } catch (err) {
      throw err;
    }
  }, []);

  const removeMonitor = useCallback(async (id: string) => {
    try {
      await monitorsApi.delete(id);
      setMonitors((prev) => prev.filter((monitor) => monitor.id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  const stopMonitorById = useCallback(async (id: string) => {
    try {
      const updated = await monitorsApi.stop(id);
      setMonitors((prev) =>
        prev.map((monitor) => (monitor.id === id ? updated : monitor)),
      );
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  const resumeMonitorById = useCallback(async (id: string) => {
    try {
      const updated = await monitorsApi.resume(id);
      setMonitors((prev) =>
        prev.map((monitor) => (monitor.id === id ? updated : monitor)),
      );
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    monitors,
    isLoading,
    error,
    addMonitor,
    removeMonitor,
    stopMonitorById,
    resumeMonitorById,
    refetch: fetchMonitors,
  };
}
