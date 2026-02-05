export interface ApiResponse<T> {
  result: boolean;
  httpStatusCode: number;
  data: T;
  messages: string[];
}
