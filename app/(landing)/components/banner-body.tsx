import BannerImg2 from "@/app/assets/images/banner/banner2.png";

const BannerBody = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BannerImg2.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        paddingTop: "70px",
      }}
    >
      <div className="grid grid-cols-2 text-center h-full items-center mx-auto max-w-6xl px-4">
        <div className="flex-1" />
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-6xl font-medium text-white mb-4 font-playfair">Timeless Gowns</p>
          <p className="text-6xl font-medium text-white mb-4 font-playfair">Modern Brides</p>
          <p className="text-lg text-white mb-8">Modern design, Classic elegance, and Perfectly you.</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBody;
