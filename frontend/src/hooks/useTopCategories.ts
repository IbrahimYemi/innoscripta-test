import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";
import apiClient from "../api/axios";

const useTopCategories = (limit: number = 4) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/get-top-categories");
        
        response.data.data
          ? setCategories(response.data.data)
          : setCategories(["sport", "politics", "technology", "stories"]);
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          setError(axiosError.response.data.message || "Error fetching data.");
        } else {
          setError(axiosError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();

    const intervalId = setInterval(fetchTopCategories, 7200000);

    return () => clearInterval(intervalId);
  }, [limit]);

  return { categories, loading, error };
};

export default useTopCategories;
