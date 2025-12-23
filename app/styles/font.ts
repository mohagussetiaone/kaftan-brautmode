// import localFont from "next/font/local";
import { Merriweather, Playfair_Display, Roboto } from "next/font/google";

// export const jawaPalsuFont = localFont({
//   src: "../../public/fonts/jawa-palsu.ttf",
//   style: "normal",
//   variable: "--font-jawa-palsu",
// });

// export const javaSoulFont = localFont({
//   src: "../../public/fonts/java-soul.ttf",
//   style: "normal",
//   variable: "--font-java-soul",
// });

export const merriweather = Merriweather({
  weight: ["400"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-merriweather",
});

export const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-playfair-display",
});

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: "normal",
  variable: "--font-roboto",
});
