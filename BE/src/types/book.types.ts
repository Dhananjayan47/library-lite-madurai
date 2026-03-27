export interface BookType {
    title: string,
    author:string,
    published_year:number,
    isbn:string,
    category:string
}

export type ResponseType = {
    success: boolean;
    book: BookType | null;
    message: string;
};

export type BookQuery={
    page?:string
    limit?:string
    search?:string
    category?:string
    field?:string
  }

export  type GetBooksResponse={
    success:boolean
    page:number
    limit:number
    total:number
    totalPages :number
    books:BookType[]
  }