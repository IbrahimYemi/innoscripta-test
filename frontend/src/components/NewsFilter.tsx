import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NewsFilterCard from "./cards/FilterNewsCard";
import {
  setArticles,
  setHeadlines,
  setStories,
} from "../store/slices/newsSlice";
import useFetchPreferences from "../hooks/useFetchPreferences";
import { fetchNewsData } from "../utils/newsHelper";
import { clearStatus, showStatus } from "../store/slices/statusSlice";

const NewsFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    date: "",
    category: "",
    source: "",
  });

  const [loading, setLoading] = useState(false);

  const { categories, sources } = useFetchPreferences();
  const dispatch = useDispatch();

  useEffect(() => {
      if (loading) {
        dispatch(
          showStatus({
            state: "loading",
            text: "Processing...",
          })
        );
      } else {
        dispatch(clearStatus());
      }
    }, [loading, dispatch]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleFetchNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNewsData(filters);
      dispatch(setArticles(data.articles || []));
      dispatch(setHeadlines(data.headlines || []));
      dispatch(setStories(data.stories || []));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsFilterCard
      onFilterChange={handleFilterChange}
      onSubmit={handleFetchNews}
      categories={categories}
      sources={sources}
    />
  );
};

export default NewsFilter;
