"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/app/i18n/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import UkImg from "@/app/assets/images/flag/uk.svg";
import DeImg from "@/app/assets/images/flag/germany.svg";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TextColorValue } from "./navbar";

const languages = [
  {
    code: "de",
    name: "Deutsch",
    flag: DeImg,
    label: "Germany",
    flagAlt: "Flag of Germany",
  },
  {
    code: "en",
    name: "English",
    flag: UkImg,
    label: "UK",
    flagAlt: "Flag of United Kingdom",
  },
] as const;

interface LanguageSwitcherProps {
  variant?: "default" | "ghost";
  className?: string;
  textColor: TextColorValue;
}

export function LanguageSwitcher({ variant = "default", className, textColor }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center gap-2 px-3 py-1 rounded-md transition-colors", variant === "default" ? "bg-transparent hover:bg-white/5" : "hover:bg-white/5", className)} aria-label="Select language">
          <div className="relative w-8 h-6 shrink-0">
            <Image src={currentLanguage.flag} alt={currentLanguage.flagAlt} fill className="object-cover rounded-sm" sizes="30px" />
          </div>
          {/* <span className={cn("hidden sm:inline text-sm font-medium", textColor)}>{currentLanguage.label}</span> */}
          <ChevronDown className={cn("h-4 w-4 opacity-60", textColor)} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-auto min-w-0 bg-transparent backdrop-blur-2xl">
        <div className="flex flex-col gap-1">
          {languages.map((language) => (
            <DropdownMenuItem key={language.code} onClick={() => handleLanguageChange(language.code)} className={cn("flex items-center cursor-pointer p-1.5 rounded-sm relative w-auto min-w-0", locale === language.code && "bg-accent/50")}>
              <div className="relative w-8 h-6 shrink-0">
                <Image src={language.flag} alt={language.flagAlt} fill className="object-cover rounded-sm" sizes="30px" priority />
              </div>
              {/* <div className="flex flex-col flex-1"> */}
              {/* <span className="font-medium">{language.name}</span> */}
              {/* <span className="text-xs text-muted-foreground">{language.label}</span> */}
              {/* </div> */}
              {locale === language.code && <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-1 ring-background" />}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
