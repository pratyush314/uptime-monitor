"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Pause,
  Play,
  Trash2,
  Clock,
  Gauge,
  AlertCircle,
  CheckCircle,
  History,
} from "lucide-react";
import { Monitor } from "@/app/types";
import {
  formatDate,
  formatResponseTime,
  getStatusColor,
} from "@/app/lib/utils";
import clsx from "classnames";

interface MonitorCardProps {
  monitor: Monitor;
  onStop: (id: string) => Promise<void>;
  onResume: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function MonitorCard({
  monitor,
  onStop,
  onResume,
  onDelete,
  isLoading = false,
}: MonitorCardProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { bg, text, dot } = getStatusColor(monitor.status);

  const handleStop = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProcessing(true);
    try {
      await onStop(monitor.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResume = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProcessing(true);
    try {
      await onResume(monitor.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this monitor?")) {
      return;
    }
    setIsProcessing(true);
    try {
      await onDelete(monitor.id);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700",
        "hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20",
      )}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${
            monitor.status === "up"
              ? "#ecfdf5"
              : monitor.status === "down"
                ? "#fef2f2"
                : "#f9fafb"
          } 0%, transparent 100%)`,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          {/* Status Badge and URL */}
          <div className="flex items-start gap-3 mb-4">
            <div className={clsx("flex-shrink-0 p-2 rounded-lg", bg)}>
              {monitor.status === "up" ? (
                <CheckCircle className={clsx("w-5 h-5", text)} />
              ) : monitor.status === "down" ? (
                <AlertCircle className={clsx("w-5 h-5", text)} />
              ) : (
                <Clock className={clsx("w-5 h-5", text)} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-gray-100 break-all">
                {monitor.url}
              </p>
              <div
                className={clsx(
                  "mt-1 inline-block px-2.5 py-1 rounded-full text-xs font-semibold",
                  bg,
                  text,
                )}
              >
                {monitor.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Gauge className="w-4 h-4" />
              <span>Response: {formatResponseTime(monitor.responseTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Checked: {formatDate(monitor.lastCheckedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        {monitor.isActive ? (
          <button
            onClick={handleStop}
            disabled={isProcessing || isLoading}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <Pause className="w-4 h-4" />
            Stop
          </button>
        ) : (
          <button
            onClick={handleResume}
            disabled={isProcessing || isLoading}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={isProcessing || isLoading}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <button
          onClick={() => router.push(`/logs/${monitor.id}`)}
          disabled={isProcessing || isLoading}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <History className="w-4 h-4" />
          Logs
        </button>
      </div>

      {!monitor.isActive && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-500 italic">
          This monitor is paused
        </div>
      )}
    </div>
  );
}
