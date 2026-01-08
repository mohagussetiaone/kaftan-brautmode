// app/types/product.type.ts
import { StaticImageData } from "next/image";

export interface CustomOption {
  name: string;
  value: string;
  priceAdjustment?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: StaticImageData | string;
  sku?: string;
}

// Type untuk color option dengan StaticImageData
export interface ColorOption {
  id: string;
  name: string;
  hexCode?: string;
  priceAdjustment?: number;
  image?: StaticImageData;
}

// Type untuk size option
export interface SizeOption {
  id: string;
  name: string;
  priceAdjustment?: number;
}

// Type untuk produk dengan StaticImageData
export interface Products {
  id: string;
  name: string;
  description: string;
  variant: string;
  type: string;
  basePrice: number;
  image: StaticImageData; // Menggunakan StaticImageData
  minOrder: number;
  stock: number;
  categories: string[];
  customOptions?: {
    colors?: ColorOption[];
    sizes?: SizeOption[];
    // Anda bisa tambahkan options lain di sini
  };
}

// Type untuk item di cart
export interface SampleCartProductsType {
  cartItemId: string; // ID unik untuk item di cart
  originalProductId: string; // Reference ke product asli
  id: string; // Product ID
  name: string;
  description: string;
  variant: string;
  type: string;
  price: number; // Final price after custom options
  image: StaticImageData; // Menggunakan StaticImageData
  quantity: number;
  minOrder: number;
  categories: string[];
  selectedOptions?: {
    color?: ColorOption;
    size?: SizeOption;
    // Tambahkan options lain jika diperlukan
  };
}

// Type untuk event broadcasting
export interface CartItemForBroadcast {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: StaticImageData;
  cartItemId: string;
  selectedOptions?: {
    color?: ColorOption;
    size?: SizeOption;
  };
}

export interface ProductPageProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  basePrice: number;
  image: StaticImageData;
  minOrder: number;
  stock: number;
  categories: string[];
  customOptions?: {
    colors?: ColorOption[];
    sizes?: SizeOption[];
  };
  images?: StaticImageData[]; // Tambahan untuk gallery
  rating?: number;
  reviewCount?: number;
  badges?: string[];
  variants?: {
    variant: string;
    type: string;
  };
}

// Type untuk related product
export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: StaticImageData;
}
