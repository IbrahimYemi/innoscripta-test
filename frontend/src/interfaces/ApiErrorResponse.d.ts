export interface ApiErrorResponse {
  success: boolean;
  message: string;
  data: {
    [key: string]: string[];
  };
  statusCode?: number;
}