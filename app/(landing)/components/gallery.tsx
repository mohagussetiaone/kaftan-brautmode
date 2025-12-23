import Image from "next/image";
import { GalleryDummy } from "@/app/constants/gallery/gallery-dummy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Gallery = () => {
  return (
    <div className="mx-auto max-w-6xl text-center mt-8">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl font-playfair">Shop Our Styles</h1>
        <Tabs defaultValue="account">
          <TabsList className="bg-transparent">
            <TabsTrigger value="wedding-dress">Wedding dress</TabsTrigger>
            <TabsTrigger value="uncovered">Uncovered</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          <TabsContent value="account"></TabsContent>
          <TabsContent value="password"></TabsContent>
        </Tabs>
        <div className="grid grid-cols-3 gap-4">
          {GalleryDummy.map((item) => (
            <div key={item.id} className="mb-4">
              <Image src={item.imageUrl} alt={`Gallery Image ${item.id}`} />
              <Link href={`/catalog/${item.id}`} className="flex flex-col gap-2 justify-center items-center">
                <p>{item.name}</p>
                <p>{item.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
