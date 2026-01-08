"use client";

import { useState, useRef, useEffect } from "react";
import { MinusIcon, PlusIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { formatCurrency } from "@/app/utils/format-currency";
import Image from "next/image";

export default function Carts() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const cartIconRef = useRef<HTMLDivElement>(null);
  const waveAnimationRef = useRef<HTMLDivElement>(null);

  const { cartItems, selectedItems, updateQuantity, toggleSelectItem, removeFromCart, toggleSelectAll, isAllSelected, removeSelectedItems } = useCart();

  const sendCartPosition = (requestId: string) => {
    if (!cartIconRef.current) return;

    const rect = cartIconRef.current.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };

    console.log("📤 Sending cart position:", position);

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

  const handleViewCart = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  const handleCheckout = () => {
    router.push("/checkout");
    setIsOpen(false);
  };

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    updateQuantity(cartItemId, quantity);
  };

  const handleDelete = (cartItemId: string) => {
    removeFromCart(cartItemId);
  };

  const handleToggleSelectItem = (cartItemId: string) => {
    toggleSelectItem(cartItemId);
  };

  const handleToggleSelectAll = () => {
    toggleSelectAll();
  };

  const handleRemoveSelected = () => {
    removeSelectedItems();
  };

  // Listen untuk cart animation events
  useEffect(() => {
    const unsubscribeAnimation = eventBroadcaster.onCartAnimation(() => {
      triggerCartIconAnimation();
    });

    // Listen untuk cart position requests
    const unsubscribePositionRequest = eventBroadcaster.onCartPositionRequest((data) => {
      console.log("📍 Received cart position request:", data);
      sendCartPosition(data.requestId);
    });

    return () => {
      unsubscribeAnimation();
      unsubscribePositionRequest();
    };
  }, []);

  // Hitung total quantity untuk badge
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Hitung subtotal dari semua item di cart (bukan hanya yang terpilih)
  const allItemsSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hitung tax dan shipping dari semua item
  const allItemsTax = allItemsSubtotal * 0.11;
  const allItemsShipping = allItemsSubtotal > 100 ? 0 : 0;
  const allItemsTotal = allItemsSubtotal + allItemsTax + allItemsShipping;

  return (
    <div className="flex items-center gap-4">
      {/* CSS Animations */}
      <style>{`
        @keyframes cartBounce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.2); }
        }

        @keyframes cartWave {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        .cart-bounce {
          animation: cartBounce 0.6s ease-in-out;
        }

        .cart-wave {
          animation: cartWave 0.8s ease-out;
        }

        @keyframes flyToCart {
          0% {
            transform: translate(var(--start-x), var(--start-y)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0);
            opacity: 0;
          }
        }

        .flying-item {
          animation: flyToCart 0.8s ease-in forwards;
          position: fixed;
          z-index: 10000;
          pointer-events: none;
        }
      `}</style>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
            {/* Wave animation */}
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

            {/* Cart icon */}
            <div ref={cartIconRef} id="main-cart-icon" className="relative z-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors w-6 h-6 duration-200">
              <ShoppingCartIcon className="w-10 h-10" color="white" />
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

          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <CartEmpty />
            ) : (
              <div className="max-w-2xl mx-auto p-4">
                <div className="space-y-6">
                  {/* Select All / Remove Selected */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" checked={isAllSelected()} onChange={handleToggleSelectAll} className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm text-gray-600">Select all items</span>
                    </div>
                    {selectedItems.length > 0 && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleRemoveSelected}>
                        Remove selected ({selectedItems.length})
                      </Button>
                    )}
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.cartItemId} className="flex items-start space-x-4">
                        {/* Selection Checkbox */}
                        <input type="checkbox" checked={selectedItems.includes(item.cartItemId)} onChange={() => handleToggleSelectItem(item.cartItemId)} className="h-4 w-4 mt-4 rounded border-gray-300" />

                        {/* Item Image */}
                        <div className="relative w-20 h-30 shrink-0">
                          <Image src={item.image.src} alt={item.name} fill className="w-full h-full object-cover rounded" />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
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
                            <div className="flex items-center border border-primary rounded-md">
                              <button
                                onClick={() => {
                                  const newQuantity = Math.max(item.minOrder || 1, item.quantity - 1);
                                  handleQuantityChange(item.cartItemId, newQuantity);
                                }}
                                className="flex size-9 items-center justify-center hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={item.quantity <= (item.minOrder || 1)}
                                aria-label="Decrease quantity"
                              >
                                <MinusIcon className="size-4" />
                              </button>

                              <div className="relative">
                                <span className="flex w-12 items-center justify-center text-sm font-medium">{item.quantity}</span>

                                {/* Min order indicator */}
                                {item.minOrder > 1 && (
                                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                    <span className="text-[10px] text-muted-foreground">Min: {item.minOrder}</span>
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => {
                                  const newQuantity = item.quantity + 1;
                                  handleQuantityChange(item.cartItemId, newQuantity);
                                }}
                                className="flex size-9 items-center justify-center hover:bg-accent transition-colors"
                                aria-label="Increase quantity"
                              >
                                <PlusIcon className="size-4" />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <div className="mt-2 text-right">
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.cartItemId)}>
                              Remove
                            </Button>
                          </div>
                          {/* Item Total */}
                          <div className="mt-2 text-right">
                            <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-4 space-y-2">
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

                  {/* Checkout Button */}
                  <Button className="w-full" size="lg" onClick={handleCheckout} disabled={selectedItems.length === 0}>
                    Checkout ({selectedItems.length} items)
                  </Button>

                  {/* Info Text */}
                  <p className="text-xs text-center text-gray-500 italic">Shipping, taxes, and discount codes are calculated at checkout</p>

                  {/* View Cart Button */}
                  <Button variant="outline" className="w-full" onClick={handleViewCart}>
                    View Full Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
