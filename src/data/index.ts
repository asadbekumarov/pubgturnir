import { Trophy, Medal, Star, Crown, Target, Zap } from "lucide-react";
import { Tournament, Team, Prize, Achievement, Match } from "../types";

// Tournament data
export const upcomingTournaments: Tournament[] = [
  {
    id: 1,
    title: "PUBG WORLD CHAMPIONSHIP 2024",
    date: "15 Dekabr 2024",
    time: "18:00",
    location: "Tashkent, O'zbekiston",
    prizePool: "$100,000",
    teams: 128,
    participants: 512,
    status: "REGISTRATION_OPEN",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "MAJOR",
    featured: true,
  },
  {
    id: 2,
    title: "ASIAN CUP QUALIFIER",
    date: "28 Dekabr 2024",
    time: "20:00",
    location: "Online",
    prizePool: "$25,000",
    teams: 64,
    participants: 256,
    status: "REGISTRATION_OPEN",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "QUALIFIER",
    featured: false,
  },
  {
    id: 3,
    title: "UZBEKISTAN NATIONAL CUP",
    date: "5 Yanvar 2025",
    time: "19:00",
    location: "Samarkand, O'zbekiston",
    prizePool: "$15,000",
    teams: 32,
    participants: 128,
    status: "COMING_SOON",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "NATIONAL",
    featured: false,
  },
];

export const liveTournaments: Tournament[] = [
  {
    id: 4,
    title: "WINTER SHOWDOWN",
    date: "JONLI",
    time: "Match 3/5",
    location: "Erangel",
    prizePool: "$50,000",
    teams: 16,
    participants: 64,
    status: "LIVE",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "LIVE",
    featured: true,
    viewers: "45.2K",
  },
];

export const completedTournaments: Tournament[] = [
  {
    id: 5,
    title: "AUTUMN CHAMPIONSHIP",
    date: "15 Noyabr 2024",
    time: "Tugallangan",
    location: "Dubai, UAE",
    prizePool: "$75,000",
    teams: 64,
    participants: 256,
    status: "COMPLETED",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "MAJOR",
    featured: false,
    winner: "THUNDER SQUAD",
  },
  {
    id: 6,
    title: "CENTRAL ASIA CUP",
    date: "3 Noyabr 2024",
    time: "Tugallangan",
    location: "Tashkent, O'zbekiston",
    prizePool: "$30,000",
    teams: 32,
    participants: 128,
    status: "COMPLETED",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "REGIONAL",
    featured: false,
    winner: "TASHKENT TIGERS",
  },
];

// Team data
export const topTeams: Team[] = [
  {
    id: 1,
    name: "THUNDER SQUAD",
    country: "UZB",
    rank: 1,
    points: 2547,
    wins: 43,
    members: ["WARRIOR_UZ", "STORM_KING", "THUNDER_GOD", "SNIPER_PRO"],
    logo: "⚡",
    bgColor: "#f3aa01",
    status: "CHAMPION",
  },
  {
    id: 2,
    name: "FIRE EAGLES",
    country: "KOR",
    rank: 2,
    points: 2341,
    wins: 38,
    members: ["EAGLE_EYE", "FIRE_STORM", "WING_MASTER", "SKY_HUNTER"],
    logo: "🔥",
    bgColor: "#ff4444",
    status: "PRO",
  },
  {
    id: 3,
    name: "SHADOW WOLVES",
    country: "RUS",
    rank: 3,
    points: 2198,
    wins: 35,
    members: ["SHADOW_X", "WOLF_ALPHA", "DARK_BLADE", "NIGHT_OPS"],
    logo: "🐺",
    bgColor: "#8b5cf6",
    status: "PRO",
  },
  {
    id: 4,
    name: "CYBER DRAGONS",
    country: "CHN",
    rank: 4,
    points: 2045,
    wins: 31,
    members: ["CYBER_001", "DRAGON_FLY", "TECH_MASTER", "CODE_NINJA"],
    logo: "🐲",
    bgColor: "#10b981",
    status: "RISING",
  },
];

export const newTeams: Team[] = [
  {
    id: 5,
    name: "PHOENIX RISING",
    country: "TUR",
    rank: 12,
    points: 1654,
    wins: 18,
    members: ["PHOENIX_01", "FIRE_BIRD", "ASH_WALKER", "FLAME_SOUL"],
    logo: "🔥",
    bgColor: "#f59e0b",
    status: "ROOKIE",
  },
  {
    id: 6,
    name: "ICE BREAKERS",
    country: "NOR",
    rank: 15,
    points: 1432,
    wins: 14,
    members: ["ICE_COLD", "FROST_BITE", "SNOW_WOLF", "ARCTIC_FOX"],
    logo: "❄️",
    bgColor: "#3b82f6",
    status: "ROOKIE",
  },
];

export const localTeams: Team[] = [
  {
    id: 7,
    name: "TASHKENT TIGERS",
    country: "UZB",
    rank: 8,
    points: 1876,
    wins: 24,
    members: ["TIGER_UZ", "TASH_HERO", "SILK_ROAD", "REGISTAN"],
    logo: "🐅",
    bgColor: "#f3aa01",
    status: "LOCAL",
  },
  {
    id: 8,
    name: "SAMARKAND LIONS",
    country: "UZB",
    rank: 11,
    points: 1698,
    wins: 19,
    members: ["LION_SMK", "GOLDEN_DOME", "BLUE_CITY", "ANCIENT_WAR"],
    logo: "🦁",
    bgColor: "#f3aa01",
    status: "LOCAL",
  },
];

// Prize data
export const prizes: Prize[] = [
  {
    rank: "1",
    title: "BIRINCHI O'RIN",
    prize: "$25,000",
    description: "Oltin medal va eternal trophy",
    icon: Crown,
    bgColor: "#f3aa01",
    glow: "#f3aa01",
  },
  {
    rank: "2",
    title: "IKKINCHI O'RIN",
    prize: "$15,000",
    description: "Kumush medal va premium rewards",
    icon: Trophy,
    bgColor: "#c0c0c0",
    glow: "#c0c0c0",
  },
  {
    rank: "3",
    title: "UCHINCHI O'RIN",
    prize: "$10,000",
    description: "Bronza medal va special items",
    icon: Medal,
    bgColor: "#cd7f32",
    glow: "#cd7f32",
  },
];

// Achievement data
export const achievements: Achievement[] = [
  {
    title: "HEADSHOT MASTER",
    description: "100+ headshot kills",
    icon: Target,
    count: "2,547",
    label: "Foydalanuvchilar oldi",
    color: "#f3aa01",
  },
  {
    title: "SURVIVAL KING",
    description: "Top 10 da 50 marta",
    icon: Star,
    count: "1,892",
    label: "Foydalanuvchilar oldi",
    color: "#00d4ff",
  },
  {
    title: "KILL STREAK",
    description: "10+ kills bir o'yinda",
    icon: Zap,
    count: "758",
    label: "Foydalanuvchilar oldi",
    color: "#ff4081",
  },
];

// Match data
export const matches: Match[] = [
  {
    id: 1,
    time: "18:00",
    date: "15 Yanvar",
    teams: [
      { name: "Team Alpha", logo: "/api/placeholder/40/40", score: 12 },
      { name: "Team Beta", logo: "/api/placeholder/40/40", score: 8 },
    ],
    status: "completed",
    tournament: "PUBG Mobile Championship",
    map: "Erangel",
    prize: "$50,000",
  },
  {
    id: 2,
    time: "20:30",
    date: "15 Yanvar",
    teams: [
      { name: "Team Gamma", logo: "/api/placeholder/40/40" },
      { name: "Team Delta", logo: "/api/placeholder/40/40" },
    ],
    status: "live",
    tournament: "PUBG Mobile Championship",
    map: "Sanhok",
    prize: "$50,000",
  },
  {
    id: 3,
    time: "22:00",
    date: "15 Yanvar",
    teams: [
      { name: "Team Echo", logo: "/api/placeholder/40/40" },
      { name: "Team Foxtrot", logo: "/api/placeholder/40/40" },
    ],
    status: "upcoming",
    tournament: "PUBG Mobile Championship",
    map: "Miramar",
    prize: "$50,000",
  },
  {
    id: 4,
    time: "19:00",
    date: "16 Yanvar",
    teams: [
      { name: "Team Golf", logo: "/api/placeholder/40/40" },
      { name: "Team Hotel", logo: "/api/placeholder/40/40" },
    ],
    status: "upcoming",
    tournament: "PUBG Mobile Championship",
    map: "Vikendi",
    prize: "$50,000",
  },
];
