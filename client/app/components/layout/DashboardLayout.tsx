"use client";

import React from "react";
import clsx from "classnames";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={clsx("w-full")}>
      <main className={clsx("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8")}>
        {children}
      </main>
    </div>
  );
}
