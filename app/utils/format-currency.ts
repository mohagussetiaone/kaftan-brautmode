export function formatCurrency(value: number): string {
  if (Number.isNaN(value)) return "€0";

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  });

  const parts = formatter.formatToParts(value);

  const currency = parts.find((p) => p.type === "currency")?.value ?? "€";
  const number = parts
    .filter((p) => p.type !== "currency")
    .map((p) => p.value)
    .join("");

  return `${currency}${number}`;
}
