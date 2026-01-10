"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/app/i18n/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import UkImg from "@/app/assets/images/flag/uk.svg";
import DeImg from "@/app/assets/images/flag/germany.svg";
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

interface LanguageSwitcherMobileProps {
  onClose?: () => void;
  textColor: TextColorValue;
}

export function LanguageSwitcherMobile({ onClose, textColor }: LanguageSwitcherMobileProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    onClose?.();
  };

  return (
    <div className="space-y-2">
      <div className={cn("px-2 py-1.5 text-xs font-semibold uppercase tracking-wider", textColor)}>Language</div>

      <div className="space-y-1">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn("flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors", locale === language.code ? "bg-accent" : "hover:bg-accent/50")}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-7">
                <Image src={language.flag} alt={language.flagAlt} fill className="object-contain rounded-sm" sizes="40px" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium text-base">{language.name}</span>
                <span className="text-sm text-muted-foreground">{language.label}</span>
              </div>
            </div>

            {locale === language.code && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}
