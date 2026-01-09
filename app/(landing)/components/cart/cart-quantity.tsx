import { useCart } from "@/app/stores/cart.store";
import { SampleCartProductsType } from "@/app/types/product.type";
import { MinusIcon, PlusIcon } from "lucide-react";

const CartQuantity = ({ item }: { item: SampleCartProductsType }) => {
  const { updateQuantity } = useCart();

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    updateQuantity(cartItemId, quantity);
  };

  return (
    <div className="flex items-center border border-primary">
      <button
        onClick={() => {
          const newQuantity = Math.max(item.minOrder || 1, item.quantity - 1);
          handleQuantityChange(item.cartItemId, newQuantity);
        }}
        className="flex size-9 items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
        className="flex size-9 items-center justify-center transition-colors"
        aria-label="Increase quantity"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

export default CartQuantity;
