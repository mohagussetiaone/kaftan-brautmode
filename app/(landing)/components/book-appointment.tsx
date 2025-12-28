import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookBanner from "@/app/assets/images/book/book-banner.jpg";

const BookAppointment = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-12 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="font-playfair text-3xl md:text-4xl">Book you appointment</h1>
          <p className="text-base md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do euismod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud excertitation ullamco laboris nisi ut aliquip ex ea commodo
            censequat.
          </p>
          <p className="text-base md:text-xl">Enjoy comfortable booking experience</p>
          <div>
            <Button>Book Now</Button>
          </div>
        </div>
        <div className="relative h-100 w-full">
          <Image src={BookBanner} alt="about1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
