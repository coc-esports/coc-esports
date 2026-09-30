import { site } from "@/config/site";
import { getStage, stages } from "@/data/season";

// Downloadable .ics calendar file for stages with a known start time (PLAN.md §5 /schedule).
export const dynamicParams = false;

export function generateStaticParams() {
  return stages.filter((s) => s.startTime).map((s) => ({ slug: s.slug }));
}

// 2026-10-10T16:00:00Z -> 20261010T160000Z
const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escape = (text: string) => text.replace(/[\\;,]/g, (c) => `\\${c}`);

export async function GET(_request: Request, ctx: RouteContext<"/calendar/[slug]">) {
  const { slug } = await ctx.params;
  const stage = getStage(slug);
  if (!stage?.startTime) return new Response("Not found", { status: 404 });

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Esports schedule//EN`,
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${stage.slug}@${site.name.toLowerCase().replace(/\s+/g, "-")}`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(stage.startTime)}`,
    `DTEND:${icsDate(stage.endTime ?? stage.startTime)}`,
    `SUMMARY:${escape(`Clash of Clans esports: ${stage.name}`)}`,
    `DESCRIPTION:${escape(stage.format)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${stage.slug}.ics"`,
    },
  });
}
