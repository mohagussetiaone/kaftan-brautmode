"use client";

import { Trash2 } from "lucide-react";
import QuantityControl from "./quantity-control";
import ProductImage from "./product-image";
import ProductDetails from "./product-detail";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

export default function CartItem({ name, price, image, color, size, quantity, onQuantityChange, onDelete }: CartItemProps) {
  return (
    <div className="border-b border-border pb-6">
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <ProductImage src={image} alt={name} />

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <ProductDetails name={name} price={price} color={color} size={size} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4">
            <QuantityControl quantity={quantity} onChange={onQuantityChange} />
            <button onClick={onDelete} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
