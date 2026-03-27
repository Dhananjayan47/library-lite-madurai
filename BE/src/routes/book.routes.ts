import { Router } from "express";
import { addBook, deleteBook, getBookByIsbn, getBooks, updateBook } from "../controllers/book.controller.js";

const router = Router();

router
   .route("/")
   .post(addBook)
   .get(getBooks)

router
   .route("/:isbn")
   .get(getBookByIsbn)
   .put(updateBook)
   .delete(deleteBook)

 
export default router;