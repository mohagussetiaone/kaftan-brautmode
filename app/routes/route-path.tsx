import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/routes/route";

interface RoutesProps {
  onNavigate: (route: string) => void;
}

const Routes: React.FC<RoutesProps> = ({ onNavigate }) => {
  const pathname = usePathname();

  return (
    <ul className={`flex gap-2 md:gap-0 flex-col items-center justify-start p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0`}>
      {routes.map((route) => {
        const isActive = pathname === route.to;
        return (
          <li key={route.name} className="w-full whitespace-nowrap">
            <Link
              href={route.to}
              onClick={() => onNavigate(route.to)}
              className={clsx("block p-2 text-center text-primary rounded md:border-none border md:p-0", {
                "border-primary underline-offset-4 font-semibold text-primary decoration-brand-600": isActive,
                "font-normal border-primary": !isActive,
              })}
            >
              {route.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Routes;
