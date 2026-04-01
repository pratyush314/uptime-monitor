"use client";

import { Monitor } from "@/app/types";
import clsx from "classnames";
import { MonitorCard } from "./MonitorCard";

interface MonitorsListProps {
  monitors: Monitor[];
  isLoading?: boolean;
  onStop: (id: string) => Promise<void>;
  onResume: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function MonitorsList({
  monitors,
  isLoading = false,
  onStop,
  onResume,
  onDelete,
}: MonitorsListProps) {
  if (monitors.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No monitors yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add your first monitor to get started tracking your website uptime
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {monitors.map((monitor, index) => (
        <div
          key={monitor.id}
          className={clsx(
            "animate-in fade-in slide-in-from-top-2 duration-500",
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <MonitorCard
            monitor={monitor}
            onStop={onStop}
            onResume={onResume}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
}
