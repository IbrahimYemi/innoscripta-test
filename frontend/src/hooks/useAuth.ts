import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { setUser, logout as logoutAction } from "../store/slices/authSlice";
import { AxiosError } from "axios";
import { AuthResponse } from "../interfaces/Auth";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AuthResponse>("/api/register", {
        name,
        email,
        password,
      });
      const { data: user, token } = response.data;

      // Save token
      if (token) localStorage.setItem("authToken", token);

      // Update Redux store
      dispatch(setUser(user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        const statusCode = axiosError.response.status;

        if (statusCode === 422) {
          // Check for specific error messages in the response
          const errorData = axiosError.response.data.data; // `data` contains the error fields

          if (errorData.email) {
            setError(errorData.email[0] || "Email address already in use.");
          } else if (errorData.password) {
            setError(
              errorData.password[0] ||
                "Password must be a minimum of 8 characters."
            );
          } else {
            setError("Please check your input fields.");
          }
        } else {
          setError("Registration failed. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AuthResponse>("/api/login", {
        email,
        password,
      });
      const { data: user, token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Update Redux store
      dispatch(setUser(user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message || "Login failed.");
      } else {
        setError(axiosError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    register,
    login,
    logout,
    loading,
    error,
  };
};

export default useAuth;
