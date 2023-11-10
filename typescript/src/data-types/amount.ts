const usdFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format;

export function formatAmount(amount: number): string {
  return `${usdFormat(amount / 100)}`;
}
