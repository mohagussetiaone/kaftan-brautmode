import { RelatedProduct } from "@/app/types/product.type";
import { Card } from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartOver = ({ product }: { product: RelatedProduct }) => {
  const router = useRouter();

  return (
    <Card key={product.id} className="group overflow-hidden border-0 shadow-none">
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <button className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background" aria-label="Add to favorites">
          <HeartIcon className="size-5" />
        </button>
      </div>
      <div className="mt-4 text-center" onClick={() => router.push(`/catalog/${product.id}`)}>
        <h3 className="font-serif text-lg font-medium">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">€{product.price.toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default CartOver;
