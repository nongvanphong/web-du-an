export interface SuccessResponse<Data> {
  status: string;
  total?: number;
  data: Data;
}
export interface ErrorResponse<Data = undefined> extends Error {
  response: Error;
}
export interface Error {
  status: number;
  msg: string;
}
