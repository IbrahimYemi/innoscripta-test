import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsCardProps, NewsProps, StoryProps, TopHeadlineProps } from "../../interfaces/Articles";

interface NewsState {
  articles: NewsCardProps[];
  headlines: TopHeadlineProps[];
  stories: StoryProps[];
  featuredNews: NewsProps | null;
}

const initialState: NewsState = {
  articles: [],
  featuredNews: null,
  headlines: [],
  stories: [],
};


const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<NewsCardProps[]>) {
      state.articles = action.payload;
    },
    setHeadlines(state, action: PayloadAction<TopHeadlineProps[]>) {
      state.headlines = action.payload;
    },
    setStories(state, action: PayloadAction<StoryProps[]>) {
      state.stories = action.payload;
    },
    setFeaturedNews(state, action: PayloadAction<NewsProps>) {
      state.featuredNews = action.payload;
    },
    clearFeaturedNews(state) {
      state.featuredNews = null;
    },
  },
});

export const { setArticles, setFeaturedNews, clearFeaturedNews, setHeadlines, setStories } = newsSlice.actions;
export default newsSlice.reducer;