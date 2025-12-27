import { GalleryDummy } from "@/app/constants/gallery/gallery-dummy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Gallery from "../components/gallery";
import { Button } from "@/components/ui/button";

const GalleryCard = () => {
  return (
    <div className="mx-auto max-w-6xl text-center my-8">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl font-playfair">Shop Our Styles</h1>
        <Tabs defaultValue="wedding-dress" className="flex justify-center items-center text-center">
          <TabsList className="bg-transparent flex justify-center items-center text-center mb-8">
            <TabsTrigger value="wedding-dress">Wedding dress</TabsTrigger>
            <TabsTrigger value="uncovered">Uncovered</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          <TabsContent value="wedding-dress">
            <div className="grid grid-cols-3 gap-4">
              {GalleryDummy.map((item) => (
                <Gallery {...item} key={item.id} />
              ))}
            </div>
            <Button>View All Products</Button>
          </TabsContent>
          <TabsContent value="uncovered">
            <div className="grid grid-cols-3 gap-4">
              {GalleryDummy.map((item) => (
                <Gallery {...item} key={item.id} />
              ))}
            </div>
            <Button>View All Products</Button>
          </TabsContent>
          <TabsContent value="accessories">
            <div className="grid grid-cols-3 gap-4">
              {GalleryDummy.map((item) => (
                <Gallery {...item} key={item.id} />
              ))}
            </div>
            <Button>View All Products</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GalleryCard;
