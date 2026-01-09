"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const Gallery = ({ id, image, name, price }: { id: string; image: StaticImageData; name: string; price: number }) => {
  return (
    <div key={id} className="mb-4">
      {image && <Image src={image} alt={`Gallery Image ${id}`} width={500} height={500} />}
      <Link href={`/catalog/${id}`} className="flex flex-col gap-2 justify-center items-center">
        <p>{name}</p>
        <p>{price}</p>
      </Link>
    </div>
  );
};

export default Gallery;
