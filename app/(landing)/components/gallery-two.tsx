"use client";

import { motion } from "framer-motion";
import { galleryTwoDummy } from "@/app/constants/gallery/gallery-dummy";
import Image, { StaticImageData } from "next/image";

export interface Image {
  id: number;
  src: StaticImageData;
  alt: string;
  span: string;
}

export interface GalleryGridProps {
  images: Image[];
}

// Komponen untuk konten grid yang akan diulang - WIDTH DIPERBESAR
const GridContent = ({ images }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-450">
      {/* Width diperbesar */}
      <div className="grid grid-cols-2 gap-3 h-auto">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Image src={images[0].src} alt={images[0].alt} className="h-full w-200 object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
          </div>
          <div className="flex flex-col gap-3">
            <Image src={images[1].src} alt={images[1].alt} className="h-1/2 w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
            <Image src={images[2].src} alt={images[2].alt} className="h-1/2 w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-1/2">
            <Image src={images[3].src} alt={images[3].alt} className="h-full w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
          </div>
          <div className="grid grid-cols-2 gap-3 h-1/2">
            <Image src={images[4].src} alt={images[4].alt} className="h-full w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
            <Image src={images[5].src} alt={images[5].alt} className="h-full w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-full">
          <Image src={images[6].src} alt={images[6].alt} className="w-full h-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
        </div>
        <div className="flex flex-col gap-3 h-full">
          <Image src={images[7].src} alt={images[7].alt} className="h-1/2 w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
          <Image src={images[8].src} alt={images[8].alt} className="h-1/2 w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
        </div>
        <Image src={images[9].src} alt={images[9].alt} className="h-full w-full object-cover transition-all duration-300 rounded-lg cursor-pointer hover:scale-105" />
      </div>
    </div>
  );
};

const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <div className="relative overflow-hidden w-full h-full min-h-100">
      <motion.div
        className="flex h-full"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 120, // Durasi lebih lama karena width lebih besar
            ease: "linear",
          },
        }}
      >
        {/* Render tiga salinan grid untuk efek berulang tanpa jeda */}
        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} className="shrink-0 gap-3 px-3 w-auto h-full">
            <GridContent images={images} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function GalleryTwo() {
  return (
    <main className="h-auto bg-background overflow-hidden">
      <div className="w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-medium text-foreground text-center font-playfair py-8">Our Bride Love Story</h1>
        <GalleryGrid images={galleryTwoDummy} />
      </div>
    </main>
  );
}
