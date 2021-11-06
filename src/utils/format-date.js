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
  const match = local.match(/([0-9-]*T[0-9:]*)([+-][:0-9]*)/);
  const useMatch = match && match.length === 3;
  const datetime = useMatch ? match[1] : local;
  const offset = useMatch ? ` UTC${match[2]}` : '';
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
