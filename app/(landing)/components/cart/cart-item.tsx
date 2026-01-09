"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/format-currency";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/stores/cart.store";
import { SampleCartProductsType } from "@/app/types/product.type";
import CartQuantity from "./cart-quantity";

export default function CartItem({ item }: { item: SampleCartProductsType }) {
  const { selectedItems, toggleSelectItem, removeFromCart } = useCart();

  const handleDelete = (cartItemId: string) => {
    removeFromCart(cartItemId);
  };

  const handleToggleSelectItem = (cartItemId: string) => {
    toggleSelectItem(cartItemId);
  };

  return (
    <div className="flex items-start space-x-4">
      {/* Selection Checkbox */}
      <Checkbox checked={selectedItems.includes(item.cartItemId)} onCheckedChange={() => handleToggleSelectItem(item.cartItemId)} id={`checkbox-${item.cartItemId}`} />

      {/* Item Image */}
      <div className="relative w-20 h-30 shrink-0">
        <Image src={item.image.src} alt={item.name} fill className="w-full h-full object-cover rounded" />
      </div>

      {/* Item Details */}
      <div className="flex-1">
        <div className="flex flex-col">
          <h4 className="font-medium text-sm">{item.name}</h4>
          <span className="font-medium">{formatCurrency(item.price)}</span>
        </div>

        {/* Selected Options */}
        {item.selectedOptions && (
          <div className="mt-1 text-xs text-gray-500">
            {item.selectedOptions.color && (
              <div className="flex items-center gap-1">
                <span>Color: {item.selectedOptions.color.name}</span>
              </div>
            )}
            {item.selectedOptions.size && <span>Size: {item.selectedOptions.size.name}</span>}
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex gap-3 mt-2">
          <CartQuantity item={item} />

          <Button variant="link" size="sm" className="underline p-0 text-black text-sm" onClick={() => handleDelete(item.cartItemId)}>
            Remove
          </Button>
        </div>

        {/* Item Total */}
        <div className="mt-2 text-right">
          <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
