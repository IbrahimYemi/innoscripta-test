import useFetchArticles from "../../hooks/useFetchArticles";
import AppError from "../AppState/AppError";
import AppLoader from "../AppState/AppLoader";
import BackToTopBtn from "./BackToTopBtn";
import Footer from "./Footer";
import NavBar from "./NavBar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, error } = useFetchArticles();

  return (
    <div className="bg-white max-w-7xl mx-auto md:p-4 p-2 text-black">
      <NavBar />
      {loading ? <AppLoader /> : error ? <AppError /> : children}
      <Footer />
      <BackToTopBtn />
    </div>
  );
};

export default HomeLayout;
