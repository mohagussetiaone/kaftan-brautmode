"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Banner from "../../components/banner";
import ModelImg1 from "@/app/assets/images/gallery/model1.png";
import ModelImg2 from "@/app/assets/images/gallery/model2.png";
import ModelImg3 from "@/app/assets/images/gallery/model3.png";
import ModelImg4 from "@/app/assets/images/gallery/model4.png";
import bgImage from "@/app/assets/images/banner/main-banner.jpg";
import { useCart } from "@/app/stores/cart.store";
import type { ProductPageProduct, RelatedProduct, ColorOption, SizeOption } from "@/app/types/product.type";
import { toast } from "sonner";

// Mock data for the product
const productData: ProductPageProduct = {
  id: "brigid-001",
  name: "Brigid Wedding Dress",
  description:
    "Brigid is a soft, romantic gown with delicate floral lace and slim straps that highlight natural elegance. Its airy tulle skirt flows effortlessly, creating a light, timeless look—perfect for modern brides who want simple beauty with graceful charm.",
  basePrice: 249.99,
  price: 249.99, // final price (sama dengan basePrice untuk product ini)
  image: ModelImg1,
  minOrder: 1,
  stock: 100,
  categories: ["wedding", "dress", "bridal"],
  images: [ModelImg1, ModelImg2, ModelImg3, ModelImg4],
  rating: 4.8,
  reviewCount: 347,
  badges: ["Original", "Unbranded", "New Arrival"],
  variants: {
    variant: "Wedding Dress Collection",
    type: "Bridal Gown",
  },
  customOptions: {
    colors: [
      {
        id: "white",
        name: "White",
        hexCode: "#FFFFFF",
        priceAdjustment: 0,
        image: ModelImg1,
      },
      {
        id: "cream",
        name: "Cream",
        hexCode: "#FFFDD0",
        priceAdjustment: 50,
        image: ModelImg2,
      },
      {
        id: "ivory",
        name: "Ivory",
        hexCode: "#FFFFF0",
        priceAdjustment: 30,
        image: ModelImg3,
      },
    ],
    sizes: [
      {
        id: "xs",
        name: "X-Small",
        priceAdjustment: 0,
      },
      {
        id: "s",
        name: "Small",
        priceAdjustment: 0,
      },
      {
        id: "m",
        name: "Medium",
        priceAdjustment: 0,
      },
      {
        id: "l",
        name: "Large",
        priceAdjustment: 0,
      },
      {
        id: "xl",
        name: "X-Large",
        priceAdjustment: 20,
      },
      {
        id: "custom",
        name: "Custom Size",
        priceAdjustment: 100,
      },
    ],
  },
};

// Mock related products
const relatedProducts: RelatedProduct[] = [
  {
    id: "sienna-001",
    name: "Sienna",
    price: 249.99,
    image: ModelImg2,
  },
  {
    id: "clowly-001",
    name: "Clowly",
    price: 299.99,
    image: ModelImg3,
  },
  {
    id: "aurora-001",
    name: "Aurora",
    price: 349.99,
    image: ModelImg4,
  },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [quantity, setQuantity] = useState(productData.minOrder || 1);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  const { addToCart, updateQuantity, findCartItem } = useCart();

  // Initialize selections
  useEffect(() => {
    // Set default selections
    if (productData.customOptions?.colors?.[0] && !selectedColor) {
      setSelectedColor(productData.customOptions.colors[0]);
    }
    if (productData.customOptions?.sizes?.[0] && !selectedSize) {
      setSelectedSize(productData.customOptions.sizes[0]);
    }

    //eslint-disable-next-line
    checkIfInCart();
    //eslint-disable-next-line
  }, [selectedColor, selectedSize]);

  // Calculate final price based on selected options
  const calculateFinalPrice = () => {
    let finalPrice = productData.basePrice;

    if (selectedColor?.priceAdjustment) {
      finalPrice += selectedColor.priceAdjustment;
    }

    if (selectedSize?.priceAdjustment) {
      finalPrice += selectedSize.priceAdjustment;
    }

    return finalPrice;
  };

  const checkIfInCart = () => {
    if (selectedColor && selectedSize) {
      const item = findCartItem(productData.id, {
        color: selectedColor,
        size: selectedSize,
      });

      if (item) {
        setIsInCart(true);
        setCartItemId(item.cartItemId);
        setQuantity(item.quantity);
      } else {
        setIsInCart(false);
        setCartItemId(null);
        setQuantity(productData.minOrder || 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size before adding to cart");
      return;
    }

    const options = {
      color: selectedColor,
      size: selectedSize,
    };

    addToCart(
      {
        ...productData,
        variant: productData.variants?.variant || "",
        type: productData.variants?.type || "",
      },
      quantity,
      options
    );

    checkIfInCart();
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (!cartItemId) return;

    const validatedQuantity = Math.max(productData.minOrder, newQuantity);
    updateQuantity(cartItemId, validatedQuantity);
    setQuantity(validatedQuantity);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size before buying now");
      return;
    }

    // Add to cart first if not already
    if (!isInCart) {
      const options = {
        color: selectedColor,
        size: selectedSize,
      };
      addToCart(
        {
          ...productData,
          variant: productData.variants?.variant || "",
          type: productData.variants?.type || "",
        },
        quantity,
        options
      );
    }

    // Navigate to checkout
    window.location.href = "/checkout";
  };

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
    // Update image if color has specific image
    const colorIndex = productData.customOptions?.colors?.findIndex((c) => c.id === color.id);
    if (colorIndex !== undefined && colorIndex !== -1) {
      setSelectedImage(colorIndex);
    }
  };

  const finalPrice = calculateFinalPrice();

  return (
    <div className="min-h-screen bg-background">
      <Banner src={bgImage.src} />
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Detail Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images Section */}
          <div className="grid grid-cols-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col col-span-1 gap-6 min-h-150 max-h-110 md:max-h-177">
              {productData.images?.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`relative px-0 aspect-3/4 overflow-hidden transition-all border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                  <Image src={image} alt={`${productData.name} thumbnail ${index + 1}`} fill className="object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative col-span-3 aspect-3/4 w-full max-h-full md:max-h-177 overflow-hidden bg-muted">
              <Image src={productData.images?.[selectedImage] || productData.image} alt={productData.name} fill className="object-cover" priority />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-6">
            {/* Title and Price */}
            <div>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance">{productData.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-2xl font-medium">€{finalPrice.toFixed(2)}</p>
                {selectedColor?.priceAdjustment || selectedSize?.priceAdjustment ? <span className="text-sm text-muted-foreground line-through">€{productData.basePrice.toFixed(2)}</span> : null}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.floor(productData.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {productData.rating?.toFixed(1)}/5 ({productData.reviewCount} Reviews)
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {productData.badges?.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-blue-800 bg-blue-100 border border-blue-800">
                  {badge}
                </Badge>
              ))}
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Color</h3>
              </div>
              <div className="flex gap-2">
                {productData.customOptions?.colors?.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color)}
                    className={`flex items-center gap-2 border px-4 py-2 text-sm transition-all ${selectedColor?.id === color.id ? "border-primary bg-primary/10 font-medium" : "border-input hover:border-primary/50"}`}
                  >
                    <div className="size-4 rounded-full border" style={{ backgroundColor: color.hexCode }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Size</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {productData.customOptions?.sizes?.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 text-sm transition-all ${selectedSize?.id === size.id ? "border-primary bg-primary/10 font-medium" : "border-input hover:border-primary/50"}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity and CTA */}
            <div className="flex gap-3">
              <div className="flex items-center border border-primary">
                <button
                  onClick={() => {
                    const newQuantity = Math.max(productData.minOrder, quantity - 1);
                    if (isInCart && cartItemId) {
                      handleUpdateQuantity(newQuantity);
                    } else {
                      setQuantity(newQuantity);
                    }
                  }}
                  className="flex size-9 items-center justify-center hover:bg-accent"
                  disabled={quantity <= productData.minOrder}
                >
                  <Minus className="size-4" />
                </button>
                <span className="flex w-12 items-center justify-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => {
                    const newQuantity = quantity + 1;
                    if (isInCart && cartItemId) {
                      handleUpdateQuantity(newQuantity);
                    } else {
                      setQuantity(newQuantity);
                    }
                  }}
                  className="flex size-9 items-center justify-center hover:bg-accent"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <div className="flex-1 flex gap-2">
                <Button variant="outline" className="flex-1 border border-primary dark:border-primary" size="lg" onClick={handleAddToCart} disabled={!selectedColor || !selectedSize}>
                  <ShoppingCart className="mr-2 size-4" />
                  Add to cart
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleBuyNow} disabled={!selectedColor || !selectedSize}>
              Buy now
            </Button>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Description
                </TabsTrigger>
                <TabsTrigger value="size-guide" className="flex-1">
                  Size guide
                </TabsTrigger>
                <TabsTrigger value="appointment" className="flex-1">
                  Appointment & Fitting
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{productData.description}</p>
              </TabsContent>

              <TabsContent value="size-guide" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  For an effortless fit, please refer to our <span className="underline">size chart</span>. Measure your bust, waist, and hips, and choose the size that aligns with your largest measurement for the best fit. If you are
                  between sizes, choose the larger one to allow room for minor alterations.
                </p>
              </TabsContent>

              <TabsContent value="appointment" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>The Germany brides are welcome to book an appointment at our store here. International brides looking for more information, or to see a piece in motion can book virtual fittings via email.</p>
              </TabsContent>

              <TabsContent value="shipping" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  All of our bridal gowns and veils are individually handmade once your order is placed, with a production time of 3-6 months. After ordering, our atelier will contact you to confirm measurements and timelines. After
                  finalise your order, we will send an email to follow your shipment. We also accept rush requests. If your wedding is in less than 3 months, please reach out to us. Note: This timeline excludes accessories which are
                  available in stock.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-semibold text-center text-balance mb-8">You may also like</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-shadow">
                <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <button className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background" aria-label="Add to favorites">
                    <Heart className="size-5" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">€{product.price.toFixed(2)}</p>
                  <Button variant="outline" className="mt-4 w-full" onClick={() => {}}>
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
