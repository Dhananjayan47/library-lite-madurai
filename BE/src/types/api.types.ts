export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?:T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
};
export type BorrowApiResponse<T> = {
    success: boolean;
    message: string;
    borrowRecords?:T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
};