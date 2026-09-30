// All dates are shown in UTC so server and browser render the same text.
const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const fullDateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

export const formatDate = (iso: string) => fullDateFmt.format(new Date(iso));
export const formatDateTimeUTC = (iso: string) => {
  const d = new Date(iso);
  return `${dateFmt.format(d)} · ${timeFmt.format(d)} UTC`;
};
export const formatNumber = (n: number) => n.toLocaleString("en-US");
