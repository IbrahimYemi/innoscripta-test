import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";

interface UserPreferences {
  categories: string[];
  sources: string[];
  authors: string[];
}

interface UseUserPreferences {
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
}

const useUserPreferences = (): UseUserPreferences => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    authors: [],
    sources: [],
    categories: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/get-preferences");
        setPreferences(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          const errorData = axiosError.response.data;
          setError(errorData?.message || "An error occurred");
        } else if (axiosError.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError(axiosError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  return { preferences, loading, error };
};

export default useUserPreferences;
