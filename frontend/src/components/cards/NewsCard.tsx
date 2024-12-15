import { NewsCardProps } from "../../interfaces/Articles";

interface StyleProps {
  style?: string;
}

// Combine CardProps and StyleProps
type CardProps = NewsCardProps & StyleProps;

const NewsCard: React.FC<CardProps> = ({
  src,
  title,
  description,
  category,
  date,
  style,
  url,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-between relative gap-2 ${style}`}
    >
      <div className="w-full h-[14rem] cursor-pointer">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={src || "https://via.placeholder.com/400"}
            alt={title}
            className="h-full w-full rounded-md object-cover"
          />
        </a>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="flex gap-2 items-center font-semibold text-sm text-gray-600">
          <h3 className="text-red-600">{category}</h3>
          <span className="">•</span>
          <span>{date}</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h2 className="text-xl text-gray-800 font-semibold cursor-pointer">
            {title}
          </h2>
        </a>
        <p className="text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
