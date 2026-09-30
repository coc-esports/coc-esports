// Server-only client for the official Clash of Clans API (PLAN.md §7).
// Never import this from a "use client" file: it reads the secret COC_API_TOKEN.
// COC_API_BASE lets production point at a fixed-IP proxy later without code changes.

const BASE = process.env.COC_API_BASE ?? "https://api.clashofclans.com/v1";

type IconUrls = { tiny?: string; small?: string; medium?: string; large?: string };

export type LeagueTier = { id: number; name: string; iconUrls: IconUrls };
export type ClanRef = { tag: string; name: string; clanLevel: number; badgeUrls: IconUrls };

export type RankedPlayer = {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  attackWins: number;
  defenseWins: number;
  rank: number;
  previousRank: number;
  clan?: ClanRef;
  leagueTier?: LeagueTier;
};

export type Hero = { name: string; level: number; maxLevel: number; village: "home" | "builderBase" };

export type Player = {
  tag: string;
  name: string;
  townHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  donations: number;
  donationsReceived: number;
  role?: string;
  warPreference?: "in" | "out";
  clan?: ClanRef;
  leagueTier?: LeagueTier;
  heroes?: Hero[];
};

export type CocResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "no-token" | "forbidden" | "not-found" | "unavailable" };

async function cocFetch<T>(path: string, revalidate: number): Promise<CocResult<T>> {
  const token = process.env.COC_API_TOKEN;
  if (!token) return { ok: false, reason: "no-token" };
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate },
    });
    if (res.status === 403) return { ok: false, reason: "forbidden" }; // bad key or IP not whitelisted
    if (res.status === 404) return { ok: false, reason: "not-found" };
    if (!res.ok) return { ok: false, reason: "unavailable" };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

const tagPath = (tag: string) => encodeURIComponent(`#${tag.replace(/^#/, "")}`);

// Cache times: ladder 5 min, player profiles 10 min (PLAN.md §7).
export const getGlobalRankings = (limit = 200) =>
  cocFetch<{ items: RankedPlayer[] }>(`/locations/global/rankings/players?limit=${limit}`, 300);

export const getPlayer = (tag: string) => cocFetch<Player>(`/players/${tagPath(tag)}`, 600);
