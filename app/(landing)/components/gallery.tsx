import Image from "next/image";
import { GalleryDummy } from "@/app/constants/gallery/gallery-dummy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  return (
    <div className="mx-auto max-w-6xl text-center mt-8">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl font-playfair">Shop Our Styles</h1>
        <Tabs defaultValue="account" className="data-[state=active]:bg-none dark:data-[state=active]:text-black">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="wedding-dress"
              className="data-[state=active]:bg-transparent p-6 dark:data-[state=active]:text-black dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent shadow-none data-[state=active]:shadow-none relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent data-[state=active]:after:bg-[#624525] data-[state=active]:text-[#624525]"
            >
              Wedding dress
            </TabsTrigger>
            <TabsTrigger
              value="uncovered"
              className="data-[state=active]:bg-transparent p-6 dark:data-[state=active]:text-black dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent shadow-none data-[state=active]:shadow-none relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent data-[state=active]:after:bg-[#624525] data-[state=active]:text-[#624525]"
            >
              Uncovered
            </TabsTrigger>
            <TabsTrigger
              value="accessories"
              className="data-[state=active]:bg-transparent p-6 dark:data-[state=active]:text-black dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent shadow-none data-[state=active]:shadow-none relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-transparent data-[state=active]:after:bg-[#624525] data-[state=active]:text-[#624525]"
            >
              Accessories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account"></TabsContent>
          <TabsContent value="password"></TabsContent>
        </Tabs>
        <div className="grid grid-cols-3 gap-4">
          {GalleryDummy.map((item) => (
            <div key={item.id} className="mb-4">
              <Image src={item.imageUrl} alt={`Gallery Image ${item.id}`} />
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
