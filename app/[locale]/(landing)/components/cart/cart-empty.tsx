import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import EmptyCartImg from "@/assets/images/cart/empty-cart.png";
// import Image from "next/image";

const CartEmpty = () => {
  const router = useRouter();

  return (
    <div className="flex gap-4 flex-col items-center py-8">
      {/* <Image src={EmptyCartImg} className="w-40 h-44 min-w-40 min-h-44" alt="Empty" /> */}
      <h3 className="text-lg md:text-xl font-semibold">No items yet</h3>
      <p>Fill your cart with things you love!</p>
      <Button className="mt-4" onClick={() => router.push("/shop#gallery")}>
        Start Shopping
      </Button>
    </div>
  );
};

export default CartEmpty;
