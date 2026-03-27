import API from "./api";

export const bookService={
    getByIsbn: async(isbn) => {
        return API.get(`/api/books/${isbn}`);
    }
}