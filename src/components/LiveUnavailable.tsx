import type { CocResult } from "@/lib/coc";

type Reason = Extract<CocResult<unknown>, { ok: false }>["reason"];

const messages: Record<Reason, string> = {
  "no-token": "Live game data isn't switched on for this version of the site yet.",
  forbidden: "The game API refused the request. The API key may have expired or its IP address may have changed.",
  "not-found": "The game API couldn't find that.",
  unavailable: "The game API isn't responding right now. Try again in a few minutes.",
};

export function LiveUnavailable({ reason }: { reason: Reason }) {
  return (
    <div className="rounded-sm border border-dashed border-line p-8 text-center">
      <p className="font-display text-2xl uppercase">Live data offline</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{messages[reason]}</p>
    </div>
  );
}
