"use client";

import React from "react";
import { Code2, Share2, Mail, Heart } from "lucide-react";
import clsx from "classnames";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={clsx(
        "mt-16 border-t border-gray-200 dark:border-gray-800",
        "bg-gray-50 dark:bg-gray-900/50 py-8",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Uptime Monitor. Made with{" "}
              <Heart className="w-3 h-3 inline text-red-500" /> for your uptime.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className={clsx(
                "p-2 rounded-lg transition-all duration-200",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-gray-200 dark:hover:bg-gray-800",
              )}
              title="Code"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href="#"
              className={clsx(
                "p-2 rounded-lg transition-all duration-200",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-gray-200 dark:hover:bg-gray-800",
              )}
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href="mailto:support@example.com"
              className={clsx(
                "p-2 rounded-lg transition-all duration-200",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-gray-200 dark:hover:bg-gray-800",
              )}
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
