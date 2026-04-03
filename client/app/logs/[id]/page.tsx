"use client";

import { LoadingError } from "@/app/components/common/LoadingError";
import { DashboardLayout } from "@/app/components/layout/DashboardLayout";
import { Footer } from "@/app/components/layout/Footer";
import { Header } from "@/app/components/layout/Header";
import { LogsStatistics, LogsTable } from "@/app/components/logs";
import { useLogs } from "@/app/lib/hooks/useLogs";
import { useMonitors } from "@/app/lib/hooks/useMonitors";
import clsx from "classnames";
import { ArrowLeft, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function LogsPage() {
  const params = useParams();
  const router = useRouter();
  const monitorId = params.id as string;

  const {
    monitors,
    isLoading: monitorsLoading,
    error: monitorsError,
  } = useMonitors();

  const monitor = monitors.find((m) => m.id === monitorId);

  const { logs, isLoading: logsLoading, error, refetch } = useLogs(monitorId);

  const isLoading = monitorsLoading || logsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <DashboardLayout>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading logs...
              </p>
            </div>
          </div>
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  if (monitorsError || error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <DashboardLayout>
          <LoadingError
            isLoading={false}
            error={monitorsError || error}
            onRetry={refetch}
          />
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  if (!monitor) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <DashboardLayout>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Monitor not found
            </h2>
            <button
              onClick={() => router.push("/")}
              className={clsx(
                "px-4 py-2 rounded-lg",
                "bg-blue-600 text-white hover:bg-blue-700",
                "transition-colors duration-200",
              )}
            >
              Back to Dashboard
            </button>
          </div>
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DashboardLayout>
        <button
          onClick={() => router.push("/")}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg mb-6",
            "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
            "transition-colors duration-200",
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <LogsStatistics logs={logs} url={monitor.url} />
        <LogsTable logs={logs} />
      </DashboardLayout>
      <div className="flex-1" />
      <Footer />
    </div>
  );
}
