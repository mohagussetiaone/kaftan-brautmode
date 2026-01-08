interface ProductDetailsProps {
  name: string;
  price: number;
  color: string;
  size: string;
}

export default function ProductDetails({ name, price, color, size }: ProductDetailsProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-foreground">{name}</h3>
      <p className="text-lg font-semibold text-foreground">€{price.toFixed(2)}</p>
      <p className="text-sm text-muted-foreground">
        {color} / {size}
      </p>
    </div>
  );
}
