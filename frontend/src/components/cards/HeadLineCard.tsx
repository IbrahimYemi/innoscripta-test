import { useState, useEffect } from "react";
import { HeadLineCardProps } from "../../interfaces/Articles";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axios";

const HeadLineCard: React.FC<HeadLineCardProps> = ({
  article,
  index,
  isDashBoardPage,
  isArticleBookmarked,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isArticleBookmarked);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    setIsBookmarked(isArticleBookmarked);
  }, [isArticleBookmarked]);

  const toggleBookmark = async (articleId: string) => {
    // Check if user is logged in, if not, navigate to login
    if (!user) {
      navigate("/login");
      return;
    }

    // Optimistically toggle bookmark state
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);

    try {
      await apiClient.post(`/api/set-bookmark/${articleId}`);
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
      // Revert the bookmark state if the API call fails
      setIsBookmarked(!newIsBookmarked);
    }
  };

  if (isDashBoardPage && !isBookmarked) {
    return null;
  }

  return (
    <div
      className={`bg-red-50 bg-opacity-40 md:bg-opacity-100 p-2 md:p-6 pb-5 rounded-xl shadow relative ${
        index === 2 ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        {isDashBoardPage ? (
          <h3
            title={article.title}
            className="text-ld md:text-2xl font-semibold text-gray-800 mb-5"
          >
            {article.title.length > 25
              ? article.title.slice(0, 25) + "..."
              : article.title}
          </h3>
        ) : (
          <h3 className="text-ld md:text-2xl font-semibold text-gray-800 mb-2">
            {article.title}
          </h3>
        )}
      </a>
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span className="truncate">{article.date}</span>
        <span className="font-semibold text-red-500">{article.category}</span>
      </div>
      {/* Show description only for the middle card */}
      {index === 2 && (
        <p className="text-gray-700 text-base hidden md:block">
          {article.description}
        </p>
      )}
      {/* Bookmark Icon */}
      <div className="absolute bottom-2 right-2">
        <button
          onClick={() => toggleBookmark(article.id)}
          className="flex items-center text-gray-600 hover:text-red-500 transition"
        >
          {isBookmarked ? (
            <StarFilled className="text-red-500 text-lg" />
          ) : (
            <StarOutlined className="text-lg" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeadLineCard;