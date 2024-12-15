import { useState } from "react";
import apiClient from "../api/axios";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../interfaces/ApiErrorResponse";
import { PasswordChangeResponse, UsePasswordManager } from "../interfaces/Dashboard";

export const usePasswordManager = (): UsePasswordManager => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiClient.patch<PasswordChangeResponse>(
        "/api/password-manager",
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        }
      );

      setSuccess(response.data.message);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message || "Password change failed.");
      } else {
        setError(axiosError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, changePassword };
};
