export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function formatDateTimeLocal(local) {
  const match = local.match(/([T0-9-:]*)([+-][:0-9]*)/);
  const datetime = match.length >= 1 ? match[1] : local;
  const offset = match.length >= 2 ? ` UTC${match[2]}` : '';
  const dateString = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(new Date(datetime));
  return `${dateString}${offset}`;
}
