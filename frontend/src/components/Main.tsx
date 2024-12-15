import FeaturedCard from "./cards/FeaturedCard";
import LatestNews from "./LatestNews";
import Story from "./Story";
import Headlines from "./Headlines";
import NewsFilter from "./NewsFilter";

const Main = () => {
  return (
    <div>
      <div className="bg-gray-100 w-full rounded-md flex flex-col items-center text-center md:my-8 mt-4 p-4 md:p-8">
        <h1 className="text-gray-500 md:leading-8 uppercase font-semibold text-sm">
          Welcome to SkyllrNews
        </h1>
        <p className="text-lg md:text-2xl md:leading-9 font-semibold">
          Craft narratives ✍️ that ignite
          <span className="text-red-600"> inspiration 💡</span>,
          <br />
          <span className="text-red-600">knowledge 📚,</span> and
          <span className="text-red-600"> entertainment 🎬</span>
        </p>
      </div>

      <FeaturedCard />

      <div className="mt-8">
        <NewsFilter />
      </div>

      <div className="mt-8">
        <LatestNews />
      </div>

      <div className="mt-8">
        <Story />
      </div>

      <div className="mt-8">
        <Headlines />
      </div>
    </div>
  );
};

export default Main;
