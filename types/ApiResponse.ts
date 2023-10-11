export type ApiResponse<T extends object> = {
  data: T
}

export type ApiResponseCollection<T extends object> = ApiResponse<Array<T>>
