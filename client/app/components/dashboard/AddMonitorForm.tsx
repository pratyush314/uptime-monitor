"use client";

import React, { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { isValidUrl } from "@/app/lib/utils";
import clsx from "classnames";

interface AddMonitorFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (url: string) => Promise<any>;
  isLoading?: boolean;
}

export function AddMonitorForm({
  onSubmit,
  isLoading = false,
}: AddMonitorFormProps) {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(url);
      setUrl("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://example.com"
            disabled={isSubmitting || isLoading}
            className={clsx(
              "flex-1 px-4 py-3 rounded-lg",
              "border border-gray-300 dark:border-gray-700",
              "bg-white dark:bg-gray-900",
              "text-gray-900 dark:text-gray-100",
              "placeholder-gray-500 dark:placeholder-gray-500",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={clsx(
              "flex items-center gap-2 px-4 py-3 rounded-lg",
              "bg-blue-600 text-white font-medium",
              "hover:bg-blue-700 active:bg-blue-800",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Monitor</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>

        {/* {error && (
          <div
            className={clsx(
              "px-4 py-3 rounded-lg",
              "bg-red-50 dark:bg-red-900/30",
              "border border-red-200 dark:border-red-800",
              "text-red-800 dark:text-red-200",
              "text-sm font-medium",
              "animate-in fade-in slide-in-from-top-2 duration-300",
            )}
          >
            {error}
          </div>
        )} */}
      </div>
    </form>
  );
}
