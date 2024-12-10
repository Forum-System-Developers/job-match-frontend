import React from "react";
import NiceSelect from "@/ui/nice-select";
import slugify from "slugify";
import { useAds } from "../company/hooks/useAds";
import { useCategories } from "@/hooks/use-categories";

const JobCategorySelect = ({
  setCategoryVal,
}: {
  setCategoryVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { categories, loading } = useCategories();

  if (loading) return <div>Select Category</div>;

  const category_option = categories.map((c) => {
    return {
      value: slugify(c.title.toLowerCase(), "-"),
      label: c.title,
    };
  });
  const handleCategory = (item: { value: string; label: string }) => {
    setCategoryVal(item.value);
  };
  return (
    <NiceSelect
      options={category_option}
      placeholder={categories[0].title}
      defaultCurrent={0}
      onChange={(item) => handleCategory(item)}
      name="Category"
      cls="category"
    />
  );
};

export default JobCategorySelect;
