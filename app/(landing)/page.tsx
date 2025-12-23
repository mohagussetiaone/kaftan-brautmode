import bgImage from "@/app/assets/images/banner/main-banner.jpg";
import Banner from "./components/banner";
import Gallery from "./components/gallery";

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
      <Gallery />
    </>
  );
};

export default Page;
