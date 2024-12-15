import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import {
  setArticles,
  setFeaturedNews,
  setHeadlines,
  setStories,
} from "../store/slices/newsSlice";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";
import { RootState } from "../store/store";
import { fetchNewsData } from "../utils/newsHelper";

const useFetchArticles = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const currentFeaturedNews = useSelector(
    (state: RootState) => state.news.featuredNews
  );

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const news = await fetchNewsData();
        
        dispatch(setArticles(news.articles || []));
        dispatch(setHeadlines(news.headlines || []));
        dispatch(setStories(news.stories || []));

        if (!currentFeaturedNews) {
          dispatch(setFeaturedNews(news.featuredNews || []));
        }
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          setError("An error occurred while fetching articles");
        } else if (axiosError.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("Error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!currentFeaturedNews) {
      fetchArticles();
    }
  }, [dispatch, currentFeaturedNews]);

  return { loading, error };
};

export default useFetchArticles;