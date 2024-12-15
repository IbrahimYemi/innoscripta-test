import apiClient from "../api/axios";

interface NewsFilters {
  keyword?: string;
  date?: string;
  category?: string;
  source?: string;
}

export const fetchNewsData = async (
  filters?: NewsFilters,
  route?: string
) => {
  try {
    const queryParams: Record<string, string> = {};

    if (filters) {
      const { keyword, date, category, source } = filters;
      if (keyword) queryParams.keyword = keyword;
      if (date) queryParams.date = date;
      if (category) queryParams.category = category;
      if (source) queryParams.source = source;
    }

    const token = localStorage.getItem("authToken");
    const defaultRoute = token ? "/api/fetch-auth-news" : "/api/fetch-news";
    const resolvedRoute = route || defaultRoute;

    const response = await apiClient.get(resolvedRoute, { params: queryParams });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};