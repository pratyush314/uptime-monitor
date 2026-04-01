"use client";

import React from "react";
import { Activity } from "lucide-react";
import clsx from "classnames";

export function Header() {
  return (
    <header
      className={clsx(
        "border-b border-gray-200 dark:border-gray-800",
        "bg-white dark:bg-gray-950 sticky top-0 z-50",
        "backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Monitor
            </h1>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#"
              className={clsx(
                "text-sm text-gray-600 dark:text-gray-400",
                "hover:text-gray-900 dark:hover:text-gray-100",
                "transition-colors duration-200",
              )}
            >
              Documentation
            </a>
            <a
              href="#"
              className={clsx(
                "text-sm text-gray-600 dark:text-gray-400",
                "hover:text-gray-900 dark:hover:text-gray-100",
                "transition-colors duration-200",
              )}
            >
              Support
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
