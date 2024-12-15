import { StoryProps } from "../../interfaces/Articles";

interface StyleProps {
  style?: string;
}

// Combine CardProps and StyleProps
type CardProps = StoryProps & StyleProps;

const StoryCard: React.FC<CardProps> = ({ src, title, url, style }) => {
  return (
    <div
      className={`flex flex-col items-center justify-between relative gap-2`}
    >
      <a href={url}>
        <div className={`cursor-pointer ${style ?? "size-32"} rounded-full p-1 border-2 border-red-600`}>
          <img
            src={src || 'https://via.placeholder.com/400'}
            alt={title}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </a>
      <h1 className="truncate text-xs font-bold mx-auto">{title}</h1>
    </div>
  );
};

export default StoryCard;
