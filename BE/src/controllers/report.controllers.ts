import type { Request,Response } from "express";
import type { DashboardStats } from "../types/borrow.types.js";
import type { ApiResponse } from "../types/api.types.js";
import { pool } from "../config/db.js";



const getDataForReports = async(req:Request,res:Response<Omit<ApiResponse<DashboardStats>,'pagination'>>)=>{
    try {
        console.log(1)
        const query = `
        SELECT 
        (SELECT COUNT(*) FROM books) AS total_books,
        (SELECT COUNT(*) FROM borrow_records) AS total_borrowed,
        (SELECT COUNT(*) FROM borrow_records WHERE returned_at IS NULL) AS active_borrows,
        (SELECT COUNT(*) FROM borrow_records WHERE returned_at IS NULL AND due_date < CURRENT_DATE) AS overdue_books;
        `;
        
        console.log(2)
        const result = await pool.query(query);
        const row = result.rows[0];
        console.log(3)
        
        const stats: DashboardStats = {
            totalBooks: row.total_books,
            totalBorrowed:row.total_borrowed,
            activeBorrows:row.active_borrows,
            overdueBooks: row.overdue_books,
        };
        
        console.log(4)
        
        res.status(200).json({success:true,message:"Successfully get the Results",data:stats})
        
        
        
    } catch (error) {
        console.log(5)
        return res.status(500).json({
            success:false,message:"Internal Server Error",
        });
    }
}

const getChartData = async (req: Request, res: Response) => {
    try {
      const [
        borrowTrend,
        monthlyTrend,
        topBooks,
        returnStats,
        overdueTrend
      ] = await Promise.all([
        pool.query(`
          SELECT DATE(borrowed_at) AS date, COUNT(*) AS count
          FROM borrow_records
          GROUP BY DATE(borrowed_at)
          ORDER BY date;
        `),
  
        pool.query(`
          SELECT DATE_TRUNC('month', borrowed_at) AS month, COUNT(*) AS count
          FROM borrow_records
          GROUP BY month
          ORDER BY month;
        `),
  
        pool.query(`
          SELECT b.title, COUNT(br.id) AS borrow_count
          FROM borrow_records br
          JOIN books b ON b.id = br.book_id
          GROUP BY b.title
          ORDER BY borrow_count DESC
          LIMIT 5;
        `),
  
        pool.query(`
          SELECT 
            COUNT(*) FILTER (WHERE returned_at IS NOT NULL) AS returned,
            COUNT(*) FILTER (WHERE returned_at IS NULL) AS active
          FROM borrow_records;
        `),
  
        pool.query(`
          SELECT DATE(borrowed_at) AS date, COUNT(*) AS overdue_count
          FROM borrow_records
          WHERE returned_at IS NULL
          AND due_date < CURRENT_DATE
          GROUP BY DATE(borrowed_at)
          ORDER BY date;
        `)
      ]);
  
      return res.status(200).json({
        success: true,
        message:"got reports successfully",
        data: {
          borrowTrend: borrowTrend.rows,
          monthlyTrend: monthlyTrend.rows,
          topBooks: topBooks.rows,
          returnStats: returnStats.rows[0],
          overdueTrend: overdueTrend.rows
        }
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };


export {getDataForReports,getChartData}