import { Router } from "express";
import { addBorrowDetails, getBorrowByIsbn, getBorrowRecords, getBorrowRecordsForNotification, updateBorrowRecord } from "../controllers/borrower.controller.js";

const router = Router();

router
    .route("/")
    .post(addBorrowDetails)
    .get(getBorrowRecords)

router
    .route("/alerts")
    .get(getBorrowRecordsForNotification)
    
router
    .route("/:isbn")
    .get(getBorrowByIsbn)
    .patch(updateBorrowRecord)


export default router
