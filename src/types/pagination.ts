interface PaginatedResponse<T> {
    succeeded: boolean;
    errors: [] | null;
    message: string | null;
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    firstPage: string;
    lastPage: string;
    nextPage: string | null;
    previousPage: string | null;
}

interface PaginationQuery {
    PageNumber: number;
    PageSize: number;
}

export type { PaginatedResponse, PaginationQuery };