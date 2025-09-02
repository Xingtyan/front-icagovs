export interface ApiResponse<T> {
  data?: T;
  success?: boolean;
  message?: string;
  total?: number;
  [key: string]: any;
}
