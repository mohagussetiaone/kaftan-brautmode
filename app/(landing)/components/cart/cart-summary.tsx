interface CartSummaryProps {
  subtotal: number;
  currency: string;
}

export default function CartSummary({ subtotal, currency }: CartSummaryProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-border">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Subtotal</p>
        <p className="text-lg font-semibold">
          {currency}
          {subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
