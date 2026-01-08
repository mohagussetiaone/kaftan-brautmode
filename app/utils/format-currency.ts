export function formatCurrency(value: number): string {
  if (isNaN(value)) return "0 €";

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(value);
}
