import { useState } from "react";
import { NewsFilterCardProps } from "../../interfaces/Articles";
import { FilterOutlined } from "@ant-design/icons";

const NewsFilterCard: React.FC<NewsFilterCardProps> = ({
  onFilterChange,
  onSubmit,
  categories,
  sources,
}) => {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    onFilterChange({ keyword: event.target.value, date, category, source });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    onFilterChange({ keyword, date: event.target.value, category, source });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    onFilterChange({ keyword, date, category: event.target.value, source });
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
    onFilterChange({ keyword, date, category, source: event.target.value });
  };

  return (
    <div className="news-filter bg-white p-2 md:p-4 shadow-sm rounded-md grid grid-cols-12 md:grid-cols-9 gap-2 md:gap-4">
      <input
        type="search"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="Search news..."
        className="p-2 border border-gray-300 w-full col-span-3 md:col-span-2 outline-red-200 rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="p-2 border border-gray-300 w-full col-span-3 md:col-span-2 outline-red-200 rounded-md"
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 w-full col-span-2 md:col-span-2 outline-red-200 rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={source}
        onChange={handleSourceChange}
        className="p-2 border border-gray-300 w-full col-span-2 md:col-span-2 outline-red-200 rounded-md"
      >
        <option value="">All Sources</option>
        {sources.map((src: string) => (
          <option key={src} value={src}>
            {src}
          </option>
        ))}
      </select>
      <button onClick={onSubmit} className="px-2 py-1 rounded col-span-2 md:col-span-1 bg-red-100">
        <FilterOutlined />
      </button>
    </div>
  );
};

export default NewsFilterCard;
