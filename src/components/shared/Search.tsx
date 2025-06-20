import { useRef, useEffect, useState, type FC } from "react";

interface CategoryDropdownProps {
  statusMap: Record<string, string>;
  selectedCategory: string;
  onSearch: (searchItem: string) => void;
  onSelectCategory: (category: string) => void;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  statusMap,
  selectedCategory,
  onSearch,
  onSelectCategory,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const allowedCategories = Object.keys(statusMap);
  const categories =
    allowedCategories.length > 0 ? allowedCategories : ["All categories"];

  const handleItemClick = (category: string) => {
    setOpen(false);
    onSelectCategory(category);
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim();
    if (searchValue) {
      onSearch(searchValue);
    } else {
      onSearch("");
    }
  };

  return (
    <form className="w-full max-w-xl ">
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Your Email
        </label>
        <div className="relative">
          <button
            id="dropdown-button"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="h-12 shrink-0 z-10 inline-flex items-center px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          >
            {selectedCategory}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              open ? "absolute left-0 mt-1" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleItemClick("All categories")}
                >
                  All categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleItemClick(cat)}
                  >
                    {statusMap[cat] || cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative flex-grow">
          <input
            type="search"
            id="search-dropdown"
            className="h-12 block w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4"
            placeholder="Search Projects..."
            onChange={onChangeSearch}
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-3 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryDropdown;
