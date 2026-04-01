export function formatDate(dateString: string | null): string {
  if (!dateString) return "Never";

  try {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "N/A";
  }
}

export function formatResponseTime(ms: number | null): string {
  if (ms === null || ms === undefined) return "N/A";
  return `${ms}ms`;
}

export function getStatusColor(status: "up" | "down" | "unknown"): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case "up":
      return {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-400",
        dot: "bg-emerald-500",
      };
    case "down":
      return {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        dot: "bg-red-500",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-700 dark:text-gray-400",
        dot: "bg-gray-500",
      };
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
