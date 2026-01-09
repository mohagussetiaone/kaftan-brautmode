import Link from "next/link";
import { Facebook, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Footer = () => {
  return (
    <footer className="mx-auto block py-20 pb-2 bg-[#F4EFED]">
      <div className="mx-auto p-4 md:p-8 max-w-6xl grid grid-cols-1 md:grid-cols-12">
        <div className="flex flex-col gap-12 text-left lg:text-left col-span-7">
          <div className="w-full lg:w-6/12">
            <div className="flex gap-10 md:gap-40">
              <div className="w-full whitespace-nowrap">
                <span className="block text-blueGray-500 text-sm font-playfair mb-4">Shop</span>
                <ul className="list-unstyled">
                  <Link href="/catalogs" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Wedding dress</li>
                  </Link>
                  <Link href="/couple" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Uncovered</li>
                  </Link>
                  <Link href="/catalogs" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Accessories</li>
                  </Link>
                </ul>
              </div>
              <div className="w-full whitespace-nowrap">
                <span className="block text-blueGray-500 text-sm font-playfair mb-4">About</span>
                <ul className="list-unstyled">
                  <Link href="/faq" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>About us</li>
                  </Link>
                  <Link href="/contact" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Blog</li>
                  </Link>
                </ul>
              </div>
              <div className="w-full whitespace-nowrap">
                <span className="block text-blueGray-500 text-sm font-playfair mb-4">Information</span>
                <ul className="list-unstyled">
                  <Link href="/faq" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Contact</li>
                  </Link>
                  <Link href="/contact" className="hover:text-blueGray-800 font-normal block pb-2 text-sm">
                    <li>Appointments</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-8 mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl">Follow Us</h1>
              <p>Social media</p>
            </div>
            <div className="flex gap-4 mt-4">
              <span>
                <InstagramIcon size={25} />
              </span>
              <span>
                <Facebook size={25} />
              </span>
              <span>
                <YoutubeIcon size={25} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:min-w-120 col-span-3">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-playfair text-center">Subscribe now</h1>
            <p>Enter your email to receive your exclusive discount and get early access to new arrivals and specials offers</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="md:min-w-90 w-full">
                <Input className="rounded-none" placeholder="Enter your email here" />
              </div>
              <div>
                <Button className="rounded-none font-playfair bg-[#807770]">Subscribe</Button>
              </div>
            </div>
            <div className="flex">
              <Checkbox id="subscribe-newsletter" className="mr-2" />
              <Label htmlFor="subscribe-newsletter" className="text-sm">
                Agree Terms of Service and Privacy Policy, including receipt email and promotions
              </Label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
