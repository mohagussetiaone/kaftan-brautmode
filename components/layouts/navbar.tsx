"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import Routes from "@/app/routes/route-path";
import { Menu, SearchIcon, ShoppingCartIcon, User2Icon } from "lucide-react";

import { usePathname } from "next/navigation";
import Logo from "@/app/assets/images/logo/main-logo.png";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// import ProfileNavbarLanding from "./profile-navbar-landing";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const { data: session } = useSession();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-2xl">
      <div className="flex mx-auto justify-between p-2 md:px-4">
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-6 justify-center">
          <Link href="/" className="flex">
            <Image width={60} height={60} src={Logo} alt="logo" />
          </Link>
          <Routes onNavigate={() => setIsOpen(false)} />
          {/* {session?.user.role === "USER" && ( */}
          {/* <ul>
            <li>
              <Link
                href="/dashboard"
                className={clsx("block p-2 font-semibold text-center rounded md:border-none border border-gray-600 hover:text-primary md:p-0", {
                  "border-primary underline-offset-4  text-primary decoration-brand-600": pathname === "/dashboard",
                  "text-gray-900": pathname !== "/dashboard",
                })}
              >
                Pemesanan
              </Link>
            </li>
          </ul> */}
          {/* )} */}

          {/* {session?.user.role === "ADMIN" && ( */}
          {/* <ul className="items-center">
            <li>
              <Link
                href="/admin"
                className={clsx("block p-2 font-semibold text-center rounded md:border-none border border-gray-600 hover:text-primary md:p-0", {
                  "border-primary underline-offset-4  text-primary decoration-brand-600": pathname === "/admin",
                  "text-gray-900": pathname !== "/admin",
                })}
              >
                Administrator
              </Link>
            </li>
          </ul> */}
          {/* )} */}
        </div>
        <div className="flex-1 hidden md:flex justify-end gap-4">
          {/* {session ? (
              <ProfileNavbarLanding session={session} />
            ) : ( */}
          <div className="flex gap-2 items-center space-x-4 text-white">
            <User2Icon color="white" />
            <SearchIcon color="white" />
            <ShoppingCartIcon color="white" />
            {/* <Button variant="outline" className="hidden border border-primary text-primary hover:text-primary/80 md:inline-flex" onClick={() => router.push("/signin")}>
              Masuk
            </Button>
            <Button>Daftar</Button> */}
          </div>
          {/* // )} */}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          {/* {session !== null && <ProfileNavbarLanding session={session} />} */}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu className="w-8 h-8 md:hidden" />
            </SheetTrigger>
            <SheetContent className="p-4 z-999 md:hidden">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle className="hidden sr-only"></SheetTitle>
                  <SheetDescription>Menu Navigation</SheetDescription>
                </VisuallyHidden>
                <div className="pb-6" />
                <Routes onNavigate={() => setIsOpen(false)} />
                {/* {session?.user.role === "ADMIN" && ( */}
                <ul>
                  <li>
                    <Link
                      href="/admin"
                      className={clsx("block p-2 font-semibold text-center rounded md:border-none border border-gray-600 hover:text-primary md:p-0", {
                        "border-primary underline-offset-4  text-primary decoration-brand-600": pathname === "/dashboard",
                        "text-gray-900": pathname !== "/admin",
                      })}
                    >
                      Administrator
                    </Link>
                  </li>
                </ul>
                {/* )} */}
                {/* {session?.user.role === "USER" && ( */}
                <ul>
                  <li>
                    <Link
                      href="/dashboard"
                      className={clsx("block p-2 font-semibold text-center rounded md:border-none border border-gray-600 hover:text-primary md:p-0", {
                        "border-primary underline-offset-4  text-primary decoration-brand-600": pathname === "/dashboard",
                        "text-gray-900": pathname !== "/dashboard",
                      })}
                    >
                      Pemesanan
                    </Link>
                  </li>
                </ul>
                {/* )} */}
              </SheetHeader>
              <SheetFooter className="pt-4 flex">
                {/* {session === null ? ( */}
                {/* <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="border border-primary text-primary hover:text-primary/80"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/signin");
                    }}
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/signup");
                    }}
                  >
                    Daftar
                  </Button>
                </div> */}
                {/* ) : null} */}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
