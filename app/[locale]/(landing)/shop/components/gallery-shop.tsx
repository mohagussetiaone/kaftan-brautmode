import { GALLERY_CART_PRODUCTS } from "@/app/constants/product/product";
import Gallery from "../../components/gallery";
import Filter from "./filter";

const GalleryShop = () => {
  return (
    <div className="p-4 md:p-8" id="gallery">
      <Filter />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-6">
          {GALLERY_CART_PRODUCTS.map((item) => (
            <Gallery {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryShop;
