import { useSelector } from "react-redux";
import StoryCard from "./cards/StoryCard";
import Slider from "./Slider";
import { RootState } from "../store/store";
import TitleText from "./TitleText";
import SeeAllBtn from "./SeeAllBtn";
import EmptyState from "./cards/EmptyState";
import { CaretUpOutlined } from "@ant-design/icons";

const Story = () => {
  const stories = useSelector((state: RootState) => {
    return state.news.stories;
  });

  const isDataGreaterThan8 = stories.length > 12;
  return (
    <>
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="Buletin Story" />
        <SeeAllBtn link="https://google.com" />
      </div>
      {stories.length < 1 ? (
        <EmptyState
          message="No bulletin found!"
          icon={<CaretUpOutlined className="text-6xl" />}
        />
      ) : (
        <div
          className={`w-full ${
            !isDataGreaterThan8 && "grid grid-cols-4 md:grid-cols-8 gap-4"
          }`}
        >
          {isDataGreaterThan8 ? (
            <Slider
              data={stories}
              animationDuration={Math.max(stories.length * 2, 15)}
              CardComponent={StoryCard}
              cardStyle="size-32"
            />
          ) : (
            stories.map(({ src, title, url }, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center w-auto flex-shrink-0 relative group"
              >
                <StoryCard src={src} title={title} url={url} style="size-32" />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Story;
