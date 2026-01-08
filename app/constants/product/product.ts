// app/constants/product/product.ts
import Product1 from "@/app/assets/images/gallery/gallery1.jpg";
import Product2 from "@/app/assets/images/gallery/gallery2.jpg";
import type { SampleCartProductsType, Products } from "@/app/types/product.type";

export const SAMPLE_CART_PRODUCTS: SampleCartProductsType[] = [
  {
    cartItemId: "1-color-red-size-m",
    originalProductId: "1",
    id: "1",
    name: "Wireless Headphones",
    description: "Wireless Bluetooth Headphones with noise cancellation",
    variant: "Single PE coated 320 gsm",
    type: "Flexo Offset Printing",
    price: 109.99,
    image: Product1,
    quantity: 1,
    minOrder: 1,
    categories: ["electronics", "audio"],
    selectedOptions: {
      color: {
        id: "red",
        name: "Red",
        hexCode: "#FF0000",
        priceAdjustment: 5,
        image: Product1,
      },
      size: {
        id: "m",
        name: "Medium",
        priceAdjustment: 5,
      },
    },
  },
  {
    cartItemId: "2-color-blue-size-l",
    originalProductId: "2",
    id: "2",
    name: "Smart Watch",
    description: "Smart Watch with Fitness Tracking and GPS",
    variant: "Double PE coated 400 gsm",
    type: "Flexo Offset Printing",
    price: 314.99,
    image: Product2,
    quantity: 1,
    minOrder: 1,
    categories: ["electronics", "wearables"],
    selectedOptions: {
      color: {
        id: "blue",
        name: "Blue",
        hexCode: "#0000FF",
        priceAdjustment: 10,
        image: Product2,
      },
      size: {
        id: "l",
        name: "Large",
        priceAdjustment: 5,
      },
    },
  },
];

export const SAMPLE_PRODUCTS_WITH_OPTIONS: Products[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Wireless Bluetooth Headphones with noise cancellation",
    variant: "Single PE coated 320 gsm",
    type: "Flexo Offset Printing",
    basePrice: 99.99,
    image: Product1,
    minOrder: 1,
    stock: 100,
    categories: ["electronics", "audio"],
    customOptions: {
      colors: [
        {
          id: "black",
          name: "Black",
          hexCode: "#000000",
          priceAdjustment: 0,
          image: Product1,
        },
        {
          id: "red",
          name: "Red",
          hexCode: "#FF0000",
          priceAdjustment: 5,
          image: Product1,
        },
        {
          id: "blue",
          name: "Blue",
          hexCode: "#0000FF",
          priceAdjustment: 5,
          image: Product1,
        },
      ],
      sizes: [
        {
          id: "s",
          name: "Small",
          priceAdjustment: 0,
        },
        {
          id: "m",
          name: "Medium",
          priceAdjustment: 5,
        },
        {
          id: "l",
          name: "Large",
          priceAdjustment: 10,
        },
      ],
    },
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Smart Watch with Fitness Tracking and GPS",
    variant: "Double PE coated 400 gsm",
    type: "Flexo Offset Printing",
    basePrice: 299.99,
    image: Product2,
    minOrder: 1,
    stock: 50,
    categories: ["electronics", "wearables"],
    customOptions: {
      colors: [
        {
          id: "black",
          name: "Black",
          hexCode: "#000000",
          priceAdjustment: 0,
          image: Product2,
        },
        {
          id: "silver",
          name: "Silver",
          hexCode: "#C0C0C0",
          priceAdjustment: 15,
          image: Product2,
        },
        {
          id: "blue",
          name: "Blue",
          hexCode: "#0000FF",
          priceAdjustment: 10,
          image: Product2,
        },
      ],
      sizes: [
        {
          id: "38mm",
          name: "38mm",
          priceAdjustment: 0,
        },
        {
          id: "42mm",
          name: "42mm",
          priceAdjustment: 20,
        },
        {
          id: "46mm",
          name: "46mm",
          priceAdjustment: 30,
        },
      ],
    },
  },
];
