"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { LoadingError } from "./components/common/LoadingError";
import { AddMonitorForm } from "./components/dashboard/AddMonitorForm";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { MonitorsList } from "./components/monitors/MonitorsList";
import { useMonitors } from "./lib/hooks/useMonitors";

export default function Dashboard() {
  const {
    monitors,
    isLoading,
    addMonitor,
    removeMonitor,
    stopMonitorById,
    resumeMonitorById,
  } = useMonitors();

  const handleAddMonitor = useCallback(
    async (url: string) => {
      try {
        const newMonitor = await addMonitor(url);
        toast.success(`Monitor added successfully`, {
          description: `Now tracking ${url}`,
        });
        return newMonitor;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to add monitor";
        toast.error("Failed to add monitor", {
          description: errorMessage,
        });
        throw error;
      }
    },
    [addMonitor],
  );

  const handleDeleteMonitor = useCallback(
    async (id: string) => {
      try {
        await removeMonitor(id);
        toast.success("Monitor deleted successfully");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete monitor";
        toast.error("Failed to delete monitor", {
          description: errorMessage,
        });
        throw error;
      }
    },
    [removeMonitor],
  );

  const handleStopMonitor = useCallback(
    async (id: string) => {
      try {
        await stopMonitorById(id);
        toast.info("Monitor paused", {
          description: "Monitoring has been paused for this URL",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to stop monitor";
        toast.error("Failed to pause monitor", {
          description: errorMessage,
        });
        throw error;
      }
    },
    [stopMonitorById],
  );

  const handleResumeMonitor = useCallback(
    async (id: string) => {
      try {
        await resumeMonitorById(id);
        toast.success("Monitor resumed", {
          description: "Monitoring has been resumed for this URL",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to resume monitor";
        toast.error("Failed to resume monitor", {
          description: errorMessage,
        });
        throw error;
      }
    },
    [resumeMonitorById],
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <DashboardLayout>
        <DashboardHeader monitors={monitors} isLoading={isLoading} />

        {isLoading && <LoadingError isLoading={true} error={null} />}

        {!isLoading && (
          <>
            <AddMonitorForm onSubmit={handleAddMonitor} isLoading={isLoading} />

            <MonitorsList
              monitors={monitors}
              isLoading={isLoading}
              onStop={handleStopMonitor}
              onResume={handleResumeMonitor}
              onDelete={handleDeleteMonitor}
            />
          </>
        )}
      </DashboardLayout>

      <div className="flex-1" />
      <Footer />
    </div>
  );
}
