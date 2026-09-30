import type { Bracket, BracketMatch } from "./types";

const m = (id: string, aLabel: string, bLabel: string): BracketMatch => ({ id, aLabel, bLabel });

// Empty 8-team double-elimination bracket (Monthly Finals, LCQ and World Finals all use this).
// Fill in `a`/`b` team slugs and scores as results arrive.
export function doubleElim8(): Bracket {
  return {
    upper: [
      { name: "Upper Round 1", matches: [m("U1", "Seed TBD", "Seed TBD"), m("U2", "Seed TBD", "Seed TBD"), m("U3", "Seed TBD", "Seed TBD"), m("U4", "Seed TBD", "Seed TBD")] },
      { name: "Upper Semifinals", matches: [m("U5", "Winner U1", "Winner U2"), m("U6", "Winner U3", "Winner U4")] },
      { name: "Upper Final", matches: [m("U7", "Winner U5", "Winner U6")] },
    ],
    lower: [
      { name: "Lower Round 1", matches: [m("L1", "Loser U1", "Loser U2"), m("L2", "Loser U3", "Loser U4")] },
      { name: "Lower Round 2", matches: [m("L3", "Winner L1", "Loser U6"), m("L4", "Winner L2", "Loser U5")] },
      { name: "Lower Semifinal", matches: [m("L5", "Winner L3", "Winner L4")] },
      { name: "Lower Final", matches: [m("L6", "Winner L5", "Loser U7")] },
    ],
    final: { name: "Grand Final", matches: [m("GF", "Winner U7", "Winner L6")] },
  };
}
