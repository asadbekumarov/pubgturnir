import { StatusBadge } from "../types";

// Status badge utilities
export const getStatusBadge = (status: string): StatusBadge => {
  const badges: Record<string, { text: string; color: string }> = {
    REGISTRATION_OPEN: { text: "RO'YXAT OCHIQ", color: "#10b981" },
    COMING_SOON: { text: "TEZDA", color: "#f59e0b" },
    LIVE: { text: "JONLI", color: "#ef4444" },
    COMPLETED: { text: "TUGALLANGAN", color: "#6b7280" },
  };
  return badges[status] || badges["COMING_SOON"];
};

// Animation utilities
export const getAnimationDelay = (
  index: number,
  baseDelay: number = 200
): string => {
  return `${(index + 1) * baseDelay}ms`;
};

// Random utilities
export const generateRandomPosition = (): { left: string; top: string } => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
});

export const generateRandomDelay = (): string => {
  return `${Math.random() * 3}s`;
};

export const generateRandomDuration = (): string => {
  return `${2 + Math.random() * 3}s`;
};

// Class name utilities
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

// Format utilities
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const formatCurrency = (amount: string): string => {
  return amount;
};

// Filter utilities
export const filterByStatus = <T extends { status: string }>(
  items: T[],
  status: string
): T[] => {
  return items.filter((item) => item.status === status);
};

// Sort utilities
export const sortByRank = <T extends { rank: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.rank - b.rank);
};

export const sortByPoints = <T extends { points: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => b.points - a.points);
};

// Auth storage utilities
export { authStorage } from "./authStorage";
