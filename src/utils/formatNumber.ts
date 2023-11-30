export function formatNumber(number: number) {
  return Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(number);
}
