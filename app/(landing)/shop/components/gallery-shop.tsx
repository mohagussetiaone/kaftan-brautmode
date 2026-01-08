import { GalleryDummy } from "@/app/constants/gallery/gallery-dummy";
import Gallery from "../../components/gallery";
import Filter from "./filter";

const GalleryShop = () => {
  return (
    <div className="p-4 md:p-8">
      <Filter />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-6">
          {GalleryDummy.map((item) => (
            <Gallery {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryShop;
