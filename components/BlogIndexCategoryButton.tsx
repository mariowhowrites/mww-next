import { getColorFromCategory } from "../utils";

type BlogIndexCategoryButtonProps = {
  category: string;
  selectedCategory: string;
  onSelectCategory: Function;
}

export function BlogIndexCategoryButton({
  category,
  selectedCategory,
  onSelectCategory,
}: BlogIndexCategoryButtonProps) {
  const color = getColorFromCategory(category);

  const colorMap = {
    red: {
      selected: "bg-red-600 text-white border-red-400",
      nonselected:
        "bg-red-900 text-red-400 hover:bg-red-700 hover:text-white border-red-400",
    },
    indigo: {
      selected: "bg-indigo-400 text-white border-indigo-400",
      nonselected:
        "bg-indigo-900 text-indigo-400 hover:bg-indigo-700 hover:text-white border-indigo-400",
    },
    green: {
      selected: "bg-green-400 text-white border-green-400",
      nonselected:
        "bg-green-900 text-green-400 hover:bg-green-700 hover:text-white border-green-400",
    },

    amber: {
      selected: "bg-amber-400 text-white border-amber-400",
      nonselected:
        "bg-amber-900 text-amber-400 hover:bg-amber-700 hover:text-white border-amber-400",
    },
  };

  const colorClasses = colorMap[color];

  const baseClasses = "border mr-6 shadow-xl text-3xl px-4 rounded-sm";

  let buttonClasses;

  if (category === selectedCategory) {
    buttonClasses = [baseClasses, colorClasses.selected].join(" ");
  } else {
    buttonClasses = [baseClasses, colorClasses.nonselected].join(" ");
  }

  return (
    <button
      className={buttonClasses}
      onClick={() => onSelectCategory(category)}
    >
      {category}
    </button>
  );
}
