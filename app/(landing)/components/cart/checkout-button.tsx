"use client";

import { useCart } from "@/app/stores/cart.store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const router = useRouter();
  const { selectedItems } = useCart();

  const handleCheckout = () => {
    router.push("/checkout");
    setIsOpen(false);
  };

  const handleViewCart = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* Checkout Button */}
      <Button className="w-full" size="lg" onClick={handleCheckout} disabled={selectedItems.length === 0}>
        Checkout ({selectedItems.length} items)
      </Button>

      {/* Info Text */}
      <p className="text-xs text-gray-500 italic">Shipping, taxes, and discount codes are calculated at checkout</p>

      {/* View Cart Button */}
      <Button variant="outline" className="w-full" onClick={handleViewCart}>
        View Full Cart
      </Button>
    </div>
  );
}
