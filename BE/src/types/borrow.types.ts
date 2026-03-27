 export type BorrowRecord = {
    id: number;
    book_id: number;
    borrower_name: string;
    borrower_phone: string;
    borrower_email: string;
    due_date: string;
    returned_at: string | null;
    borrowed_at: string;
    title: string;
    isbn: string;
  };

export type CreateBorrowRequest ={
    book_id:number;
    borrower_name:string;
    borrower_phone:string;
    due_date: string;
}

export type BorrowQuery = {
    page:string
    limit:string
    search?:string
    field?:string
}

export type DashboardStats = {
  totalBooks: number;
  totalBorrowed: number;
  activeBorrows: number;
  overdueBooks: number;
};
