import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SeeAllBtn = ({ link }: { link: string }) => {
  return (
    <Link target="blank" to={link}>
      <h3 className="text-red-600 hover:underline transition-all duration-200 cursor-pointer">
        See all <ArrowRightOutlined />
      </h3>
    </Link>
  );
};

export default SeeAllBtn;
