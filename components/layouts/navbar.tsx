"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, SearchIcon, ShoppingCartIcon, User2Icon } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import Logo from "@/app/assets/images/logo/main-logo.png";
import { routes } from "@/routes/route";
import Carts from "@/app/(landing)/components/cart/cart-main";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>("");

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Close dropdown on scroll
      if (active) {
        setActive(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, active]);

  // Responsive handling
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsOpen(false);
      } else {
        setActive(null);
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  // Reset accordion ketika sheet ditutup
  const handleSheetOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAccordionValue("");
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/30 backdrop-blur-2xl py-2 shadow-lg" : "bg-transparent backdrop-blur-2xl py-2"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4">
          <div />

          {/* Desktop Navigation dengan Hover Menu */}
          <div className="hidden md:flex items-center justify-center">
            <div className="hidden md:flex items-center justify-start">
              <Link href="/" className="flex items-center">
                <Image width={60} height={60} src={Logo} alt="logo" className="transition-transform duration-300 hover:scale-105" />
              </Link>
            </div>
            <Menu setActive={setActive}>
              {routes.map((route) => {
                if (route.subRoutes && route.subRoutes.length > 0) {
                  return (
                    <MenuItem key={route.name} setActive={setActive} active={active} item={route.name} scrolled={scrolled}>
                      <div className="grid grid-cols-3 gap-8 text-sm p-6 ml-64">
                        {route.subRoutes.map((group) => (
                          <div key={group.name} className="space-y-4">
                            <h4 className="font-medium font-playfair text-2xl text-white">{group.name}</h4>
                            <div className="space-y-1">
                              {group?.items?.map((item, index) => (
                                <HoveredLink key={index} href={item.to} onClick={() => setActive(null)}>
                                  <div className="flex items-center">
                                    <span className="font-medium text-lg">{item.name}</span>
                                  </div>
                                </HoveredLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </MenuItem>
                  );
                } else {
                  return (
                    <div key={route.name} className="relative mx-4" onMouseEnter={() => setActive(null)}>
                      <Link href={route.to} className="block">
                        <span
                          className={clsx("font-medium transition-colors duration-200 cursor-pointer", {
                            "text-white": pathname === route.to,
                            "text-gray-300 hover:text-white": pathname !== route.to,
                          })}
                        >
                          {route.name}
                        </span>
                      </Link>
                    </div>
                  );
                }
              })}
            </Menu>
          </div>

          {/* Icons Section */}
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
            {/* Logo di tengah (mobile) */}
            <div className="flex md:hidden items-center justify-center">
              <Link href="/" className="flex">
                <Image width={50} height={50} src={Logo} alt="logo" />
              </Link>
            </div>

            <div className="hidden md:flex gap-4 items-center">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <User2Icon color="white" size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <SearchIcon color="white" size={20} />
              </button>
              <Carts />
              {/* <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <ShoppingCartIcon color="white" size={20} />
              </button> */}
            </div>

            {/* Mobile Menu Trigger dengan Accordion */}
            <div className="flex items-center md:hidden">
              <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
                <SheetTrigger asChild>
                  <button className="p-2">
                    <MenuIcon className="w-8 h-8 text-white" suppressHydrationWarning />
                  </button>
                </SheetTrigger>
                <SheetContent className="p-0 z-100 md:hidden w-full max-w-xs sm:max-w-sm bg-transparent backdrop-blur-2xl">
                  <SheetHeader className="px-4 pt-6">
                    <SheetTitle className="sr-only">menu</SheetTitle>
                    <VisuallyHidden>
                      <span>Menu Navigation</span>
                    </VisuallyHidden>
                  </SheetHeader>

                  <div className="px-4 min-h-screen overflow-y-auto pb-16">
                    {/* Menu items */}
                    <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={setAccordionValue}>
                      {routes.map((route) => {
                        const isActive = pathname === route.to;
                        const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
                        const itemKey = `item-${route.name.replace(/\s+/g, "-").toLowerCase()}`;

                        if (!hasSubRoutes) {
                          return (
                            <div key={route.name} className="mb-1">
                              <Link
                                href={route.to}
                                onClick={() => setIsOpen(false)}
                                className={clsx("flex items-center justify-between p-3 text-lg font-medium rounded-lg transition-colors", {
                                  "text-white bg-white/10": isActive,
                                  "text-gray-300 hover:bg-white/5 hover:text-white": !isActive,
                                })}
                              >
                                {route.name}
                              </Link>
                            </div>
                          );
                        }

                        return (
                          <AccordionItem key={route.name} value={itemKey} className="border-b-0 mb-1">
                            <AccordionTrigger
                              className={clsx("p-3 text-lg font-medium rounded-lg hover:no-underline hover:bg-white/5 transition-colors", {
                                "text-white bg-white/10": isActive,
                                "text-gray-300 hover:text-white": !isActive,
                              })}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{route.name}</span>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="pt-0">
                              <div className="pl-2 mt-1 space-y-1">
                                {route.subRoutes?.map((group) => (
                                  <div key={group.name} className="space-y-2">
                                    {group.name && (
                                      <div className="pt-2 pb-1">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{group.name}</span>
                                      </div>
                                    )}

                                    <div className="space-y-0.5">
                                      {group?.items?.map((item) => {
                                        const isItemActive = pathname === item.to;
                                        return (
                                          <Link
                                            key={item.to}
                                            href={item.to}
                                            onClick={() => setIsOpen(false)}
                                            className={clsx("block py-2 px-3 text-sm rounded-md transition-colors", {
                                              "text-white bg-white/10": isItemActive,
                                              "text-gray-300 hover:text-white hover:bg-white/5": !isItemActive,
                                            })}
                                          >
                                            {item.name}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>

                  <SheetFooter className="mt-4 px-4 pb-6">
                    <div className="flex flex-col gap-2 w-full">
                      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white" onClick={() => setIsOpen(false)}>
                        <User2Icon size={20} />
                        <span>Account</span>
                      </button>
                      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white" onClick={() => setIsOpen(false)}>
                        <SearchIcon size={20} />
                        <span>Search</span>
                      </button>
                      <Carts />
                      {/* <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-white" onClick={() => setIsOpen(false)}>
                        <ShoppingCartIcon size={20} />
                        <span>Cart</span>
                      </button> */}
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
