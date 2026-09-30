export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
  feature?: { eyebrow: string; title: string; meta: string; href: string };
};

// Pages that don't exist yet show the "coming soon" 404 until their phase ships.
export const mainNav: NavItem[] = [
  {
    label: "Worlds",
    href: "/worlds",
    children: [
      { label: "World Championship 2026", href: "/worlds", description: "8 teams, $700k, double elimination" },
      { label: "Monthly Finals", href: "/stages", description: "May to September qualifiers and finals" },
      { label: "Last Chance Qualifier", href: "/stages/lcq-2026", description: "The final 3 tickets to Worlds" },
      { label: "Road to Worlds", href: "/worlds#road", description: "Every stage of the 2026 season" },
    ],
    feature: {
      eyebrow: "Next up",
      title: "Last Chance Qualifier",
      meta: "Oct 10, 2026 · 16:00 UTC",
      href: "/stages/lcq-2026",
    },
  },
  { label: "Schedule", href: "/schedule" },
  {
    label: "Teams",
    href: "/teams",
    children: [
      { label: "All teams", href: "/teams", description: "Rosters, results and clan stats" },
      { label: "The Chosen Eight", href: "/worlds#qualified", description: "Teams qualified for Worlds" },
      { label: "Season standings", href: "/worlds#standings", description: "Points table for 2026" },
    ],
  },
  { label: "Leaderboards", href: "/leaderboards" },
  { label: "Watch", href: "/watch" },
  { label: "News", href: "/news" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Esports",
    links: [
      { label: "World Championship", href: "/worlds" },
      { label: "Schedule", href: "/schedule" },
      { label: "Teams", href: "/teams" },
      { label: "Leaderboards", href: "/leaderboards" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Watch", href: "/watch" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Official broadcasts",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@ClashofClans", external: true },
      { label: "Twitch", href: "https://www.twitch.tv/clashofclans", external: true },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About this site", href: "/about" },
      { label: "Styleguide", href: "/styleguide" },
    ],
  },
];
