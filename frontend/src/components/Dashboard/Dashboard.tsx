import { CaretUpOutlined } from "@ant-design/icons";
import useFetchBookmarks from "../../hooks/useFetchBookmarks";
import AppError from "../AppState/AppError";
import AppLoader from "../AppState/AppLoader";
import EmptyState from "../cards/EmptyState";
import HeadLineCard from "../cards/HeadLineCard";
import TitleText from "../TitleText";

const Dashboard = () => {
  const { bookmarks, loading, error } = useFetchBookmarks();

  return (
    <div className="">
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="My Bookmarked Articles" />
      </div>
      {loading ? (
        <AppLoader />
      ) : error ? (
        <AppError />
      ) : bookmarks.length < 1 ? (
        <EmptyState
          message="Start bookmarking articles to see them here!"
          icon={<CaretUpOutlined className="text-6xl" />}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          {bookmarks.map((article, index) => (
            <HeadLineCard
              isArticleBookmarked={true}
              isDashBoardPage={true}
              key={index}
              article={article}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
