import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="w-20 h-28 md:w-24 md:h-32 shrink-0 bg-muted rounded-lg overflow-hidden">
      <Image src={src || "/placeholder.svg"} alt={alt} width={100} height={130} className="w-full h-full object-cover" />
    </div>
  );
}
