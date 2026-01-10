import Image from "next/image";
import { useTranslations } from "next-intl";
import AboutImg1 from "@/app/assets/images/about/about1.jpg";
import AboutImg2 from "@/app/assets/images/about/about2.jpg";
import AboutImg3 from "@/app/assets/images/about/about3.jpg";
import AboutImg4 from "@/app/assets/images/about/about4.jpg";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="px-8 md:px-20">
          <p className="text-3xl md:text-5xl font-medium mb-4 font-playfair">{t("title")}</p>
          <p className="text-base md:text-lg mb-8">{t("subtitle")}</p>
          <p className="text-base md:text-lg">{t("description")}</p>
          <Button className="mt-4">{t("button")}</Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-5 gap-2">
            <div className="relative col-span-2 h-75 overflow-hidden">
              <Image src={AboutImg1} fill alt="about1" className="object-cover" />
            </div>

            <div className="relative col-span-3 h-75 overflow-hidden">
              <Image src={AboutImg2} fill alt="about2" className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div className="relative col-span-3 h-75 overflow-hidden">
              <Image src={AboutImg3} fill alt="about3" className="object-cover" />
            </div>

            <div className="relative col-span-2 h-75 overflow-hidden">
              <Image src={AboutImg4} fill alt="about4" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
