import { motion } from "framer-motion";
import { SliderProps } from "../interfaces/Slider";

const Slider = <T,>({
  data,
  animationDuration,
  CardComponent,
  cardStyle
}: SliderProps<T>) => {
  //scroll animation
  const animation = {
    x: -1000,
  };

  return (
    <div className="flex flex-col pb-16 overflow-hidden relative">
      <motion.div
        className="flex gap-5"
        style={{ width: "200%" }}
        animate={animation}
        transition={{
          ease: "linear",
          duration: animationDuration,
          repeat: Infinity,
        }}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }} // Adjust these values based on your content width
      >
        {/* Render main data */}
        {data.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-start justify-center w-auto flex-shrink-0 relative group"
          >
            <CardComponent {...item} style={cardStyle} />
          </div>
        ))}

        {/* Duplicate content for infinite scrolling */}
        {data.map((item, index) => (
          <div
            key={`clone-${index}`}
            className="inline-flex items-start justify-center w-auto flex-shrink-0 relative group"
          >
            <CardComponent {...item} style={cardStyle} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;