export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

// v2 navigation: five destinations, no mega menus (docs/plan.md).
export const mainNav: NavLink[] = [
  { label: "Worlds", href: "/worlds" },
  { label: "Schedule", href: "/schedule" },
  { label: "Teams", href: "/teams" },
  { label: "News", href: "/news" },
  { label: "Watch", href: "/watch" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Follow",
    links: [
      { label: "World Championship", href: "/worlds" },
      { label: "Schedule", href: "/schedule" },
      { label: "Teams", href: "/teams" },
    ],
  },
  {
    title: "Read & watch",
    links: [
      { label: "News", href: "/news" },
      { label: "Watch", href: "/watch" },
      { label: "About Gildra", href: "/about" },
    ],
  },
  {
    title: "Official broadcasts",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@ClashofClans", external: true },
      { label: "Twitch", href: "https://www.twitch.tv/clashofclans", external: true },
    ],
  },
];
