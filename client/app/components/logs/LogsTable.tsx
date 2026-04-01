"use client";

import React from "react";
import { UptimeLog } from "@/app/types";
import { formatDate, getStatusColor } from "@/app/lib/utils";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import clsx from "classnames";

interface LogsTableProps {
  logs: UptimeLog[];
}

export function LogsTable({ logs }: LogsTableProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No logs yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Monitoring history will appear here as checks are performed
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Response Time
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Status Code
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Checked At
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            const { bg, text, dot } = getStatusColor(log.status);
            const isEven = index % 2 === 0;

            return (
              <tr
                key={log.id}
                className={clsx(
                  "border-b border-gray-200 dark:border-gray-800 transition-colors duration-200",
                  "hover:bg-blue-50 dark:hover:bg-blue-900/10",
                  isEven
                    ? "bg-white dark:bg-gray-950"
                    : "bg-gray-50 dark:bg-gray-900/20",
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={clsx("w-2 h-2 rounded-full", dot)} />
                    <span
                      className={clsx(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                        bg,
                        text,
                      )}
                    >
                      {log.status.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {log.responseTime !== null
                      ? `${log.responseTime}ms`
                      : "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {log.statusCode || "—"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(log.checkedAt)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
