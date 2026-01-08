"use client";

import BannerImg from "@/app/assets/images/banner/banner3.jpg";
import Banner from "../components/banner";
import GalleryShop from "./components/gallery-shop";

const page = () => {
  return (
    <section>
      <Banner src={BannerImg.src} />
      <GalleryShop />
    </section>
  );
};

export default page;
