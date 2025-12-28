"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, Minus, Plus } from "lucide-react";
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

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);

  const productImages = [ModelImg1.src, ModelImg2.src, ModelImg3.src, ModelImg4.src];

  const relatedProducts = [
    {
      id: 1,
      name: "Brigid",
      price: "€249.99",
      image: ModelImg1.src,
    },
    {
      id: 2,
      name: "Sienna",
      price: "€249.99",
      image: ModelImg2.src,
    },
    {
      id: 3,
      name: "Clowly",
      price: "€249.99",
      image: ModelImg3.src,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Detail Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images Section */}
          <div className="grid grid-cols-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col col-span-1 gap-6 min-h-150 max-h-120 md:max-h-177">
              {productImages.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`relative px-0 aspect-3/4 overflow-hidden transition-all`}>
                  <Image src={image} alt={`Brigid thumbnail ${index + 1}`} fill className="object-contain" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="relative col-span-3 aspect-3/4 w-full max-h-120 md:max-h-177 overflow-hidden bg-muted ">
              <Image src={productImages[selectedImage]} alt="Brigid Wedding Dress" fill className="object-cover" priority />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col gap-6">
            {/* Title and Price */}
            <div>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-balance">Brigid</h1>
              <p className="mt-2 text-2xl font-medium">€249.99</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-sm text-muted-foreground">4.8/5 (347 Reviews)</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-blue-800 bg-blue-100 border border-blue-800">
                Original
              </Badge>
              <Badge variant="secondary" className="text-green-800 bg-green-100 border border-green-800">
                Unbranded
              </Badge>
              <Badge variant="secondary" className="text-green-800 bg-green-100 border border-green-800">
                New arrival
              </Badge>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="flex gap-2">
                {["White", "Cream"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-4 py-2 text-sm transition-all ${selectedColor === color ? "border-primary bg-primary/5 font-medium" : "border-input hover:border-primary/50"}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="flex gap-2">
                {["X-Small", "Small", "Medium", "Large"].map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`border px-4 py-2 text-sm transition-all ${selectedSize === size ? "border-primary bg-primary/5 font-medium" : "border-input hover:border-primary/50"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity and CTA */}
            <div className="flex gap-3">
              <div className="flex items-center border border-primary">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex size-9 items-center justify-center hover:bg-accent">
                  <Minus className="size-4" />
                </button>
                <span className="flex w-12 items-center justify-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex size-9 items-center justify-center hover:bg-accent">
                  <Plus className="size-4" />
                </button>
              </div>

              <Button variant="outline" className="flex-1 border border-primary dark:border-primary" size="lg">
                Add to cart
              </Button>
            </div>

            <Button size="lg" className="w-full">
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
                <p>
                  The Germany brides are welcome to book an appointment at our store{" "}
                  <a href="#" className="text-foreground underline underline-offset-4 hover:text-primary">
                    here
                  </a>
                  . International brides looking for more information, or to see a piece in motion can book virtual fittings via{" "}
                  <a href="#" className="text-foreground underline underline-offset-4 hover:text-primary">
                    email
                  </a>
                  .
                </p>
                <p>
                  Discover the Brigid wedding dress - an elegant A-line silhouette featuring intricate lace detailing on the bodice. This stunning gown combines modern sophistication with timeless romance, perfect for the contemporary
                  bride.
                </p>
              </TabsContent>

              <TabsContent value="size-guide" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Our dresses are made to order in standard sizes or can be customized to your measurements.</p>
                <p>Please refer to our size chart or book a fitting appointment for personalized guidance.</p>
              </TabsContent>

              <TabsContent value="appointment" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Book an in-person appointment at our Germany location to try on this dress and receive expert styling advice from our bridal consultants.</p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Book Appointment
                </Button>
              </TabsContent>

              <TabsContent value="shipping" className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Standard shipping: 2-4 weeks</p>
                <p>Express shipping: 1-2 weeks</p>
                <p>International shipping available. Duties and taxes may apply.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="font-serif text-3xl font-semibold text-center text-balance mb-8">You may also like</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-none">
                <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <button className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background" aria-label="Add to favorites">
                    <Heart className="size-5" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
