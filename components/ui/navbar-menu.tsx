"use client";

import clsx from "clsx";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

export const MenuItem = ({ setActive, active, item, children, scrolled, textColor }: { setActive: (item: string | null) => void; active: string | null; item: string; children?: React.ReactNode; scrolled: boolean; textColor?: string }) => {
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current || !active || active !== item) return;
    const navbarHeight = 75;

    setDropdownStyle({
      position: "fixed",
      top: navbarHeight,
      left: 0,
      width: "100%",
    });
  }, [active, item]);

  useEffect(() => {
    //eslint-disable-next-line
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!active || active !== item) return;
    //eslint-disable-next-line
    updateDropdownPosition();

    const handleScroll = () => {
      updateDropdownPosition();
    };

    const handleResize = () => {
      updateDropdownPosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, item, updateDropdownPosition]);

  // Handler untuk trigger - langsung set active tanpa delay
  const handleTriggerMouseEnter = () => {
    setActive(item);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    };

    if (active === item) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, item, setActive]);

  return (
    <div ref={triggerRef} onMouseEnter={handleTriggerMouseEnter} className="relative">
      <motion.p className={`cursor-pointer font-medium ${textColor || ""}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {item}
      </motion.p>

      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {active === item && (
              <div ref={dropdownRef} onMouseEnter={() => setActive(item)} onMouseLeave={() => setActive(null)} style={dropdownStyle} className="z-9999">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`fixed left-0 right-0 ${scrolled ? "bg-black/30" : "bg-transparent"} backdrop-blur-2xl shadow-xl`}
                >
                  <div className="w-full max-w-4xl mx-auto py-6">{children}</div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export const Menu = ({ setActive, children }: { setActive: (item: string | null) => void; children: React.ReactNode }) => {
  const menuRef = useRef<HTMLElement>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    // Berikan delay kecil sebelum menutup
    leaveTimerRef.current = setTimeout(() => {
      setActive(null);
    }, 150);
  };

  const handleMouseEnter = () => {
    // Cancel timer jika mouse kembali ke menu area
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  return (
    <nav ref={menuRef} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className="relative rounded-full border border-transparent bg-transparent shadow-input flex gap-2 justify-center space-x-4">
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }: { title: string; description: string; href: string; src: string }) => {
  return (
    <a href={href} className="flex space-x-2 group p-3 rounded-lg hover:bg-white/10 transition-colors">
      <div className="relative w-35 h-17.5 shrink-0 rounded-md overflow-hidden shadow-2xl">
        <Image src={src} fill sizes="140px" alt={title} className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-bold mb-1">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, className, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a {...rest} className={clsx("text-current transition-colors duration-200 block py-2 px-3 rounded-md hover:bg-white/10", className)}>
      {children}
    </a>
  );
};
