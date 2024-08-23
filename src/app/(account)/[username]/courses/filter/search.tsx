import { Input } from "@/components/ui/input";
import React from "react";

const Search = () => {
  return (
    <Input
      type="email"
      placeholder="Search"
      className="bg-main/10 !text-main placeholder:text-main/50 max-w-xs focus-visible:!ring-offset-0 focus-visible:ring-0"
    />
  );
};

export default Search;
