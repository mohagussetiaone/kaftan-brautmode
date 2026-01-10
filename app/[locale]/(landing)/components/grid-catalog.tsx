import Image from "next/image";
import { useTranslations } from "next-intl";
import CatalogImg1 from "@/app/assets/images/catalog/catalog1.png";
import CatalogImg2 from "@/app/assets/images/catalog/catalog2.png";

const GridCatalog = () => {
  const t = useTranslations("Catalog");

  return (
    <div className="mx-auto max-w-7xl my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-playfair">{t("title_left")}</h1>
            <h1 className="text-3xl md:text-5xl font-playfair">{t("title_two_left")}</h1>
            <p>{t("description_left")}</p>
          </div>
          <Image src={CatalogImg1} alt="model1" width={750} height={750} />
        </div>
        <div className="flex flex-col gap-20">
          <Image src={CatalogImg2} alt="model1" width={750} height={750} />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-playfair">{t("title_right")}</h1>
            <h1 className="text-3xl md:text-5xl font-playfair">{t("title_two_right")}</h1>
            <p>{t("description_right")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCatalog;
