export function formatNumber(number) {
  if (typeof number !== "number") {
    return "N/A";
  }

  return new Intl.NumberFormat(navigator.language, {
    maximumFractionDigits: 0,
  }).format(number);
}
