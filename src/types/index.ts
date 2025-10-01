// import React from "react";

// // Tournament related types
// export interface Tournament {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   location: string;
//   prizePool: string;
//   teams: number;
//   participants: number;
//   status: "REGISTRATION_OPEN" | "COMING_SOON" | "LIVE" | "COMPLETED";
//   image: string;
//   type: "MAJOR" | "QUALIFIER" | "NATIONAL" | "LIVE" | "REGIONAL";
//   featured: boolean;
//   viewers?: string;
//   winner?: string;
// }

// // Team related types
// export interface Team {
//   id: number;
//   name: string;
//   country: string;
//   rank: number;
//   points: number;
//   wins: number;
//   members: string[];
//   logo: string;
//   bgColor: string;
//   status: "CHAMPION" | "PRO" | "RISING" | "ROOKIE" | "LOCAL";
// }

// // Achievement related types
// export interface Prize {
//   rank: string;
//   title: string;
//   prize: string;
//   description: string;
//   icon: React.ComponentType<{
//     className?: string;
//     style?: React.CSSProperties;
//   }>;
//   bgColor: string;
//   glow: string;
// }

// export interface Achievement {
//   title: string;
//   description: string;
//   icon: React.ComponentType<{
//     className?: string;
//     style?: React.CSSProperties;
//   }>;
//   count: string;
//   label: string;
//   color: string;
// }

// // Match related types
// export interface Match {
//   id: number;
//   time?: string;
//   date?: string;
//   teams: {
//     name: string;
//     logo: string;
//     score?: number;
//   }[];
//   status: "upcoming" | "live" | "completed";
//   tournament?: string;
//   map?: string;
//   prize?: string;
// }

// // Navigation types
// export interface NavigationLink {
//   name: string;
//   href: string;
// }

// // Social link types
// export interface SocialLink {
//   name: string;
//   icon: React.ComponentType<{ className?: string }>;
//   href: string;
//   color: string;
// }

// // Quick link types
// export interface QuickLink {
//   label: string;
//   href: string;
// }

// // Status badge types
// export interface StatusBadge {
//   text: string;
//   color: string;
// }

// // Day selector types
// export interface DayOption {
//   id: string;
//   label: string;
//   date: string;
// }

// // Tab types
// export interface TabOption {
//   key: string;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   shortLabel?: string;
// }
// src/types.ts
import type { ComponentType, CSSProperties } from "react";

/**
 * Umumiy API javoblar uchun yordamchi tip
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number | string;
}

/* ----------------------
   Tournament / Team / Match
   ---------------------- */

export type TournamentStatus =
  | "REGISTRATION_OPEN"
  | "COMING_SOON"
  | "LIVE"
  | "COMPLETED"
  // past possible lowercase variants if your API returns them
  | "registration_open"
  | "coming_soon"
  | "live"
  | "completed";

export type TournamentType =
  | "MAJOR"
  | "QUALIFIER"
  | "NATIONAL"
  | "LIVE"
  | "REGIONAL";

export interface Tournament {
  id: number;
  title: string;
  date: string; // ISO date string preferable
  time?: string; // optional because sometimes date may include time
  location?: string;
  prizePool?: string;
  teams?: number;
  participants?: number;
  status: TournamentStatus;
  image?: string;
  type?: TournamentType;
  featured?: boolean;
  viewers?: string;
  winner?: string | null;
  // any extra fields from API:
  [k: string]: unknown;
}

/**
 * Team member can be simple string or object.
 * If your code expects objects, prefer the object form.
 */
export interface TeamMember {
  id?: number;
  name: string;
  role?: string;
  avatar?: string;
}

export interface Team {
  id: number;
  name: string;
  country?: string;
  rank?: number;
  points?: number;
  wins?: number;
  members: TeamMember[]; // prefer objects to avoid implicit any
  logo?: string;
  bgColor?: string;
  status?: "CHAMPION" | "PRO" | "RISING" | "ROOKIE" | "LOCAL" | string;
  // allow extra props from API
  [k: string]: unknown;
}

/* ----------------------
   Match & related
   ---------------------- */

export interface MatchTeam {
  id?: number;
  name: string;
  logo?: string;
  score?: number;
}

export type MatchStatus =
  | "upcoming"
  | "live"
  | "completed"
  // also support uppercase variants
  | "UPCOMING"
  | "LIVE"
  | "COMPLETED";

export interface Match {
  id: number;
  time?: string; // e.g. "18:00"
  date?: string; // ISO date string
  teams: MatchTeam[]; // array of team objects — avoids "string" misuse
  status: MatchStatus;
  tournament?: string | Tournament;
  map?: string;
  prize?: string;
  // general fallback for additional API fields
  [k: string]: unknown;
}

/* ----------------------
   Achievements / Prizes
   ---------------------- */

export interface Prize {
  rank: string;
  title: string;
  prize: string;
  description?: string;
  icon?: ComponentType<{ className?: string; style?: CSSProperties }>;
  bgColor?: string;
  glow?: string;
}

export interface Achievement {
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string; style?: CSSProperties }>;
  count?: string | number;
  label?: string;
  color?: string;
}

/* ----------------------
   Navigation / UI helpers
   ---------------------- */

export interface NavigationLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon?: ComponentType<{ className?: string }>;
  href: string;
  color?: string;
}

export interface QuickLink {
  label: string;
  href: string;
}

export interface StatusBadge {
  text: string;
  color?: string;
}

export interface DayOption {
  id: string;
  label: string;
  date: string;
}

export interface TabOption {
  key: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  shortLabel?: string;
}

/* ----------------------
  User / Application (dashboard uses these)
  ---------------------- */

export interface User {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  role?: "user" | "admin" | "organizer" | string;
  phone?: string;
  country?: string;
  // fallback
  [k: string]: unknown;
}

export interface Application {
  id: number;
  userId: number;
  tournamentId: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | string;
  createdAt?: string;
  updatedAt?: string;
  meta?: Record<string, unknown>;
}
