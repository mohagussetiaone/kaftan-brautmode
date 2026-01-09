"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocaleData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCart } from "@/app/stores/cart.store";
import { eventBroadcaster } from "@/app/utils/event-broadcast";

import dayjs from "dayjs";
dayjs.extend(RelativeTime);
dayjs.extend(LocaleData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");
dayjs.tz.setDefault("Asia/Jakarta");

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CartEmpty from "./cart-empty";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";
import CheckoutButton from "./checkout-button";
import CartSelectAll from "./cart-select-all";

export default function Carts({ colorIcon = "white" }: { colorIcon?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const cartIconRef = useRef<HTMLDivElement>(null);
  const waveAnimationRef = useRef<HTMLDivElement>(null);

  const { cartItems } = useCart();

  const sendCartPosition = (requestId: string) => {
    if (!cartIconRef.current) return;

    const rect = cartIconRef.current.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };

    eventBroadcaster.sendCartPosition({
      requestId,
      targetId: "main-cart-icon",
      position,
    });
  };

  const triggerCartIconAnimation = () => {
    if (!cartIconRef.current) return;

    // Wave animation effect
    if (waveAnimationRef.current) {
      waveAnimationRef.current.classList.remove("cart-wave");
      void waveAnimationRef.current.offsetWidth;
      waveAnimationRef.current.classList.add("cart-wave");
    }

    // Cart icon bounce animation
    cartIconRef.current.classList.remove("cart-bounce");
    void cartIconRef.current.offsetWidth;
    cartIconRef.current.classList.add("cart-bounce");
  };

  // Listen untuk cart animation events
  useEffect(() => {
    const unsubscribeAnimation = eventBroadcaster.onCartAnimation(() => {
      triggerCartIconAnimation();
    });

    // Listen untuk cart position requests
    const unsubscribePositionRequest = eventBroadcaster.onCartPositionRequest((data) => {
      sendCartPosition(data.requestId);
    });

    return () => {
      unsubscribeAnimation();
      unsubscribePositionRequest();
    };
  }, []);

  // Hitung total quantity untuk badge
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex items-center gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className="hover:bg-white/10 transition-colors">
          <div className="relative cursor-pointer p-2 rounded-full">
            <div
              ref={waveAnimationRef}
              className="absolute inset-0 bg-[#387A5A] rounded-full opacity-0 pointer-events-none"
              style={{
                width: "40px",
                height: "40px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            />

            <div ref={cartIconRef} id="main-cart-icon" className="relative z-10 flex items-center justify-center rounded-full  w-6 h-6 duration-200">
              <ShoppingCartIcon className="w-10 h-10" color={colorIcon} />
              {cartItems.length > 0 && (
                <Badge className="absolute bg-red-500 rounded-full -top-1 -right-1 border-2 border-white min-w-4.5 h-4 p-0 text-xs flex items-center justify-center">
                  <span className="text-[10px] font-bold">{totalQuantity}</span>
                </Badge>
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-96 md:w-112.5 p-0" align="end">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-semibold">Cart ({cartItems.length} items)</h3>
            <Button variant="link" size="sm" className="text-sm" onClick={() => setIsOpen(false)}>
              <XIcon />
            </Button>
          </div>

          <hr />

          <div className="max-h-96 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="max-w-2xl mx-auto pl-4 pr-2">
                <div className="space-y-6">
                  {/* Select All / Remove Selected */}
                  <CartSelectAll />

                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem key={item.cartItemId} item={item} />
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <CartSummary />

                  <CheckoutButton setIsOpen={setIsOpen} />
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
