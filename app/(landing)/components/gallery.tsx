import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const Gallery = ({ id, imageUrl, name, price }: { id: number; imageUrl: StaticImageData; name: string; price: string }) => {
  return (
    <div key={id} className="mb-4">
      <Image src={imageUrl} alt={`Gallery Image ${id}`} />
      <Link href={`/catalog/${id}`} className="flex flex-col gap-2 justify-center items-center">
        <p>{name}</p>
        <p>{price}</p>
      </Link>
    </div>
  );
};

export default Gallery;
