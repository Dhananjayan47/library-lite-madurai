import type { Request, Response } from "express";
import type { BookType,ResponseType,BookQuery,GetBooksResponse } from "../types/book.types.js";
import { pool } from "../config/db.js";

const addBook = async (
    req: Request<{}, {}, Omit<BookType,"id">>,
    res: Response<ResponseType>
) => {
    try {
        const { title, author, published_year, isbn, category } = req.body;

        if (!title || !author || !isbn || !published_year || !category) {
            return res.status(400).json({
                success: false,
                book: null,
                message: "Missing required fields",
            });
        }

        const query = `INSERT INTO books (title,author,published_year,isbn,category) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
        const values = [title, author, published_year, isbn, category];

        const result = await pool.query(query, values);

        return res
            .status(201)
            .json({ success: true,book:result.rows[0], message: "Book inserted successfully" });
    } catch (error: any) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                book:null,
                message: "ISBN already exists",
            });
        }
        return res.status(500).json({
            success: false,
            book:null,
            message: "Internal server error",
        });
    }
};

const getBooks= async(req:Request<{},{},{},BookQuery>,res:Response<GetBooksResponse>)=>{
  try {
    
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const search = req.query.search || ""
    const category = req.query.category || ""
    const field = req.query.field || "title"


    const offset =( page -1) * limit;

    let query = `SELECT b.*, CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM borrow_records br 
            WHERE br.book_id = b.id 
            AND br.returned_at IS NULL
          )  THEN 'borrowed'
          ELSE 'available'
        END AS status
      FROM books b
      WHERE 1=1 `
    const values :any[] =[];
    let index=1;

    const allowedFields = ["title","author","isbn","id"]
    if(search && allowedFields.includes(field)){
      query += ` AND ${field}::text ILIKE $${index}`
      values.push(`%${search}%`)
      index++
    }

    if(category){
      query += ` AND category = $${index}`
      values.push(category);
      index++
    }

    query += ` 
    ORDER BY id 
    LIMIT $${index}
    OFFSET $${index+1}
            `

    values.push(limit,offset)

    let countQuery=`SELECT COUNT(*) FROM books WHERE 1=1`
    const countValues:any[]=[]
    let countIndex=1

    if (search) {
      countQuery += ` AND (title ILIKE $${countIndex} OR author ILIKE $${countIndex})`
      countValues.push(`%${search}%`)
      countIndex++
    }
    
    if (category) {
      countQuery += ` AND category = $${countIndex} `
      countValues.push(category)
    }


    const result =await pool.query<BookType>(query,values);

    const countResult = await pool.query(countQuery,countValues)


    const total = parseInt(countResult.rows[0].count);

    const totalPages = Math.ceil(total/limit)


    res.status(200).json({success:true,page,limit,total,totalPages,books: result.rows})
  } catch (error) {
    
  }
}

const getBookByIsbn = async (
    req: Request<{ isbn: string }>,
    res: Response<ResponseType>
) => {
    try {

        // console.log("step - 3");
        const { isbn } = req.params;

        const result = await pool.query<BookType>(
            " SELECT * FROM books WHERE isbn = $1",
            [isbn]
        );

        res.status(200).json({
            success: true,
            book: result.rows[0] || null,
            message: "Book is Founded",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            book: null,
            message: "Server error",
        });
    }
};

const updateBook = async (
    req: Request<{ isbn: string }, {}, Omit<BookType, "isbn">>,
    res: Response<ResponseType>
) => {
    try {
        const { title, author, published_year, category } = req.body;

        const { isbn } = req.params;

        if (!title || !author || published_year == null || !category) {
            return res.status(400).json({
                success: false,
                book: null,
                message: "Missing required fields",
            });
        }

        const query = `UPDATE books SET title = $1, author = $2,
           published_year = $3,
           category = $4
       WHERE isbn = $5
       RETURNING title, author, published_year, isbn, category`;
        const values = [title, author, published_year, category, isbn];

        const result = await pool.query<BookType>(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                book: null,
                message: "Book not found",
            });
        }
        return res.status(200).json({
            success: true,
            book: result.rows[0] ?? null,
            message: "Book Updated Successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            book: null,
            message: "Server error",
        });
    }
};

const deleteBook = async (
    req: Request<{ isbn: string }>,
    res: Response<ResponseType>
) => {
    try {
      const {isbn}=req.params;

      const result =await pool.query(`DELETE FROM books WHERE isbn = $1 RETURNING *;`,[isbn]);
      if (result.rows.length === 0) {
        return res.status(404).json({
            success: false,
            book: null,
            message: "Book not found",
        });
    }
      return res.status(200).json({success:true,book:result.rows[0],message:'Book Deleted Successfully'})
    } catch (error) {
      return res.status(500).json({success:false,book:null,message:'Server Error'})
    }
};

export { addBook, getBookByIsbn,getBooks, updateBook ,deleteBook};
