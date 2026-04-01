"use client";

import React from "react";
import { UptimeLog } from "@/app/types";
import { CheckCircle, AlertCircle, Gauge } from "lucide-react";
import clsx from "classnames";

interface LogsStatisticsProps {
  logs: UptimeLog[];
  url: string;
}

export function LogsStatistics({ logs, url }: LogsStatisticsProps) {
  const upCount = logs.filter((log) => log.status === "up").length;
  const downCount = logs.filter((log) => log.status === "down").length;
  const unknownCount = logs.filter((log) => log.status === "unknown").length;
  const avgResponseTime =
    logs.length > 0
      ? Math.round(
          logs.reduce((sum, log) => sum + (log.responseTime || 0), 0) /
            logs.length,
        )
      : 0;
  const uptime =
    logs.length > 0 ? Math.round((upCount / logs.length) * 100 * 100) / 100 : 0;

  const stats = [
    {
      label: "Uptime",
      value: `${uptime}%`,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    {
      label: "Up",
      value: upCount,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    {
      label: "Down",
      value: downCount,
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
    {
      label: "Avg Response",
      value: `${avgResponseTime}ms`,
      icon: Gauge,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {url}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitoring history for this URL
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={clsx(
                "p-4 rounded-lg border border-gray-200 dark:border-gray-800",
                "transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700",
                stat.bg,
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {stat.value}
                  </p>
                </div>
                <Icon className={clsx("w-8 h-8", stat.color)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
