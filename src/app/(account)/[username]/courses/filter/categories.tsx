import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
}

const Categories = async () => {
  let categories: Category[] = [];

  try {
    const response = await axios.get<Category[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
    );
    categories = response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
  }

  return (
    <>
      {categories && categories.length > 0 ? (
        <Select>
          <SelectTrigger className="w-[180px] h-10 focus:!ring-offset-0 focus:ring-0">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((item) => (
                <SelectItem
                  key={item._id}
                  value={item.name}
                  className="cursor-pointer"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        ""
      )}
    </>
  );
};

export default Categories;
