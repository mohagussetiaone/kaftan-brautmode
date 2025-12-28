import Image from "next/image";
import CatalogImg1 from "@/app/assets/images/catalog/catalog1.png";
import CatalogImg2 from "@/app/assets/images/catalog/catalog2.png";

const GridCatalog = () => {
  return (
    <div className="mx-auto max-w-7xl my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-playfair">Luxury designs,</h1>
            <h1 className="text-3xl md:text-5xl font-playfair">without Luxury price</h1>
            <p>Experience premium craftsmanship, timeless silhouettes, and high quality fabrics crafted to make your moment unforgettable at a price that keeps elegance within reach.</p>
          </div>
          <Image src={CatalogImg1} alt="model1" width={750} height={750} />
        </div>
        <div className="flex flex-col gap-20">
          <Image src={CatalogImg2} alt="model1" width={750} height={750} />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-playfair">Elegant gowns,</h1>
            <h1 className="text-3xl md:text-5xl font-playfair">made effortless</h1>
            <p>Where timeless design meets modern simplicity. Find the gown that feels just right for your moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCatalog;
