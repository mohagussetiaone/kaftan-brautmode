import { useCart } from "@/app/stores/cart.store";
import { formatCurrency } from "@/app/utils/format-currency";

export default function CartSummary() {
  const { cartItems, selectedItems } = useCart();

  const itemsToCalculate = cartItems.filter((item) => selectedItems.includes(item.cartItemId));

  const subtotal = itemsToCalculate.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const tax = subtotal * 0.11;
  const shipping = subtotal > 100 ? 0 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="border-t space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Subtotal</span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Tax (11%)</span>
        <span className="font-medium">{formatCurrency(tax)}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-gray-600">Shipping</span>
        <span className="font-medium">{subtotal === 0 ? "-" : "FREE"}</span>
      </div>

      <div className="flex justify-between border-t pt-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold text-lg">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
