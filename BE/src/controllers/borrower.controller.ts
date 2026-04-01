import type { Request, Response } from "express";
import type {
    BorrowQuery,
    BorrowRecord,
    CreateBorrowRequest,
    DashboardStats,
} from "../types/borrow.types.js";
import type { ApiResponse, BorrowApiResponse } from "../types/api.types.js";
import { pool } from "../config/db.js";
// import { log } from "node:console";

const addBorrowDetails = async (
    req: Request<{}, {}, CreateBorrowRequest>,
    res: Response<
        BorrowApiResponse<
            Omit<
                BorrowRecord,
                "id" | "returned_at" | "borrowed_at" | "title" | "isbn"
            >
        >
    >
) => {
    try {
        const { book_id, borrower_name, borrower_phone, due_date } = req.body;

        if (!book_id || !borrower_name || !borrower_phone || !due_date) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const bookCheck = await pool.query(
            `SELECT id FROM books WHERE id = $1`,
            [book_id]
        );

        if (bookCheck.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        const query = `INSERT INTO borrow_records (book_id,borrower_name,borrower_phone,due_date) VALUES ($1,$2,$3,$4) RETURNING book_id, borrower_name, borrower_phone, due_date;`;
        const values = [book_id, borrower_name, borrower_phone, due_date];

        const result = await pool.query(query, values);

        return res.status(201).json({
            success: true,
            message: "Borrow records added",
            borrowRecords: result.rows[0],
        });
    } catch (error: any) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "This record already exists",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getBorrowRecords = async (
    req: Request<{}, {}, {}, BorrowQuery>,
    res: Response<BorrowApiResponse<Omit<BorrowRecord, "id">[]>>
) => {
    try {
        const page = parseInt(req.query.page || "1");
        const limit = parseInt(req.query.limit || "10");
        const search = req.query.search || "";
        const field = req.query.field || "title";
  
        const offset = (page - 1) * limit;

        const allowedFields = [
            "title",
            "isbn",
            "borrower_name",
            "borrower_phone",
        ];
        let dataQuery = ` SELECT br.id,br.book_id,
  br.borrower_name,
  br.borrower_phone,
  br.due_date,
  br.returned_at,
  br.borrowed_at, b.title ,b.author FROM borrow_records br JOIN books b ON br.book_id = b.id WHERE br.returned_at IS NULL `;

  let countQuery = ` SELECT COUNT(*) FROM borrow_records br JOIN books b ON br.book_id = b.id WHERE br.returned_at IS NULL`;

  const dataValues: any[] = [];
  const searchValues: any[] = [];
  let index = 1;

        if (search && allowedFields.includes(field)) {
            let column = "";

            if(field === "title" || field === "isbn"){
                column = `b.${field}`
            }else{
                column = `br.${field}`
            }
            dataQuery += ` AND ${column}::text ILIKE $${index}`;
            countQuery += ` AND ${column}::text ILIKE $${index}`
            dataValues.push(`%${search}%`);
            searchValues.push(`%${search}%`);
            index++;
        }

        dataQuery += ` ORDER BY br.id DESC
    LIMIT $${index}
    OFFSET $${index + 1}`;

        dataValues.push(limit, offset);

        const [dataResult, countResult] = await Promise.all([
            pool.query(dataQuery, dataValues),
            pool.query(countQuery, searchValues),
        ]);

        const total = parseInt(countResult.rows[0]?.count || 0);
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            success: true,
            message: " borrow records fetched successfully",
            borrowRecords: dataResult.rows,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

const getBorrowByIsbn = async (
    req: Request<{ isbn: string }>,
    res: Response<BorrowApiResponse<Omit<BorrowRecord, "id">>>
) => {
    try {
        const { isbn } = req.params;

        const result = await pool.query(
            `SELECT br.book_id, br.borrower_name, br.borrower_phone, br.due_date, br.returned_at, br.borrowed_at , b.title , b.isbn FROM borrow_records br JOIN books b ON br.book_id = b.id WHERE b.isbn = $1 AND br.returned_at IS NULL `,
            [isbn]
        );

        if (!result.rows.length) {
            return res
                .status(404)
                .json({ success: false, message: "No active borrow found" });
        }
        return res.status(200).json({
            success: true,
            message: "Borrow record found",
            borrowRecords: result.rows[0],
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
 
const updateBorrowRecord = async (
    req: Request<{ isbn: string }>,
    res: Response<
        BorrowApiResponse<
            Pick<BorrowRecord, "book_id" | "borrower_name" | "returned_at">
        >
    >
) => {
    try {
        const { isbn } = req.params;

        const result = await pool.query(
            `UPDATE borrow_records br SET returned_at = NOW() FROM books b WHERE br.book_id = b.id AND b.isbn = $1 AND br.returned_at IS NULL RETURNING br.book_id,br.borrower_name,br.returned_at`,
            [isbn]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No active borrow record found",
            });
        }
        return res.status(200).json({
            success: true,
            message: " Borrow Detail Updated Successfully ",
            borrowRecords: result.rows[0],
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: " Internal Server Error" });
    }
};


const getBorrowRecordsForNotification= async(req:Request<{},{},{},BorrowQuery>,res:Response<BorrowApiResponse<Omit<BorrowRecord ,  "returned_at">[]>>)=>{
    try {
        const page = parseInt(req.query.page || "1")
        const limit = parseInt(req.query.limit || "10")
        const offset = (page - 1) * limit

       
        
        const query = ` SELECT br.book_id,b.title,b.isbn,br.borrower_name,br.borrower_phone,br.borrower_email ,br.borrowed_at,br.due_date,(br.due_date - CURRENT_DATE) AS days_left FROM borrow_records br JOIN books b ON br.book_id = b.id WHERE br.returned_at IS NULL AND br.due_date<= CURRENT_DATE + INTERVAL '3 days' ORDER BY br.due_date ASC LIMIT $1 OFFSET $2`
        const countQuery =  `
        SELECT COUNT(*) 
        FROM borrow_records br
        WHERE br.returned_at IS NULL
        AND br.due_date <= CURRENT_DATE + INTERVAL '3 days'
      `;
       
        const [dataResult, countResult] = await Promise.all([
            pool.query(query,[limit,offset]),
            pool.query(countQuery),
        ]);
      
        const total = parseInt(countResult.rows[0]?.count || 0);
        const totalPages = Math.ceil(total / limit);
        
       
        res.status(200).json({success:true, message:"Records Founded Successfully", borrowRecords:dataResult.rows,pagination:{total,page,limit,totalPages}})
    } catch (error) {
       
        return res
        .status(500)
        .json({ success: false, message: " Internal Server Error" });

    }
}



export {
    addBorrowDetails,
    getBorrowByIsbn,
    getBorrowRecords,
    updateBorrowRecord,
    getBorrowRecordsForNotification,
};
