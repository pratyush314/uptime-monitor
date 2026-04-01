"use client";

import clsx from "classnames";
import { AlertCircle, Loader } from "lucide-react";

interface LoadingErrorProps {
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function LoadingError({ isLoading, error, onRetry }: LoadingErrorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading monitors...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={clsx(
          "p-6 rounded-lg border",
          "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
        )}
      >
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
              Error Loading Monitors
            </h3>
            <p className="text-red-800 dark:text-red-200 text-sm mb-4">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  "bg-red-600 text-white hover:bg-red-700",
                  "transition-colors duration-200",
                )}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
