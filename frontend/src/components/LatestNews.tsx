import { useSelector } from "react-redux";
import NewsCard from "./cards/NewsCard";
import Slider from "./Slider";
import { RootState } from "../store/store";
import TitleText from "./TitleText";
import SeeAllBtn from "./SeeAllBtn";
import EmptyState from "./cards/EmptyState";
import { CaretUpOutlined } from "@ant-design/icons";

const LatestNews = () => {
  const articles = useSelector((state: RootState) => {
    return state.news.articles;
  });

  const isDataGreaterThan8 = articles.length > 8;
  return (
    <>
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="Latest News" />
        <SeeAllBtn link="https://google.com" />
      </div>
      {articles.length < 1 ? (
        <EmptyState
          message="No news article found!"
          icon={<CaretUpOutlined className="text-6xl" />}
        />
      ) : (
        <div
          className={`w-full ${
            !isDataGreaterThan8 && "grid grid-cols-2 md:grid-cols-4 gap-4"
          }`}
        >
          {isDataGreaterThan8 ? (
            <Slider
              data={articles}
              animationDuration={Math.max(articles.length * 4, 25)}
              CardComponent={NewsCard}
              cardStyle="w-[16rem]"
            />
          ) : (
            articles.map(
              ({ url, src, title, description, category, date }, index) => (
                <div
                  key={index}
                  className="inline-flex items-center justify-center w-auto flex-shrink-0 relative group"
                >
                  <NewsCard
                    url={url}
                    src={src}
                    title={title}
                    description={
                      description.length > 100
                        ? description.slice(0, 100) + "..."
                        : description
                    }
                    category={category}
                    date={date}
                    style="w-full"
                  />
                </div>
              )
            )
          )}
        </div>
      )}
    </>
  );
};

export default LatestNews;
