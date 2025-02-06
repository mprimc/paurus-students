export interface PaginatedResponse<T> {
  result: T
  pagination: PaginationInfo
}

export interface PaginationInfo {
  totalRecords: number
  currentPage: number
  totalPages: number
  nextPage: number | null
  previousPage: number | null
}
