// types/pagination.ts (or wherever you keep shared types)
export type PaginatedResult<T> = {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
  