import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

const BackToTopBtn: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showBackToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-2 right-2 md:bottom-6 md:right-6 bg-white text-red-600 size-6 rounded-full shadow-lg hover:bg-red-100 transition duration-300"
        aria-label="Back to Top"
      >
        <ArrowUpOutlined />
      </button>
    )
  );
};

export default BackToTopBtn;
