"use client";

import Image from "next/image";
import CartQuantity from "@/app/(landing)/components/cart/cart-quantity";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/stores/cart.store";
import { formatCurrency } from "@/app/utils/format-currency";
import { useRouter } from "next/navigation";
import CartOver from "@/app/(landing)/components/cart/cart-over";
import { GALLERY_CART_PRODUCTS } from "@/app/constants/product/product";
import BookAppointment from "@/app/(landing)/components/book-appointment";

const Carts = () => {
  const router = useRouter();

  const { cartItems, removeFromCart, selectedItems } = useCart();

  const handleDelete = (cartItemId: string) => {
    removeFromCart(cartItemId);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <h1 className="font-playfair text-black text-3xl text-center py-8">Cart</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="col-span-2">
          {/* HEADER */}
          <div className="grid grid-cols-3 border-b pb-3 mb-4 text-sm font-medium text-gray-500">
            <div>Product</div>
            <div className="text-end">Quantity</div>
            <div className="text-end"> Total</div>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="grid grid-cols-3 items-center border-b pb-4">
                {/* PRODUCT */}
                <div className="flex gap-4">
                  <div className="relative w-20 h-24 shrink-0">
                    <Image src={item.image} alt="cart-image" fill className="object-cover rounded" />
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <span className="font-medium text-sm">{formatCurrency(item.price)}</span>

                    <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                      {item.selectedOptions?.color && (
                        <div className="flex items-center gap-1">
                          <span>Color:</span>
                          <span>{item.selectedOptions.color.name}</span>
                        </div>
                      )}

                      {item.selectedOptions?.size && (
                        <div className="flex items-center gap-1">
                          <span>Size:</span>
                          <span>{item.selectedOptions.size.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-end">
                    <CartQuantity item={item} />
                  </div>

                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="underline p-0 text-black text-sm" onClick={() => handleDelete(item.cartItemId)}>
                      Remove
                    </Button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="font-medium text-end">{formatCurrency(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-2 md:col-span-1">
          <div className="space-y-2">
            <div className="text-end">
              <p>Subtotal</p>
              <p>{formatCurrency(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
            </div>
            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={selectedItems.length === 0}>
              Checkout ({selectedItems.length} items)
            </Button>

            {/* Info Text */}
            <p className="text-xs text-gray-500 italic">Shipping, taxes, and discount codes are calculated at checkout</p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-serif text-3xl font-semibold text-center text-balance mb-8">Continue Shopping</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_CART_PRODUCTS.slice(0, 3).map((product) => (
            <CartOver key={product.id} product={product} />
          ))}
        </div>
      </div>
      <BookAppointment />
    </div>
  );
};

export default Carts;
