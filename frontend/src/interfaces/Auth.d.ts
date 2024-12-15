export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  data: User;
  message: string;
}