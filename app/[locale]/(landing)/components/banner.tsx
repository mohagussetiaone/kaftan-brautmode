import { useTranslations } from "next-intl";

const Banner = ({ src }: { src: string }) => {
  const t = useTranslations("LandingBanner");

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="grid grid-cols-2 text-center h-full items-center mx-auto max-w-6xl px-4">
        <div className="md:flex-1" />
        <div className="flex flex-col justify-end md:justify-center items-end md:items-center text-end md:text-center whitespace-nowrap">
          <p className="text-4xl md:text-6xl font-medium text-white mb-4 font-playfair">{t("title")}</p>
          <p className="text-4xl md:text-6xl font-medium text-white mb-4 font-playfair">{t("title_two")}</p>
          <p className="text-sm md:text-lg text-white mb-8">{t("description")}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
