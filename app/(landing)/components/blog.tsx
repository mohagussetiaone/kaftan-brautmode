import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const Blogs = ({ id, imageUrl, name, date, description }: { id: number; imageUrl: StaticImageData; name: string; date: string; description: string }) => {
  return (
    <div key={id} className="mb-4">
      <div className="w-full min-h-50 relative overflow-hidden">
        <Image src={imageUrl} alt={`Blog_Image_${id}`} fill />
      </div>
      <Link href={`/catalog/${id}`} className="flex flex-col gap-2 justify-start">
        <h2 className="text-2xl font-medium">{name}</h2>
        <p className="text-sm">{date}</p>
        <p className="line-clamp-2">{description}</p>
        <Button className="w-fit px-0" variant="link">
          Read more
        </Button>
      </Link>
    </div>
  );
};

export default Blogs;
