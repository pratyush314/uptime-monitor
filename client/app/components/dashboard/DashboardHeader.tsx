"use client";

import React from "react";
import { Activity, BarChart3 } from "lucide-react";
import { Monitor } from "@/app/types";
import clsx from "classnames";

interface DashboardHeaderProps {
  monitors: Monitor[];
  isLoading?: boolean;
}

export function DashboardHeader({
  monitors,
  isLoading = false,
}: DashboardHeaderProps) {
  const upCount = monitors.filter((m) => m.status === "up").length;
  const downCount = monitors.filter((m) => m.status === "down").length;
  const unknownCount = monitors.filter((m) => m.status === "unknown").length;

  const stats = [
    {
      label: "Active",
      value: monitors.filter((m) => m.isActive).length,
      icon: Activity,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      label: "Up",
      value: upCount,
      icon: BarChart3,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
    },
    {
      label: "Down",
      value: downCount,
      icon: BarChart3,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
          Uptime Monitor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track the uptime and performance of your websites in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={clsx(
                "p-4 rounded-lg border border-gray-200 dark:border-gray-800",
                "bg-gray-50 dark:bg-gray-900/50",
                "transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700",
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
                <div className={clsx("p-3 rounded-lg", stat.bg)}>
                  <Icon className={clsx("w-6 h-6", stat.color)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
