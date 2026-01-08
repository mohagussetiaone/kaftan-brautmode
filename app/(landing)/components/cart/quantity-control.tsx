"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityControlProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export default function QuantityControl({ quantity, onChange }: QuantityControlProps) {
  return (
    <div className="flex items-center border border-border rounded-md">
      <Button variant="ghost" size="sm" onClick={() => onChange(quantity - 1)} className="h-8 w-8 p-0">
        <Minus className="w-4 h-4" />
      </Button>
      <input type="text" value={quantity} readOnly className="w-10 h-8 text-center text-sm border-0 bg-transparent outline-none" />
      <Button variant="ghost" size="sm" onClick={() => onChange(quantity + 1)} className="h-8 w-8 p-0">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
