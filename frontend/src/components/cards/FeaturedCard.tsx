import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { NewsProps } from "../../interfaces/Articles";

const FeaturedCard: React.FC = () => {
  const featuredNews: NewsProps | null = useSelector(
    (state: RootState) => state.news.featuredNews
  );

  // Handle cases where there is no featured news
  if (!featuredNews) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:h-[22rem] relative md:gap-8 gap-4 py-2">
      <div className="h-full md:w-1/2 w-full">
        <img
          src={featuredNews?.urlToImage || "https://via.placeholder.com/400"}
          alt="featured"
          className="h-full w-full rounded-md object-cover bg-gray-100"
        />
      </div>
      <div className="h-full md:w-1/2 w-full flex flex-col items-start justify-center gap-2 p-2 md:gap-5 md:p-8">
        <div className="flex gap-2 items-center font-semibold text-sm text-gray-600">
          <div className="size-5 rounded-full bg-red-200"></div>
          <h3 className="text-red-600">{featuredNews?.category || "General"}</h3>
          <span className="text-sm md:text-xl mb-1">•</span>
          <span>{featuredNews?.publishedAt || "Unknown time"}</span>
        </div>
        <a href={featuredNews?.url} target="_blank" rel="noopener noreferrer">
          <h2
            title={featuredNews?.title}
            className="text-2xl md:text-5xl text-gray-800 font-semibold md:leading-[3.5rem]"
          >
            {featuredNews?.title || "No title available"}
          </h2>
        </a>
        <p className="text-base text-gray-700 md:w-5/6">
          {featuredNews?.description ||
            "No description available for this article."}
        </p>
      </div>
    </div>
  );
};

export default FeaturedCard;
