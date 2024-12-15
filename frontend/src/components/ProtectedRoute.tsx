import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
