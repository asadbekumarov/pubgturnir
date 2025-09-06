import {
  Trophy,
  Target,
  Zap,
  Calendar,
  Play,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

// Navigation links
export const navigationLinks = [
  { name: "Natijalar", href: "#results" },
  { name: "Turnirlar", href: "#tournaments" },
  { name: "Jadval", href: "#table" },
];

// Social links
export const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/",
    color: "#1877f2",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/",
    color: "#e4405f",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/",
    color: "#ff0000",
  },
];

// Quick links
export const quickLinks = [
  { label: "Turnirlar", href: "#" },
  { label: "Natijalar", href: "#" },
  { label: "Jadval", href: "#" },
  { label: "Qoidalar", href: "#" },
  { label: "FAQ", href: "#" },
];

// Status badges
export const statusBadges: Record<string, { text: string; color: string }> = {
  REGISTRATION_OPEN: { text: "RO'YXAT OCHIQ", color: "#10b981" },
  COMING_SOON: { text: "TEZDA", color: "#f59e0b" },
  LIVE: { text: "JONLI", color: "#ef4444" },
  COMPLETED: { text: "TUGALLANGAN", color: "#6b7280" },
};

// Day options for schedule
export const dayOptions = [
  { id: "today", label: "Bugun", date: "15 Yanvar" },
  { id: "tomorrow", label: "Ertaga", date: "16 Yanvar" },
  { id: "week", label: "Bu Hafta", date: "17-21 Yanvar" },
];

// Tab options for different sections
export const tournamentTabs = [
  {
    key: "upcoming",
    label: "KELAYOTGAN",
    icon: Calendar,
    shortLabel: "KELADI",
  },
  { key: "live", label: "JONLI", icon: Play, shortLabel: "JONLI" },
  { key: "completed", label: "TUGALLANGAN", icon: Trophy, shortLabel: "TUGAL" },
];

export const teamTabs = [
  { key: "top", label: "TOP KOMANDALAR", icon: Trophy },
  { key: "new", label: "YANGI", icon: Zap },
  { key: "local", label: "MAHALLIY", icon: Target },
];

export const achievementTabs = [
  { key: "prizes", label: "MUKOFOTLAR" },
  { key: "achievements", label: "YUTUQLAR" },
];

// Color scheme
export const colors = {
  primary: "#f3aa01",
  primaryHover: "#da9902",
  secondary: "#ffcf40",
  accent: "#ff6b35",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
};

// Animation delays
export const animationDelays = {
  fast: 100,
  medium: 200,
  slow: 300,
  slower: 500,
};

// Breakpoints
export const breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
