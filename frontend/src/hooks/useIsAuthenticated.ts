import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { setUser } from "../store/slices/authSlice";

const useIsAuthenticated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Get user from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      logout();
      navigate("/");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      if (!user) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    } else if (!user) {
      logout();
      navigate("/");
    }
  }, [user, logout, navigate, dispatch]);

  return { user, logout };
};

export default useIsAuthenticated;
