import { BlogDummy } from "@/app/constants/blogs/blog-dummy";
import Blogs from "./blog";
import { Button } from "@/components/ui/button";

const BlogCard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-3 gap-4">
        {BlogDummy.map((item) => (
          <Blogs {...item} key={item.id} />
        ))}
      </div>
      <Button className="mx-auto block py-2">View All Article</Button>
    </div>
  );
};

export default BlogCard;
