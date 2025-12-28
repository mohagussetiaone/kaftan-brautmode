import Banner from "./components/banner";
import GalleryBestSeller from "./components/galley-best-seller";
import GridCatalog from "./components/grid-catalog";
import BannerBody from "./components/banner-body";
import AboutUs from "./components/about-us";
import GalleryCard from "./shop/gallery-card";
import BlogCard from "./components/blog-card";
import GalleryTwo from "./components/gallery-two";
import BookAppointment from "./components/book-appointment";

const Page = () => {
  return (
    <>
      <Banner />
      <GalleryBestSeller />
      <GridCatalog />
      <BannerBody />
      <AboutUs />
      <GalleryCard />
      <BlogCard />
      <GalleryTwo />
      <BookAppointment />
    </>
  );
};

export default Page;
