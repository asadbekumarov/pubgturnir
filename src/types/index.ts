import React from "react";

// Tournament related types
export interface Tournament {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  prizePool: string;
  teams: number;
  participants: number;
  status: "REGISTRATION_OPEN" | "COMING_SOON" | "LIVE" | "COMPLETED";
  image: string;
  type: "MAJOR" | "QUALIFIER" | "NATIONAL" | "LIVE" | "REGIONAL";
  featured: boolean;
  viewers?: string;
  winner?: string;
}

// Team related types
export interface Team {
  id: number;
  name: string;
  country: string;
  rank: number;
  points: number;
  wins: number;
  members: string[];
  logo: string;
  bgColor: string;
  status: "CHAMPION" | "PRO" | "RISING" | "ROOKIE" | "LOCAL";
}

// Achievement related types
export interface Prize {
  rank: string;
  title: string;
  prize: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  bgColor: string;
  glow: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  count: string;
  label: string;
  color: string;
}

// Match related types
export interface Match {
  id: number;
  time: string;
  date: string;
  teams: {
    name: string;
    logo: string;
    score?: number;
  }[];
  status: "upcoming" | "live" | "completed";
  tournament: string;
  map: string;
  prize: string;
}

// Navigation types
export interface NavigationLink {
  name: string;
  href: string;
}

// Social link types
export interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

// Quick link types
export interface QuickLink {
  label: string;
  href: string;
}

// Status badge types
export interface StatusBadge {
  text: string;
  color: string;
}

// Day selector types
export interface DayOption {
  id: string;
  label: string;
  date: string;
}

// Tab types
export interface TabOption {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortLabel?: string;
}
