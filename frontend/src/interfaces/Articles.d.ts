export interface UseFetchArticlesProps {
  country?: string;
  category?: string;
  apiKey?: string;
  route?: string
}

export interface NewsProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  category: string;
  readTime: string;
}

export interface NewsCardProps {
  src: string;
  title: string;
  url: string;
  description: string;
  category: string;
  date: string;
  style?: string;
}

export interface StoryProps {
  src: string;
  title: string;
  url: string;
  style?: string;
}

export interface TopHeadlineProps {
  id :string;
  date: string;
  category: string;
  title: string;
  url: string;
  description: string;
}

export interface NewsFilterCardProps {
  onFilterChange: (filters: {
    keyword: string;
    date: string;
    category: string;
    source: string;
  }) => void;
  onSubmit: () => void;
  categories: string[];
  sources: string[];
}

export interface HeadLineCardProps {
  article: TopHeadlineProps;
  index?: number;
  isDashBoardPage?: boolean;
  isArticleBookmarked: boolean
}
