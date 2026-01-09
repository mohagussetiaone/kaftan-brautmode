import { useCart } from "@/app/stores/cart.store";
import { formatCurrency } from "@/app/utils/format-currency";

export default function CartSummary() {
  const { cartItems } = useCart();

  // Hitung subtotal dari semua item di cart (bukan hanya yang terpilih)
  const allItemsSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hitung tax dan shipping dari semua item
  const allItemsTax = allItemsSubtotal * 0.11;
  const allItemsShipping = allItemsSubtotal > 100 ? 0 : 0;
  const allItemsTotal = allItemsSubtotal + allItemsTax + allItemsShipping;

  return (
    <div className="border-t space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Subtotal</span>
        <span className="font-medium">{formatCurrency(allItemsSubtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Tax (11%)</span>
        <span className="font-medium">{formatCurrency(allItemsTax)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Shipping</span>
        <span className="font-medium">{allItemsShipping === 0 ? "FREE" : formatCurrency(allItemsShipping)}</span>
      </div>
      <div className="flex justify-between border-t pt-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-lg">{formatCurrency(allItemsTotal)}</span>
      </div>
    </div>
  );
}
