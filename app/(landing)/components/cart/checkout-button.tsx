"use client";

import { Button } from "@/components/ui/button";

export default function CheckoutButton() {
  const handleCheckout = () => {
    // Add checkout logic here
    console.log("Proceeding to checkout...");
  };

  return (
    <Button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-medium">
      Check out
    </Button>
  );
}
