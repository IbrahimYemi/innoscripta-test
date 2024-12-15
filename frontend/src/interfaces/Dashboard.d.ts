export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface PasswordChangeResponse {
  message: string;
}

export interface UsePasswordManager {
  loading: boolean;
  error: string | null;
  success: string | null;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => Promise<void>;
}