export interface ApiResponse<T> {
  result: boolean;
  httpStatusCode: number;
  messages: string[];
  data: T;
}
