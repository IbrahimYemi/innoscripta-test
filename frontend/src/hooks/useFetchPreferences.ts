import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import apiClient from "../api/axios";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";
import { setAuthors, setCategories, setSources } from "../store/slices/preferencesSlice";

const useFetchPreferences = () => {
  const dispatch = useDispatch();
  const [preferences, setPreferences] = useState({
    categories: [],
    sources: [],
    authors: [],
  });

  // Helper to safely parse JSON
  const safeParse = (item: string | null) => {
    try {
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await apiClient.get("/api/get-attributes");
        
        const { categories, sources, authors } = response.data.data;

        // Save data to Redux
        dispatch(setCategories(categories));
        dispatch(setSources(sources));
        dispatch(setAuthors(authors));

        // Save data to localStorage
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("sources", JSON.stringify(sources));
        localStorage.setItem("authors", JSON.stringify(authors));

        setPreferences({ categories, sources, authors });
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        console.error(axiosError.message);
      }
    };

    if (!localStorage.getItem("categories") || !localStorage.getItem("sources") || !localStorage.getItem("authors")) {
      fetchPreferences();
    } else {
      // Safely parse data from localStorage
      const categories = safeParse(localStorage.getItem("categories"));
      const sources = safeParse(localStorage.getItem("sources"));
      const authors = safeParse(localStorage.getItem("authors"));

      dispatch(setCategories(categories));
      dispatch(setSources(sources));
      dispatch(setAuthors(authors));

      setPreferences({ categories, sources, authors });
    }
  }, [dispatch]);

  return preferences;
};

export default useFetchPreferences;