import bgImage from "@/app/assets/images/banner/main-banner.jpg";
import Banner from "./components/banner";
import GalleryBestSeller from "./components/galley-best-seller";
import GridCatalog from "./components/grid-catalog";
import BannerBody from "./components/banner-body";
import AboutUs from "./components/about-us";
import GalleryCard from "./shop/gallery-card";
import BlogCard from "./components/blog-card";

const Page = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          paddingTop: "70px",
        }}
      >
        <Banner />
      </div>
      <GalleryBestSeller />
      <GridCatalog />
      <BannerBody />
      <AboutUs />
      <GalleryCard />
      <BlogCard />
    </>
  );
};

export default Page;
