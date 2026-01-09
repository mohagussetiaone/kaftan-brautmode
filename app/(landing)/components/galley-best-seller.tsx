import Gallery from "../components/gallery";
import { Button } from "@/components/ui/button";
import { GALLERY_CART_PRODUCTS } from "@/app/constants/product/product";

const GalleryBestSeller = () => {
  return (
    <div className="w-full text-center my-8">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl font-playfair">Best Seller</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_CART_PRODUCTS.filter((_, index) => index < 3).map((item) => (
            <Gallery {...item} key={item.id} />
          ))}
        </div>
        <Button>View All Products</Button>
      </div>
    </div>
  );
};

export default GalleryBestSeller;
