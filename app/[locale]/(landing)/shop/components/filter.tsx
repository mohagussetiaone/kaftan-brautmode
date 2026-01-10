import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Filter = () => {
  return (
    <div className="flex justify-between py-4 md:py-8">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Low to High</SelectItem>
            <SelectItem value="banana">High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <h1 className="text-3xl md:text-4xl font-playfair">Shop Our Styles</h1>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Best Selling</SelectItem>
            <SelectItem value="banana">Alphabetically, A-Z </SelectItem>
            <SelectItem value="blueberry">Alphabetically, Z-A</SelectItem>
            <SelectItem value="pineapple">Date, Oldest to Newest</SelectItem>
            <SelectItem value="grapes">Date, Newest to Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
