import { useSelector } from "react-redux";
import HeadLineCard from "./cards/HeadLineCard";
import { RootState } from "../store/store";
import TitleText from "./TitleText";
import SeeAllBtn from "./SeeAllBtn";
import EmptyState from "./cards/EmptyState";
import { CaretUpOutlined } from "@ant-design/icons";
import useFetchBookmarks from "../hooks/useFetchBookmarks";

const Headlines = () => {
  const headlines = useSelector((state: RootState) => {
    return state.news.headlines;
  });

  const { bookmarkedIds } = useFetchBookmarks();

  return (
    <>
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="Top Headlines" />
        <SeeAllBtn link="https://google.com" />
      </div>
      {headlines.length < 1 ? (
        <EmptyState
          message="No items found!"
          icon={<CaretUpOutlined className="text-6xl" />}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6">
          <div className="w-full col-span-2 grid grid-rows-1 gap-2 md:col-span-1 md:grid-rows-2 md:grid-cols-1 md:gap-6">
            {headlines.slice(0, 2).map((article, index) => (
              <HeadLineCard
                key={index}
                article={article}
                index={index}
                isArticleBookmarked={bookmarkedIds.includes(article.id)}
              />
            ))}
          </div>
          <div className="col-span-2 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
            {headlines.slice(2, 7).map((article, index) => (
              <HeadLineCard
                key={index}
                article={article}
                index={index}
                isArticleBookmarked={bookmarkedIds.includes(article.id)}
              />
            ))}
          </div>
          <div className="w-full col-span-2 grid grid-rows-1 gap-2 md:col-span-1 md:grid-rows-2 md:grid-cols-1 md:gap-6">
            {headlines.slice(7, 9).map((article, index) => (
              <HeadLineCard
                key={index}
                article={article}
                index={index}
                isArticleBookmarked={bookmarkedIds.includes(article.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Headlines;
