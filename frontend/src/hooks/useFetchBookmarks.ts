import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import { useDispatch } from "react-redux";
import { TopHeadlineProps } from "../interfaces/Articles";

const useFetchBookmarks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarksState] = useState<TopHeadlineProps[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    
    if (!authToken) {
      return;
    }

    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.get("/api/get-bookmarks");
        const data = response.data.data;
        setBookmarksState(data);

        // Extract IDs from the fetched bookmarks
        const ids = data.map((bookmark: TopHeadlineProps) => bookmark.id);
        setBookmarkedIds(ids);
      } catch (err) {
        setError("An error occurred while fetching bookmarks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [dispatch]);

  return { loading, error, bookmarks, bookmarkedIds };
};

export default useFetchBookmarks;