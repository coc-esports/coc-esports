// Three colour treatments of the same prototype, so the owner can compare them side by side.
// Each sets the page (CSS variables) and the 3D studio (background-free canvas, light colours, glass tint).
export type ThemeName = "trophy" | "night" | "editorial";

export type Theme = {
  name: ThemeName;
  label: string;
  note: string;
  css: Record<string, string>;
  three: {
    key: string; // main light panel colour (the big reflection on the gold)
    rim: string; // side strip colour
    glass: string; // tint of the open-seat glass tickets
    glassText: string;
    goldText: string; // engraving colour on gold
    bloom: number;
  };
  townHall: string;
};

export const themes: Record<ThemeName, Theme> = {
  trophy: {
    name: "trophy",
    label: "Trophy",
    note: "Black and real gold, like a trophy cabinet",
    css: {
      "--v3-bg": "#08070a",
      "--v3-bg-2": "#15110a",
      "--v3-glow": "rgba(227, 182, 91, 0.22)",
      "--v3-fg": "#f4ecdc",
      "--v3-muted": "#a39a8a",
      "--v3-accent": "#e3b65b",
      "--v3-accent-ink": "#120d04",
      "--v3-rule": "rgba(244, 236, 220, 0.14)",
    },
    three: { key: "#fff1d6", rim: "#ffb547", glass: "#17130e", glassText: "#e9dcc2", goldText: "#3a2507", bloom: 0.55 },
    townHall: "/art/th18-warm.webp",
  },
  night: {
    name: "night",
    label: "Clash Night",
    note: "Night purple, lightning blue and gold, from the game's own art",
    css: {
      "--v3-bg": "#0b0920",
      "--v3-bg-2": "#1d1150",
      "--v3-glow": "rgba(116, 92, 255, 0.32)",
      "--v3-fg": "#f1eeff",
      "--v3-muted": "#a9a3d6",
      "--v3-accent": "#6fc3ff",
      "--v3-accent-ink": "#06102a",
      "--v3-rule": "rgba(241, 238, 255, 0.14)",
    },
    three: { key: "#dfe8ff", rim: "#8a5bff", glass: "#140f3a", glassText: "#dcd6ff", goldText: "#2e1d05", bloom: 0.8 },
    townHall: "/art/th18-cold.webp",
  },
  editorial: {
    name: "editorial",
    label: "Editorial",
    note: "Paper white and black type, in the spirit of SN2 and The Romans",
    css: {
      "--v3-bg": "#ebe6dc",
      "--v3-bg-2": "#ddd5c5",
      "--v3-glow": "rgba(168, 120, 31, 0.16)",
      "--v3-fg": "#141210",
      "--v3-muted": "#5d564b",
      "--v3-accent": "#8a5d10",
      "--v3-accent-ink": "#fbf7ef",
      "--v3-rule": "rgba(20, 18, 16, 0.16)",
    },
    three: { key: "#ffffff", rim: "#ffd27a", glass: "#2a2620", glassText: "#efe9de", goldText: "#3a2507", bloom: 0.25 },
    townHall: "/art/th18-front.webp",
  },
};
